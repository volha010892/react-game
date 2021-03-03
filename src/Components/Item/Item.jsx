import React, { useState, useEffect } from 'react';
import Image from '../Image/Image';
import bg from '../../assets/img/bg.png';
import { ItemContainerStyle, Flipper, ImageFront, ImageBack } from './Style/Item';

export default function Card({
  cards,
  img,
  id,
  size,
  checkCardsCount,
  setCheckCardsCount,
  checkCardsIndex,
  setCheckCardsIndex,
  gameOver,
  autoplayNumber,
}) {
  let notAllow=null;
  const [check, setCheck] = useState(false);
  const cardClick = () => {
    if (!gameOver&&!notAllow) {
      if (!cards[id].check && checkCardsCount % 3 === 0) {
        localStorage.setItem('array', JSON.stringify(cards));
        setCheck((prev) => !prev);
        localStorage.setItem('checkCardsCount', JSON.stringify(checkCardsCount + 1));
        setCheckCardsCount(checkCardsCount + 1);
        const newIndexes = [...checkCardsIndex];
        newIndexes.push(id);
        setCheckCardsIndex(newIndexes);
        localStorage.setItem('checkCardsIndex', JSON.stringify(newIndexes));
      } else if (checkCardsCount % 3 === 1 && !cards[id].check && checkCardsIndex.indexOf(id) < 0) {
        setCheck((prev) => !prev);
        localStorage.setItem('checkCardsCount', JSON.stringify(checkCardsCount + 1));
        setCheckCardsCount(checkCardsCount + 1);
        const newIndexes = [...checkCardsIndex];
        newIndexes.push(id);
        setCheckCardsIndex(newIndexes);
        localStorage.setItem('checkCardsIndex', JSON.stringify(newIndexes));
      }
    }
  };
  useEffect(() => {
    if (checkCardsIndex[0] === id) {
      cardClick();
      setCheck(true);
    }
  }, [checkCardsIndex]);
  useEffect(() => {
    if (checkCardsIndex[2] === true && checkCardsIndex.indexOf(id) > -1) {
     notAllow=true;
      setTimeout(() => {
        setCheck((prev) => !prev);
        setCheckCardsCount(checkCardsCount + 1);
        localStorage.setItem('checkCardsCount', JSON.stringify(checkCardsCount + 1));
        setCheckCardsIndex([]);
        localStorage.setItem('checkCardsIndex', JSON.stringify([]));
        notAllow=false;
      }, 300);
    } else if (checkCardsIndex[2] === false && id === 0) {
      setCheckCardsCount(checkCardsCount + 1);
      setCheckCardsIndex([]);
    }
  }, [checkCardsIndex]);
  useEffect(() => {
    if (cards[id].index === autoplayNumber) {
      cardClick();
    }
  }, [autoplayNumber]);
  return (
    <ItemContainerStyle
      onClick={cardClick}
      className={check ? 'click' : ''}
      className={size ? 'big' : 'normal'}>
      <Flipper className={cards[id].check || check ? 'click' : ''}>
        <ImageFront>
          <Image src={bg} />
        </ImageFront>
        <ImageBack>
          <Image src={img} id={id} />
        </ImageBack>
      </Flipper>
    </ItemContainerStyle>
  );
}
