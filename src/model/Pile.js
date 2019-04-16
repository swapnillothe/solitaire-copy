class Pile {
  constructor() {
    this.accessibleCards = [];
    this.restrictedCards = [];
  }
  addRestrictedCards(cards) {
    this.restrictedCards = this.restrictedCards.concat(cards);
  }
  addAccessibleCard(card) {
    this.accessibleCards.push(card[0]);
  }

  addAccessibleCards(cards) {
    if (this.isKing(cards[0]) || this.canCardPlaced(cards[0])) {
      this.accessibleCards = this.accessibleCards.concat(cards);
      return true;
    }
    return false;
  }

  getRestrictedCards() {
    return this.restrictedCards;
  }
  getAccessibleCards() {
    return this.accessibleCards;
  }

  removeCard(card) {
    this.accessibleCards.pop();
    if (this.restrictedCards.length > 0 && this.accessibleCards.length === 0) {
      this.accessibleCards.push(this.restrictedCards.pop());
    }
    return true;
  }

  isKing(card) {
    return card.sequenceNumber === 13 && this.accessibleCards.length === 0;
  }

  canCardPlaced(card) {
    const lastCard = this.accessibleCards[this.accessibleCards.length - 1];

    return (
      lastCard.sequenceNumber - 1 === card.sequenceNumber &&
      lastCard.colour !== card.colour
    );
  }

  addCard(card) {
    if (this.isKing(card) || this.canCardPlaced(card)) {
      return this.accessibleCards.push(card);
    }
    return false;
  }

  isCardInBetween(card) {
    let lastCard = this.accessibleCards[this.accessibleCards.length - 1];
    if (
      lastCard.sequenceNumber === card.sequenceNumber &&
      lastCard.suitType === card.suitType
    ) {
      return false;
    }
    return true;
  }

  canPlaced(card1, card2) {
    return (
      card1.sequenceNumber === card2.sequenceNumber - 1 &&
      card1.colour !== card2.colour
    );
  }

  isKingCard(card, cardsLength) {
    return card.sequenceNumber === 13 && cardsLength === 0;
  }

  getCardsToMove(card, sourceCard, cardsLength) {
    if (
      this.isKingCard(sourceCard, cardsLength) ||
      this.canPlaced(sourceCard, card)
    ) {
      let index = 0;
      if (this.accessibleCards.length > 0) {
        index = this.accessibleCards.findIndex(cardDetails => {
          return (
            cardDetails.sequenceNumber === sourceCard.sequenceNumber &&
            cardDetails.colour === sourceCard.colour
          );
        });
      }
      const cards = this.accessibleCards.splice(index);
      if (
        this.restrictedCards.length >= 1 &&
        this.accessibleCards.length === 0
      ) {
        this.accessibleCards.push(this.restrictedCards.pop());
      }
      return cards;
    }
    return false;
  }
}

export default Pile;
