import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useHotkeys } from 'react-hotkeys-hook';
import { cardsCat, catDog, cardsDog } from '../ImageArray';
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
  const handle = useFullScreenHandle();
  const [cardType, setCardType] = useState(cardsCat);
  const [changeType, setChangeType] = useState(false);
  const [restart, setRestart] = useState(false);
  const [bigSize, setBigSize] = useState(false);
  const [checkCardsCount, setCheckCardsCount] = useState(0);
  const [checkCardsIndex, setCheckCardsIndex] = useState([]);
  const [cardsArray, setCardsArray] = useState(cardType);
  const [score, setScore] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(false);
  const [autoplay, setAutoPlay] = useState(false);
  const [autoplayNumber, setAutoplayNumber] = useState(null);
  const [intervalId, setIntervalId] = useState();
  const [volume, setVolume] = useState(1);
  const [mute, setMute] = useState(false);
  const [numberSteps, setNumberSteps] = useState(0);
  const [finished, setFinished] = useState(false);
  const [savedScore, setSavedScore] = useState([]);
  const [name, setName] = useState(false);

  let audioCorrect = new Audio(correctAnswer);
  audioCorrect.volume = volume;
  let audioInCorrect = new Audio(inCorrectAnswer);
  audioInCorrect.volume = volume;
  useEffect(() => {
    setRestart(false);
    let array = JSON.parse(localStorage.getItem('array'));
    if (array) {
      setCardsArray(array);
    } else if (bigSize) {
      setCardType(catDog);
      let secondImagesArray = JSON.parse(JSON.stringify(catDog));
      catDog.map((el, i) => {
        el.check = false;
        el.index = i;
      });
      secondImagesArray.map((el, i) => {
        el.check = false;
        el.index = i + secondImagesArray.length;
      });
      let newArray = catDog.concat(secondImagesArray);
      newArray.sort(() => Math.random() - 0.5);
      setCardsArray(newArray);
    } else {
      let ar = [];
      if (changeType) ar = cardsDog;
      if (changeType) ar = cardsDog;
      else ar = cardsCat;
      let secondImagesArray = JSON.parse(JSON.stringify(ar));
      ar.map((el, i) => {
        el.check = false;
        el.index = i;
      });
      secondImagesArray.map((el, i) => {
        el.check = false;
        el.index = i + secondImagesArray.length;
      });
      let newArray = ar.concat(secondImagesArray);
      newArray.sort(() => Math.random() - 0.5);
      setCardsArray(newArray);
    }
  }, [changeType, restart, bigSize]);
  useEffect(() => {
    if (finished) {
      setGameOver(true);
      console.log(savedScore.length, savedScore);
      if (savedScore.length < 6 && score > savedScore[savedScore.length - 1]) setName(true);
    }
  }, [finished]);
  useEffect(() => {
    let type = JSON.parse(localStorage.getItem('type'));
    if (type === null) localStorage.setItem('type', JSON.stringify(changeType));
    else setChangeType(type);
    let sizeAr = JSON.parse(localStorage.getItem('size'));
    if (sizeAr) setBigSize(sizeAr);
    else localStorage.setItem('size', JSON.stringify(bigSize));
    let cardcount = JSON.parse(localStorage.getItem('checkCardsCount'));
    if (!cardcount) localStorage.setItem('checkCardsCount', JSON.stringify(checkCardsCount));
    else setCheckCardsCount(cardcount);
    let cardindex = JSON.parse(localStorage.getItem('checkCardsIndex'));
    if (!cardindex) localStorage.setItem('checkCardsIndex', JSON.stringify(checkCardsIndex));
    else setCheckCardsIndex(cardindex);
    let scoreSave = JSON.parse(localStorage.getItem('score'));
    if (!scoreSave||scoreSave.length===0) localStorage.setItem('score', JSON.stringify(score));
    else setScore(scoreSave);
    let stepSave = JSON.parse(localStorage.getItem('step'));
    if (!stepSave||stepSave.length===0) localStorage.setItem('step', JSON.stringify(numberSteps));
    else setNumberSteps(stepSave);
    let highScores = JSON.parse(localStorage.getItem('scores'));
    if (!highScores) localStorage.setItem('scores', JSON.stringify(score));
    else {
      if (Array.isArray(highScores)) {
        highScores.sort(function (a, b) {
          return a.value - b.value;
        });
      }
      setSavedScore(highScores);
    }
    console.log(highScores);
  }, []);
  useEffect(() => {
    if (size.height > size.width) setMobileMenu(true);
    if (size.height < size.width) setMobileMenu(false);
    setFinished(!cardsArray.some((card) => !card.check));
  });
  const resetGame = () => {
    clearInterval(intervalId);
    setNumberSteps(0);
    setAutoPlay(false);
    setGameOver(false);
    setRestart(true);
    setScore(100);
    setCheckCardsCount(0);
    setCheckCardsIndex([]);
    setAutoplayNumber(null);
    localStorage.removeItem('size');
    localStorage.removeItem('step');
    localStorage.removeItem('type');
    localStorage.removeItem('score');
    localStorage.setItem('array', null);
    localStorage.removeItem('checkCardsCount');
    localStorage.removeItem('checkCardsIndex');
  };
  const newGame = () => {
    clearInterval(intervalId);
    setRestart(true);
    setNumberSteps(0);
    setAutoPlay(false);
    setGameOver(false);
    setScore(100);
    setCheckCardsCount(0);
    setCheckCardsIndex([]);
    setAutoplayNumber(null);
    localStorage.removeItem('size');
    localStorage.removeItem('score');
    localStorage.removeItem('type');
    localStorage.removeItem('step');
    localStorage.setItem('array', null);
    localStorage.removeItem('checkCardsCount');
    localStorage.removeItem('checkCardsIndex');
  };
  const changeCardType = () => {
    setChangeType((prev) => !prev);
    localStorage.setItem('type', JSON.stringify(!changeType));
    newGame();
  };
  const changeSize = () => {
    setBigSize((prev) => !prev);
    localStorage.setItem('size', JSON.stringify(!bigSize));
    newGame();
  };
  const changeSound = () => {
    setMute((prev) => !prev);
  };
  const changeColor = () => {
    setBackgroundColor((prev) => !prev);
  };
  const setAudioVolume = (e) => {
    setVolume(e.target.value);
    if (e.target.value == 0) setMute(true);
    else setMute(false);
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
    const id = setInterval(play, 800);
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
    setNumberSteps((prev) => prev + 1);
    localStorage.setItem('step', JSON.stringify(numberSteps+1));
    const match = cardsArray[checkCardsIndex[0]].id === cardsArray[checkCardsIndex[1]].id;
    const scorePoin = 100 + cardsArray.length - checkCardsCount * 2;
    let finalScore=null;
    if (checkCardsCount * 1.3 < cardsArray.length) finalScore = 100;
    else if (scorePoin < 1) finalScore = 0;
    else finalScore = 100 + cardsArray.length - checkCardsCount * 2;
    setScore(finalScore);
    localStorage.setItem('score', JSON.stringify(finalScore));
    if (match) {
      if (!mute) audioCorrect.play();
      const newGame = [...cardsArray];
      newGame[checkCardsIndex[0]].check = true;
      newGame[checkCardsIndex[1]].check = true;
      setCardsArray(newGame);
      localStorage.setItem('array', JSON.stringify(newGame));
      const newIndexes = [...checkCardsIndex];
      newIndexes.push(false);
      setCheckCardsIndex(newIndexes);
      localStorage.setItem('checkCardsIndex', JSON.stringify(newIndexes));
    } else {
      if (!mute) audioInCorrect.play();
      const newIndexes = [...checkCardsIndex];
      newIndexes.push(true);
      setCheckCardsIndex(newIndexes);
      localStorage.setItem('checkCardsIndex', JSON.stringify(newIndexes));
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
          <Header numberSteps={numberSteps} handle={handle} score={score} mobileMenu={mobileMenu} />
          {gameOver && (
            <GameOver name={name} savedScore={savedScore} resetGame={resetGame} score={score} />
          )}

          {!restart && (
            <Container className={mobileMenu ? 'column' : 'row'}>
              <ImagesContainerStyle
                style={{
                  height: !mobileMenu ? `${0.8 * size.height}px` : `${0.6 * size.height}px`,
                  width: `${0.8 * size.width}px`,
                }}>
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
                setChangeType={setChangeType}
                setBigSize={setBigSize}
                mute={mute}
                changeSound={changeSound}
                changeColor={changeColor}
                resetGame={resetGame}
                autoPlay={autoPlay}
                autoplay={autoplay}
                stopAutoPlay={stopAutoPlay}
                checkCardsCount={checkCardsCount}
                volume={volume}
                setAudioVolume={setAudioVolume}
                bigSize={bigSize}
              />
            </Container>
          )}
          <Footer />
        </MainContainerStyle>
      </FullScreen>
    );
  }
}
