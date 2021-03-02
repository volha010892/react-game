import React from 'react';
import { GameOverStyle, ButtonStyle, BestResult } from './Style/GameOver';
export default function GameOver({ name, resetGame, score, savedScore }) {
  console.log(savedScore);
  const save=()=>{
    localStorage.setItem('score', JSON.stringify(score));
  }
  console.log(name)
  return (
    <GameOverStyle>
      <div>
        <p> You win!</p>
        <p>Your score: {score}</p>
        {name && (
          <div>
            <input type="text" ></input>
            <button type="submit" onClick={save}>Save</button>
          </div>
        )}
        <ButtonStyle onClick={resetGame}>Reset game</ButtonStyle>
        {savedScore ? (
          savedScore.length > 1 && savedScore.map((el) => <BestResult>{savedScore}</BestResult>)
        ) : (
          <BestResult>{savedScore}</BestResult>
        )}
      </div>
    </GameOverStyle>
  );
}
