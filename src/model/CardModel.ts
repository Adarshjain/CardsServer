import {CardItem, Letter, Suit, SuitColor, SuitDesign, SuitMeta} from "../Interface/CardInterface";
import {randomNumber} from "../helper/Helpers";

let letters = [Letter.ONE, Letter.TWO, Letter.THREE, Letter.FOUR, Letter.FIVE, Letter.SIX,
    Letter.SEVEN, Letter.EIGHT, Letter.NINE, Letter.TEN, Letter.JACK, Letter.QUEEN, Letter.KING];
let designs: { [key: string]: SuitMeta } = {
    [Suit.SPADES]: {design: SuitDesign.SPADES, color: SuitColor.BLACK, suit: Suit.SPADES},
    [Suit.HEARTS]: {design: SuitDesign.HEARTS, color: SuitColor.RED, suit: Suit.HEARTS},
    [Suit.CLUBS]: {design: SuitDesign.CLUBS, color: SuitColor.BLACK, suit: Suit.CLUBS},
    [Suit.DIAMONDS]: {design: SuitDesign.DIAMONDS, color: SuitColor.RED, suit: Suit.DIAMONDS}
};
let suits = [Suit.SPADES, Suit.HEARTS, Suit.CLUBS, Suit.DIAMONDS];

export function getOrderedDeck(): CardItem[] {
    let deck: CardItem[] = [];
    (Object.keys(designs) as Suit[]).forEach(design => deck.push(...getDesignDeck(design)));
    return deck;
}

export function getDesignDeck(suit: Suit): CardItem[] {
    return letters.map(letter => getCardItem(letter, suit))
}

export function getCardItem(letter: Letter, suit: Suit): CardItem {
    return {letter, suit: designs[suit], cardId: letter + designs[suit].design}
}

export function getRandomCardDeck(count = 52): CardItem[] {
    let deck: CardItem[] = [];
    let usedIndex: number[] = [];
    let loopCount = 0;
    while (true) {
        let index = randomNumber(0, count);
        if (!usedIndex.includes(index)) {
            let letter = letters[index % 13];
            let design = suits[index % 4];
            deck.push(getCardItem(letter, design));
            usedIndex.push(index);
        }
        loopCount++;
        if (deck.length == count) {
            return deck;
        }
    }
}

export function sortCards(cards: CardItem[]): CardItem[] {
    return cards.sort(cardSort).sort(cardSort);
}

function cardSort(cardA: CardItem, cardB: CardItem) {
    let cardASuitIndex = suits.indexOf(cardA.suit.suit);
    let cardBSuitIndex = suits.indexOf(cardB.suit.suit);
    if (cardASuitIndex === cardBSuitIndex) {
        let cardALetterIndex = letters.indexOf(cardA.letter);
        let cardBLetterIndex = letters.indexOf(cardB.letter);
        return cardBLetterIndex - cardALetterIndex;
    } else {
        return cardASuitIndex - cardBSuitIndex;
    }
}