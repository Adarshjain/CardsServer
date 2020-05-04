import {importSchema} from "graphql-import";
import {addUserToBoard, getBoard, getNextUser, newBoard, updateDeckInBoard} from "../mongodb/boards";
import {connectMongo, disConnectMongo, mongooseIsConnected} from "../mongodb";

const {PubSub, withFilter} = require('apollo-server');

const pubsub = new PubSub();
const BOARD_UPDATED = "BOARD_UPDATED";
const USER_CHANGED = "USER_CHANGED";

export const typeDefs = importSchema('./src/schema/cards.graphql');

export const resolvers = {
    Query: {
        getBoard: async function (root, args: { boardId: number }) {
            !mongooseIsConnected() && await connectMongo();
            let resp = await getBoard(args.boardId);
            await disConnectMongo();
            return resp;
        },
        newBoard: async function (root, args: { user: { id: number, name: string } }) {
            !mongooseIsConnected() && await connectMongo();
            let resp = await newBoard(args.user);
            await disConnectMongo();
            return resp;
        }
    },
    Mutation: {
        addUserToBoard: async (root, args: { user: { id: number, name: string }, boardId?: number }) => {
            !mongooseIsConnected() && await connectMongo();
            let board, {boardId, user} = args;
            board = await addUserToBoard(boardId, user);
            await disConnectMongo();
            await pubsub.publish(BOARD_UPDATED, {board: board})
            return board;
        },
        updateDeck: async (root, {deck, boardId, user}: { deck: any, boardId: number, user: { id: number, name: string } }) => {
            !mongooseIsConnected() && await connectMongo();
            let board = await updateDeckInBoard(boardId, deck);
            let nextUser = await getNextUser(user, boardId);
            await disConnectMongo();
            await Promise.all([
                pubsub.publish(USER_CHANGED, {currentUser: {user: nextUser, boardId: board.id}}),
                pubsub.publish(BOARD_UPDATED, {board: board})
            ]);
            return deck;
        }
    },
    Subscription: {
        board: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(BOARD_UPDATED),
                (payload, variables) => {
                    return payload.board.id === variables.boardId;
                },
            )
        },
        currentUser: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(USER_CHANGED),
                (payload, variables) => {
                    return payload.currentUser.boardId === variables.boardId;
                },
            )
        }
    }
}