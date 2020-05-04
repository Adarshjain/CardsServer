import {createSchema, Type, typedModel} from 'ts-mongoose';
import {randomNumber} from "../helper/Helpers";
import {getRandomCardDeck, sortCards} from "../model/CardModel";

const UserSchema = createSchema({
    id: Type.number({required: true}),
    name: Type.string({required: true}),
});

const BoardSchema = createSchema({
    id: Type.number({required: true, unique: true}),
    users: Type.array({required: true}).of(UserSchema),
    deck: Type.string({required: true})
});

const Board = typedModel('Board', BoardSchema);

export async function newBoard(user) {

    let newBoardId = randomNumber(10000, 99999), hasFound = false;

    while (!hasFound) {
        let board = await getBoard(newBoardId);

        if (board === null) {
            hasFound = true;
        } else {
            newBoardId = randomNumber(10000, 99999);
        }
    }
    let randomCards = getRandomCardDeck();
    let deck = [
        sortCards(randomCards.slice(0, 13)),
        sortCards(randomCards.slice(13, 26)),
        sortCards(randomCards.slice(26, 39)),
        sortCards(randomCards.slice(39, 52)),
        []
    ]

    let board = await Board.create({
        id: newBoardId,
        users: [user],
        deck: JSON.stringify(deck)
    });
    return getParsedBoard(board);
}

function getParsedBoard(board) {
    return {
        id: board.id,
        users: board.users,
        deck: JSON.parse(board.deck)
    };
}

export async function getBoard(boardId) {
    let board = await new Promise((resolve, reject) => {
        Board.findOne({"id": boardId}, (err, board) => err ? reject(err) : resolve(board));
    })
    if (board !== null) {
        return getParsedBoard(board)
    }
    return null;
}

export async function addUserToBoard(boardId, user) {
    let board = await getBoard(boardId);
    if (board !== null) {
        if (board.users.length >= 4) {
            return {status: "Board full"};
        } else if (!board.users.find(innerUser => innerUser.id === user.id)) {
            return await new Promise((resolve, reject) => {
                Board.findOneAndUpdate({id: boardId}, {$push: {users: user}}, {new: true}, (err, board) => err ? reject(err) : resolve(board))
            })
        } else {
            return {
                ...board,
                status: "Already inside"
            };
        }
    }
    return null;
}

export async function updateDeckInBoard(boardId, deck) {
    let board = await new Promise((resolve, reject) => {
        Board.findOneAndUpdate({id: boardId}, {deck: JSON.stringify(deck)}, {new: true}, (err, board) => err ? reject(err) : resolve(board))
    })
    return getParsedBoard(board);
}

export async function getNextUser(currentUser, boardId) {
    let board = await getBoard(boardId);
    let index = board?.users.findIndex(user =>  user.id === currentUser.id) + 1;
    return board?.users[index % 4];
}