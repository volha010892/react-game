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
  const [check, setCheck] = useState(false);
  const cardClick = () => {
    if (!gameOver) {
      if (!cards[id].check && checkCardsCount % 3 === 0) {
        setCheck((prev) => !prev);
        setCheckCardsCount(checkCardsCount + 1);
        const newIndexes = [...checkCardsIndex];
        newIndexes.push(id);
        setCheckCardsIndex(newIndexes);
      } else if (checkCardsCount % 3 === 1 && !cards[id].check && checkCardsIndex.indexOf(id) < 0) {
        setCheck((prev) => !prev);
        setCheckCardsCount(checkCardsCount + 1);
        const newIndexes = [...checkCardsIndex];
        newIndexes.push(id);
        setCheckCardsIndex(newIndexes);
      }
    }
  };
  useEffect(() => {
    if (checkCardsIndex[2] === true && checkCardsIndex.indexOf(id) > -1) {
      setTimeout(() => {
        setCheck((prev) => !prev);
        setCheckCardsCount(checkCardsCount + 1);
        setCheckCardsIndex([]);
      }, 1000);
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
      <Flipper className={check ? 'click' : ''}>
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
