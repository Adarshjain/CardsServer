import {importSchema} from "graphql-import";

const {PubSub} = require('apollo-server');

const pubsub = new PubSub();
const DECK_UPDATED = "DECK_UPDATED";

export const typeDefs = importSchema('./src/schema/cards.graphql');

let deck;

export const resolvers = {
    Query: {
        // deck: () => ({id: 1, deck: getRandom(52)}),
        // chokdiSet: () => {
        //     if (deck === undefined) {
        //         let randomCards = getRandom();
        //         return [
        //             sortCards(randomCards.slice(0, 13)),
        //             sortCards(randomCards.slice(13, 26)),
        //             sortCards(randomCards.slice(26, 39)),
        //             sortCards(randomCards.slice(39, 52)),
        //             []
        //         ]
        //     } else {
        //         return deck;
        //     }
        // },
        // orderedDeck:()=>{},
        board: () => {
            return {
                id: 213,
                users: [
                    {
                        id: 123,
                        name: "Buri Buri Zaemon"
                    }
                ]
            }
        },
        // user:()=>{}
    },
    Mutation: {
        // updateCardForChokdi(root, args) {
        //     deck = args.input.newDeck;
        //     pubsub.publish(DECK_UPDATED, {deckUpdated: deck});
        //     return deck;
        // },
        // createUser: () => {}
        createBoard: () => {
            return {
                id:213,
                users:[
                    {
                        id:123,
                        name:"Buri Buri Zaemon"
                    }
                ]
            }
        }
    },
    // Subscription: {
        // updatedDeck: (root,args,context,info) => {
        //     return deck;
        // subscribe: () => pubsub.asyncIterator(DECK_UPDATED),
        // subscribe: () => pubsub.asyncIterator(DECK_UPDATED),
        // }
    // }
}
