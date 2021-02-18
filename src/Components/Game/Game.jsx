import React, { useEffect, useState } from 'react';
import { cardsCat } from '../ImageArray';
import { cardsDog } from '../ImageArray';
import { catDog } from '../ImageArray';
import Card from '../Item/Item';
import {
  MainContainerStyle,
  GameContainerStyle,
  ImagesContainerStyle,
  ButtonContainerStyle,
  ButtonStyle,
} from './Style/Game';

export default function Game() {
  const [cardType, setCardType] = useState(cardsCat);
  const [restart, setRestart] = useState(false);
  const [cardsArray, setCardsArray] = useState(cardType);
  useEffect(() => {
    setRestart(false);
    let secondImagesArray = cardType.slice(0, cardType.length);
    setCardsArray(cardType.concat(secondImagesArray));
  }, [cardType]);
  const changeCardType = (e) => {
    if (e.target.id == 1) setCardType(cardsDog);
    if (e.target.id == 2) setCardType(cardsCat);
    setRestart(true);
  };
  const changeSize = () => {
    setCardType(catDog);
    setRestart(true);
  };

  return (
    <MainContainerStyle>
      <ButtonContainerStyle>
        <ButtonStyle id="1" onClick={changeCardType}>
          Dog
        </ButtonStyle>
        <ButtonStyle id="2" onClick={changeCardType}>
          Cat
        </ButtonStyle>
        <ButtonStyle onClick={changeSize}>bigger size</ButtonStyle>
      </ButtonContainerStyle>
      {!restart && (
        <GameContainerStyle>
          <ImagesContainerStyle>
            {cardsArray
              .sort(() => Math.random() - 0.5)
              .map((card, i) => (
                <Card key={i} {...card} />
              ))}
          </ImagesContainerStyle>
        </GameContainerStyle>
      )}
    </MainContainerStyle>
  );
}
