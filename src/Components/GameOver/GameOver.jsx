import React, { useState, useEffect } from 'react';
import { GameOverStyle, ButtonStyle, BestResultContainer } from './Style/GameOver';
export default function GameOver({ resetGame, score }) {
  const [nameSave, setNameSave] = useState('Enter your name');
  const [name, setName] = useState(false);
  const [savedScore, setSavedScore] = useState([]);
  useEffect(() => {
    let highScores = JSON.parse(localStorage.getItem('scores'));
    if (!highScores) {
      highScores = savedScore;
      localStorage.setItem('scores', JSON.stringify(savedScore));
    } else {
      if (Array.isArray(highScores)) {
        highScores.sort(function (a, b) {
          return b.score - a.score;
        });
      }
      setSavedScore(highScores);
    }
    if (
      highScores.length === 0 ||
      highScores.length < 6 ||
      score > highScores[highScores.length - 1].score
    )
      setName(true);
  }, []);
  const nameChange = (e) => {
    setNameSave(e.target.value);
  };
  const save = () => {
    setName(false);
    let sco = [...savedScore];
    if (sco.length > 5) sco.pop();
    sco.push({ name: nameSave, score: score });
    if (Array.isArray(sco)) {
      sco.sort(function (a, b) {
        return b.score - a.score;
      });
    }
    localStorage.setItem('scores', JSON.stringify(sco));
    let m = JSON.parse(localStorage.getItem('scores'));
    setSavedScore(m);
  };
  return (
    <GameOverStyle>
      <div style={{ flexDirection: 'column' }}>
        <div style={{ flexDirection: 'column' }}>
          <p> You win!</p>
          <p>Your score: {score}</p>
          <ButtonStyle onClick={resetGame}>Reset game</ButtonStyle>
          {name && (
            <div style={{ flexDirection: 'column' }}>
              <input
                style={{ margin: '10px' }}
                type="text"
                value={nameSave}
                onChange={nameChange}></input>
              <ButtonStyle type="submit" onClick={save}>
                Save
              </ButtonStyle>
            </div>
          )}
        </div>
        {savedScore && (
          <BestResultContainer>
            <p>Best results:</p>
            <table style={{ border: 'solid 1px #00ad9f', width: '100%' }}>
              <thead>
                <tr>
                  <td style={{ width: '20%' }}>№</td>
                  <td style={{ width: '40%' }}>NAME</td>
                  <td style={{ width: '40%' }}>SCORE</td>
                </tr>
              </thead>
              <tbody>
                {savedScore.map((el, i) => (
                  <tr key={i}>
                    <td style={{ width: '20%' }}>{i + 1}.</td>
                    <td style={{ width: '40%' }}>{el.name}</td>
                    <td style={{ width: '40%' }}>{el.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </BestResultContainer>
        )}
      </div>
    </GameOverStyle>
  );
}
