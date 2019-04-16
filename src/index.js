/* eslint-disable react/react-in-jsx-scope */
import Game from './model/Game';
import ReactDom from 'react-dom';
import React from 'react';
import Deck from './model/Deck';
import Suit from './model/Suit';
import CardStore from './model/CardStore';
import Stack from './model/Stack';
import App from './App';

const deck = new Deck(
  new Suit('heart', 'red'),
  new Suit('spade', 'black'),
  new Suit('diamond', 'red'),
  new Suit('club', 'black')
);

const cards = new CardStore().getCards();
const game = new Game(deck, new Stack(), cards);

ReactDom.render(<App game={game} />, document.getElementById('root'));
