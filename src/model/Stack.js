class Stack {
  constructor() {
    this.accessibleCards = [];
    this.drawnCards = [];
    this.index = 0;
  }

  addAccessibleCards(cards) {
    this.accessibleCards = cards;
  }

  getAccessibleCards() {
    return this.accessibleCards;
  }

  removeCard(cardToBeRemove) {
    for (let index = 0; index < this.accessibleCards.length; index++) {
      const element = this.accessibleCards[index];
      if (
        element.suitType === cardToBeRemove.suitType &&
        element.sequenceNumber === cardToBeRemove.sequenceNumber
      ) {
        this.accessibleCards.splice(index, 1);
      }
    }

    for (let index = 0; index < this.drawnCards.length; index++) {
      const element = this.drawnCards[index];
      if (
        element.suitType === cardToBeRemove.suitType &&
        element.sequenceNumber === cardToBeRemove.sequenceNumber
      ) {
        this.drawnCards.splice(index, 1);
      }
    }
    return true;
  }

  getDrawnCards() {
    if (this.index >= this.accessibleCards.length) {
      this.index = 0;
      this.drawnCards = [];
    }
    let previousIndex = this.index;
    this.index++;
    this.drawnCards.push(this.accessibleCards[previousIndex]);
    return this.drawnCards;
  }
}

export default Stack;
