class Suit {
  constructor(suitType, colour) {
    this.suitType = suitType;
    this.colour = colour;
    this.accessibleCards = [];
    this.restrictedCards = [];
  }

  getRestrictedCards() {
    return this.restrictedCards;
  }
  getAccessibleCards() {
    return this.accessibleCards;
  }

  canCardPlaced(card) {
    return this.accessibleCards[0].sequenceNumber + 1 === card.sequenceNumber;
  }

  isFirstCard(card) {
    return card.sequenceNumber === 1;
  }

  addCard(card) {
    if (this.isFirstCard(card)) {
      this.accessibleCards = [card];
      return true;
    }
    if (this.accessibleCards.length >= 1 && this.canCardPlaced(card)) {
      this.updateCards(card);
      return true;
    }
    return false;
  }

  updateCards(card) {
    this.restrictedCards.push(this.accessibleCards[0]);
    this.accessibleCards = [card];
  }

  removeCard(card) {
    const requiredcard = this.accessibleCards[0];
    if (
      requiredcard.suitType === card.suitType &&
      card.sequenceNumber === requiredcard.sequenceNumber
    ) {
      this.accessibleCards.pop();
      this.accessibleCards.push(this.restrictedCards.pop());
    }
  }
  getCount() {
    return this.accessibleCards.length + this.restrictedCards.length;
  }
}

export default Suit;
