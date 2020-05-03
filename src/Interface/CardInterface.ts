export enum Suit {
    SPADES = 'SPADES',
    HEARTS = 'HEARTS',
    CLUBS = 'CLUBS',
    DIAMONDS = 'DIAMONDS'
}

export interface CardItem {
    letter: Letter,
    suit: SuitMeta
}

export interface SuitMeta {
    design: SuitDesign,
    color: SuitColor,
    suit: Suit
}

export enum Letter {
    ONE = 'ONE',
    TWO = 'TWO',
    THREE = 'THREE',
    FOUR = 'FOUR',
    FIVE = 'FIVE',
    SIX = 'SIX',
    SEVEN = 'SEVEN',
    EIGHT = 'EIGHT',
    NINE = 'NINE',
    TEN = 'TEN',
    JACK = 'JACK',
    QUEEN = 'QUEEN',
    KING = 'KING'
}

export enum SuitColor {
    RED = "RED",
    BLACK = "BLACK"
}
export enum SuitDesign {
    SPADES = 'SPADES',
    HEARTS = 'HEARTS',
    CLUBS = 'CLUBS',
    DIAMONDS = 'DIAMONDS'
}