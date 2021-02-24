import React from 'react';
import { GameOverStyle, ButtonStyle } from './Style/GameOver';
export default function GameOver({ resetGame, score }) {
  return (
    <GameOverStyle>
      <div>
        <p> You win!</p>
        <p>Your score: {score}</p>
        <ButtonStyle onClick={resetGame}>Reset game</ButtonStyle>
      </div>
    </GameOverStyle>
  );
}
