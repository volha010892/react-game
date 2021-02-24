import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import { cardsCat } from '../ImageArray';
import { cardsDog } from '../ImageArray';
import { catDog } from '../ImageArray';
import correctAnswer from '../../assets/sound/correct.mp3';
import inCorrectAnswer from '../../assets/sound/incorrect.mp3';
import Card from '../Item/Item';
import GameOver from '../GameOver/GameOver';
import Header from '../Header/Header';
import { MainContainerStyle, GameContainerStyle, ImagesContainerStyle } from './Style/Game';

export default function Game() {
  let audioCorrect = new Audio(correctAnswer);
  let audioInCorrect = new Audio(inCorrectAnswer);
  const [cardType, setCardType] = useState(cardsCat);
  const [restart, setRestart] = useState(false);
  const [bigSize, setBigSize] = useState(false);
  const [checkCardsCount, setCheckCardsCount] = useState(0);
  const [checkCardsIndex, setCheckCardsIndex] = useState([]);
  const [cardsArray, setCardsArray] = useState(cardType);
  const [score, setScore] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    setRestart(false);
    let secondImagesArray = cardType.slice(0, cardType.length);
    let newArray = cardType.concat(secondImagesArray);
    newArray.sort(() => Math.random() - 0.5);
    setCardsArray(newArray);
  }, [cardType, restart]);
  useEffect(() => {
    const finished = !cardsArray.some((card) => !card.check);
    if (finished) {
      setGameOver(true);
    }
  });
  /*if (finished && cardsArray.length > 0) {
    setTimeout(() => {
      const bestPossible = cardsArray.length
      let multiplier

      if (options === 12) {
        multiplier = 5
      } else if (options === 18) {
        multiplier = 2.5
      } else if (options === 24) {
        multiplier = 1
      }

      const pointsLost = multiplier * (0.66 * checkCardsCount - bestPossible)

      let score
      if (pointsLost < 100) {
        score = 100 - pointsLost
      } else {
        score = 0
      }

      if (score > highScore) {
        setHighScore(score)
        const json = JSON.stringify(score)
        localStorage.setItem('memorygamehighscore', json)
      }

  }, [cardsArray])*/
  const resetGame = () => {
    setGameOver(false);
    setRestart(true);
    setScore(100);
    setCheckCardsCount(0);
    setCheckCardsIndex([]);
    cardsArray.map((card) => (card.check = false));
  };
  const changeCardType = (e) => {
    if (e.target.id == 1) setCardType(cardsDog);
    if (e.target.id == 2) setCardType(cardsCat);
    setBigSize(false);
    resetGame();
  };
  const changeSize = () => {
    setCardType(catDog);
    setBigSize(true);
    resetGame();
  };
  const changeSound = () => {
    setMute((prev) => !prev);
  };
  if (checkCardsIndex.length === 2) {
    const match = cardsArray[checkCardsIndex[0]].id === cardsArray[checkCardsIndex[1]].id;
    setScore(
      checkCardsCount * 1.3 < cardsArray.length
        ? 100
        : 100 + cardsArray.length - checkCardsCount * 2,
    );
    if (match) {
      if(!mute)
      audioCorrect.play();
      const newGame = [...cardsArray];
      newGame[checkCardsIndex[0]].check = true;
      newGame[checkCardsIndex[1]].check = true;
      setCardsArray(newGame);
      const newIndexes = [...checkCardsIndex];
      newIndexes.push(false);
      setCheckCardsIndex(newIndexes);
    } else {
      if(!mute)
      audioInCorrect.play();
      const newIndexes = [...checkCardsIndex];
      newIndexes.push(true);
      setCheckCardsIndex(newIndexes);
    }
  }
  if (cardsArray.length === 0) return <div>loading...</div>;
  else {
    return (
      <MainContainerStyle>
        <Header
          score={score}
          changeCardType={changeCardType}
          changeSize={changeSize}
          mute={mute}
          changeSound={changeSound}
        />
        {gameOver && <GameOver resetGame={resetGame} score={score} />}
        {!restart && (
          <GameContainerStyle>
            <ImagesContainerStyle>
              {cardsArray.map((card, i) => (
                <Card
                  key={i}
                  img={card.img}
                  id={i}
                  cards={cardsArray}
                  size={bigSize}
                  checkCardsCount={checkCardsCount}
                  setCheckCardsCount={setCheckCardsCount}
                  checkCardsIndex={checkCardsIndex}
                  setCheckCardsIndex={setCheckCardsIndex}
                  gameOver={gameOver}
                />
              ))}
            </ImagesContainerStyle>
          </GameContainerStyle>
        )}
        <Footer />
      </MainContainerStyle>
    );
  }
}
