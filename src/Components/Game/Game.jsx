import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useHotkeys } from 'react-hotkeys-hook';
import { cardsCat } from '../ImageArray';
import { cardsDog } from '../ImageArray';
import { catDog } from '../ImageArray';
import correctAnswer from '../../assets/sound/correct.mp3';
import inCorrectAnswer from '../../assets/sound/incorrect.mp3';
import Footer from '../Footer/Footer';
import Card from '../Item/Item';
import GameOver from '../GameOver/GameOver';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import { MainContainerStyle, ImagesContainerStyle, Container } from './Style/Game';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
export default function Game() {
  const size = useWindowSize();
  let audioCorrect = new Audio(correctAnswer);
  let audioInCorrect = new Audio(inCorrectAnswer);
  const [cardType, setCardType] = useState(cardsCat);
  const [changeType, setChangeType] = useState(false);
  const [restart, setRestart] = useState(false);
  const [bigSize, setBigSize] = useState(false);
  const [checkCardsCount, setCheckCardsCount] = useState(0);
  const [checkCardsIndex, setCheckCardsIndex] = useState([]);
  const [cardsArray, setCardsArray] = useState(cardType);
  const [score, setScore] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [mute, setMute] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(false);
  const [autoplay, setAutoPlay] = useState(false);
  const [autoplayNumber, setAutoplayNumber] = useState(null);
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    setRestart(false);
    if (bigSize) setCardType(catDog);
    else if (changeType) setCardType(cardsDog);
    else setCardType(cardsCat);
    let secondImagesArray = JSON.parse(JSON.stringify(cardType));
    cardType.map((el, i) => (el.index = i));
    secondImagesArray.map((el, i) => (el.index = i + secondImagesArray.length));
    let newArray = cardType.concat(secondImagesArray);
    newArray.sort(() => Math.random() - 0.5);
    setCardsArray(newArray);
  }, [changeType, restart, bigSize]);

  useEffect(() => {
    if (size.height > size.width) setMobileMenu(true);
    if (size.height < size.width) setMobileMenu(false);
    const finished = !cardsArray.some((card) => !card.check);
    if (finished) {
      setGameOver(true);
    }
  });

  /*if (finished && cardsArray.length > 0) {
    setTimeout(() => {
      const bestPossible = cardsArray.length

      if (score > highScore) {
        setHighScore(score)
        const json = JSON.stringify(score)
        localStorage.setItem('memorygamehighscore', json)
      }

  }, [cardsArray])*/
  const handle = useFullScreenHandle();
  const resetGame = () => {
    clearInterval(intervalId);
    setAutoPlay(false);
    setGameOver(false);
    setRestart(true);
    setScore(100);
    setCheckCardsCount(0);
    setCheckCardsIndex([]);
    setAutoplayNumber(null);
    cardsArray.map((card) => (card.check = false));
  };
  const changeCardType = () => {
    setChangeType((prev) => !prev);
    resetGame();
  };
  const changeSize = () => {
    setBigSize((prev) => !prev);
    resetGame();
  };
  const changeSound = () => {
    setMute((prev) => !prev);
  };
  const changeColor = () => {
    setBackgroundColor((prev) => !prev);
  };

  const autoPlay = (e) => {
    resetGame();
    setAutoPlay(true);
    let arrayID = cardsArray.map((card, i) => card.index);
    let cardIndexRandom = [];
    let returnIndex = [];
    let prevIndex = [];
    let refreshIntervalId = null;
    const play = () => {
      if (arrayID.length === 0 || gameOver) {
        setAutoPlay(false);
        clearInterval(refreshIntervalId);
        setAutoplayNumber(null);
        return;
      } else {
        let random = Math.floor(Math.random() * Math.floor(arrayID.length));
        let randomId = random;
        setAutoplayNumber(arrayID[randomId]);
        let indexPush = null;
        cardsArray.forEach((el) => {
          if (el.index === arrayID[randomId]) {
            indexPush = parseInt(el.id);
          }
        });
        cardIndexRandom.push(indexPush);
        let index = arrayID.indexOf(arrayID[random]);
        returnIndex.push(arrayID[index]);
        arrayID.splice(index, 1);
        if (cardIndexRandom.length == 2) {
          if (cardIndexRandom[0] !== cardIndexRandom[1]) {
            prevIndex = returnIndex[1];
            let newcardRandom = arrayID.concat(returnIndex[0]);
            arrayID = newcardRandom;
            cardIndexRandom = [];
            returnIndex = [];
          } else {
            cardIndexRandom = [];
            returnIndex = [];
          }
        } else if (cardIndexRandom.length == 1) {
          let newcardRandom = arrayID.concat(prevIndex);
          arrayID = newcardRandom;
          prevIndex = [];
        }
      }
    };
    const id = setInterval(play, 2000);
    setIntervalId(id);
  };
  const stopAutoPlay = () => {
    setAutoPlay(false);
    clearInterval(intervalId);
  };
  useHotkeys('ctrl+x', () => setBackgroundColor((prev) => !prev));
  useHotkeys('ctrl+z', () => setMute((prev) => !prev));
  useHotkeys('ctrl+c', () => changeSize());
  useHotkeys('ctrl+v', () => changeCardType());
  useHotkeys('ctrl+enter', () => resetGame());

  if (checkCardsIndex.length === 2) {
    const match = cardsArray[checkCardsIndex[0]].id === cardsArray[checkCardsIndex[1]].id;
    setScore(
      checkCardsCount * 1.3 < cardsArray.length
        ? 100
        : 100 + cardsArray.length - checkCardsCount * 2,
    );
    if (match) {
      if (!mute) audioCorrect.play();
      const newGame = [...cardsArray];
      newGame[checkCardsIndex[0]].check = true;
      newGame[checkCardsIndex[1]].check = true;
      setCardsArray(newGame);
      const newIndexes = [...checkCardsIndex];
      newIndexes.push(false);
      setCheckCardsIndex(newIndexes);
    } else {
      if (!mute) audioInCorrect.play();
      const newIndexes = [...checkCardsIndex];
      newIndexes.push(true);
      setCheckCardsIndex(newIndexes);
    }
  }
  if (cardsArray.length === 0) return <div>loading...</div>;
  else {
    return (
      <FullScreen handle={handle}>
        <MainContainerStyle
          style={{
            height: `${size.height}px`,
            width: `${size.width}px`,
            background: backgroundColor ? '#fc8a7e' : '#fff',
          }}>
          <Header handle={handle} score={score} />
          {gameOver && <GameOver resetGame={resetGame} score={score} />}
          {!restart && (
            <Container className={mobileMenu ? 'column' : 'row'}>
              <ImagesContainerStyle
                style={{ height: !mobileMenu?`${0.8 * size.height}px`:`${0.6 * size.height}px`, width: `${0.8 * size.width}px` }}>
                {cardsArray.map((card, i) => (
                  <Card
                    key={i}
                    img={card.img}
                    id={i}
                    autoplayNumber={autoplayNumber}
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
              <Menu
                mobileMenu={mobileMenu}
                changeCardType={changeCardType}
                changeSize={changeSize}
                mute={mute}
                changeSound={changeSound}
                changeColor={changeColor}
                resetGame={resetGame}
                autoPlay={autoPlay}
                autoplay={autoplay}
                stopAutoPlay={stopAutoPlay}
                checkCardsCount={checkCardsCount}
              />
            </Container>
          )}
          <Footer />
        </MainContainerStyle>
      </FullScreen>
    );
  }
}
