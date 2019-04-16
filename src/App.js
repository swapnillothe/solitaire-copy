import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {
  playSound,
  Deck,
  Piles,
  drop,
  allowDrop,
  Cards,
  Card
} from './display';
import flip from './card_flip.mp3';
import draw from './stock_flip.mp3';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.game = props.game;
    this.updateState = this.updateState.bind(this);
    this.state = {
      piles: this.game.piles,
      stack: this.game.stack,
      deck: this.game.deck,
      openCards: []
    };
  }

  handleDrop(e) {
    drop(this, e);
  }

  updateState() {
    this.setState(state => {
      state.piles = this.game.piles;
      state.stack = this.game.stack;
      state.deck = this.game.deck;
    });
    ReactDOM.render(this.renderPage(), document.getElementById('game-root'));
    let cards = (
      <Cards
        cards={this.state.openCards}
        draggable={true}
        classname="card-on-stack"
      />
    );
    playSound(flip);
    ReactDOM.render(cards, document.getElementById('open-card'));
  }

  getCard() {
    this.state.openCards = this.game.getStack().getDrawnCards();
    let cards = (
      <Cards
        cards={this.state.openCards}
        draggable={true}
        classname="card-on-stack"
      />
    );
    const openCards = document.getElementById('open-card');
    ReactDOM.render(cards, openCards);
    playSound(draw);
    if (this.state.openCards.length === 0) {
      document.getElementById('stack-div').onClick = null;
    }
  }

  renderPage() {
    return (
      <div id="game-root">
        <section className="top-section">
          <div className="stack" id="stack">
            <div
              className="stack-div"
              id="stack-div"
              onClick={this.getCard.bind(this)}
            >
              <Card
                card={{ colour: ' black' }}
                unicode="./cards/back.png"
                draggable={false}
                id="waste-pile"
                classname="card-on-stack"
              />
            </div>
            <div id="open-card" className="open-card">
              <Cards
                cards={this.state.openCards}
                draggable={true}
                classname="card-on-stack"
              />
            </div>
          </div>
          <div className="deck-container">
            <Deck
              deck={this.game.getDeck()}
              app={this}
              classname={'card-on-deck'}
            />
          </div>
        </section>
        <div
          className="piles"
          onDrop={this.handleDrop.bind(this)}
          onDragOver={allowDrop.bind(null, this.game)}
        >
          <Piles
            piles={this.game.getPiles()}
            game={this.game}
            classname={'pile-card'}
          />
        </div>
      </div>
    );
  }

  render() {
    this.game.startGame();
    return this.renderPage();
  }
}

export default App;
