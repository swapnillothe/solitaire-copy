import lodash from 'lodash';
import Pile from './Pile.js';

class Game {
  constructor(deck, stack, cards) {
    this.piles = [];
    this.deck = deck;
    this.stack = stack;
    this.cards = cards;
    this.suits = ['diamond', 'heart', 'spade', 'club', 'deck'];
  }

  startGame() {
    const cards = lodash.shuffle(this.cards);
    for (let index = 1; index <= 7; index++) {
      const pile = new Pile();
      const restrictedCards = cards.splice(0, index - 1);
      pile.addRestrictedCards(restrictedCards);
      pile.addAccessibleCard(cards.splice(0, 1));
      this.piles.push(pile);
    }
    this.stack.addAccessibleCards(cards);
  }

  getStack() {
    return this.stack;
  }

  getPiles() {
    return this.piles;
  }

  getDeck() {
    return this.deck;
  }

  stackToPile(card, pileNumber) {
    return this.piles[pileNumber].addCard(card) && this.stack.removeCard(card);
  }

  pileToDeck(card, pileNumber) {
    return this.deck.addCard(card) && this.piles[pileNumber].removeCard(card);
  }

  isKingOnPile(card) {
    return (
      card.sequenceNumber === 13 && card.secondaryDestination.includes('pile')
    );
  }

  pileToPile(card, sourcePileNumber, destinationPileNumber) {
    const destinationPile = this.piles[destinationPileNumber];
    const sourcePile = this.piles[sourcePileNumber];
    return destinationPile.addCard(card) && sourcePile.removeCard(card);
  }

  drop(card, destination) {
    const source = card.draggingFrom;
    if (source === 'open-card' && destination.includes('pile')) {
      const pileNumber = destination.split('_')[1];
      return this.stackToPile(card, pileNumber);
    }

    if (
      source.includes('pile') &&
      card.sequenceNumber === 13 &&
      card.secondaryDestination.includes('pile')
    ) {
      const sourcePileNumber = card.draggingFrom.split('_')[1];
      const destinationPileNumber = card.secondaryDestination.split('_')[1];
      const destinationPile = this.piles[destinationPileNumber];

      if (this.piles[sourcePileNumber].isCardInBetween(card)) {
        const cardsToMove = this.piles[sourcePileNumber].getCardsToMove(
          destinationPile.accessibleCards[
            destinationPile.accessibleCards.length - 1
          ],
          card,
          destinationPile.accessibleCards.length
        );
        return destinationPile.addAccessibleCards(cardsToMove);
      }

      return this.pileToPile(card, sourcePileNumber, destinationPileNumber);
    }

    if (source === 'open-card' && this.suits.includes(destination)) {
      return this.deck.addCard(card) && this.stack.removeCard(card);
    }

    if (source.includes('pile') && this.suits.includes(destination)) {
      const pileNumber = card.draggingFrom.split('_')[1];
      return this.pileToDeck(card, pileNumber);
    }

    if (source.includes('pile') && destination.includes('pile')) {
      const sourcePileNumber = card.draggingFrom.split('_')[1];
      const destinationPileNumber = destination.split('_')[1];

      if (this.piles[sourcePileNumber].isCardInBetween(card)) {
        const destinationPile = this.piles[destinationPileNumber];
        const cardsToMove = this.piles[sourcePileNumber].getCardsToMove(
          destinationPile.accessibleCards[
            destinationPile.accessibleCards.length - 1
          ],
          card,
          destinationPile.accessibleCards.length
        );
        return cardsToMove && destinationPile.addAccessibleCards(cardsToMove);
      }
      return this.pileToPile(card, sourcePileNumber, destinationPileNumber);
    }

    if (this.suits.includes(source) && destination.includes('pile')) {
      const pileNumber = destination.split('_')[1];
      return this.piles[pileNumber].addCard(card) && this.deck.removeCard(card);
    }

    if (this.isKingOnPile(card)) {
      const pileNumber = card.secondaryDestination.split('_')[1];
      return this.stackToPile(card, pileNumber);
    }
  }

  hasWon() {
    return this.deck.hasWon();
  }
}

export default Game;
