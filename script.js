'use strict';

// Selecting elements containing the data for the project

const player0_elem = document.querySelector('.player--0');
const player1_elem = document.querySelector('.player--1');
const score0_el = document.querySelector('#score--0');
const score1_el = document.getElementById('score--1');
const current0_el = document.getElementById('current--0');
const current1_el = document.getElementById('current--1');

const DICE_elem = document.querySelector('.dice');
const button_new = document.querySelector('.btn--new');
const button_roll = document.querySelector('.btn--roll');
const button_hold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting condition

const INIT = () => {
  //   The initial conditions for the game to start or reset
  scores = [0, 0]; // Player 1(0) score, Player 2(1) score
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0_el.textContent = 0;
  score1_el.textContent = 0;
  current0_el.textContent = 0;
  current1_el.textContent = 0;

  DICE_elem.classList.add('hidden');
  player0_elem.classList.remove('player--winner');
  player1_elem.classList.remove('player--winner');
  player0_elem.classList.add('player--active');
  player1_elem.classList.remove('player--active');
};
INIT();
// Switching the active player
const switchPlayers = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0_elem.classList.toggle('player--active');
  player1_elem.classList.toggle('player--active');
};

// Rolling the dice functionality

button_roll.addEventListener('click', () => {
  if (playing) {
    // 1. Generating random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    DICE_elem.classList.remove('hidden');
    DICE_elem.src = `dice-${diceRoll}.png`;
    // 3. Check the roll (if 1)
    if (diceRoll !== 1) {
      // Add dice to current score
      currentScore += diceRoll;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayers();
    }
  }
});

// Holding the score
button_hold.addEventListener('click', () => {
  if (playing) {
    // 1. Add current score to the active player's total score
    scores[activePlayer] += currentScore;
    // Uploading the score to the document
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finishing the game
      playing = false; // No more input from the buttons taken
      DICE_elem.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); // Winner Screen
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayers();
    }
  }
});

// Reset functionality using the INIT function
button_new.addEventListener('click', INIT);
