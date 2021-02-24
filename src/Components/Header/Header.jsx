import React from 'react';
import muteSound from '../../assets/img/mute.svg';
import unmuteSound from '../../assets/img/unmute.svg';
import {
  HeaderStyle,
  ButtonContainerStyle,
  ButtonStyle,
  ScoreContainer,
  ContainerName,
  SoundContainerStyle
} from './Style/Header';
export default function Header({ score, changeCardType, changeSize, mute, changeSound }) {
  return (
    <HeaderStyle>
      <ContainerName>Memory Game</ContainerName>
      <ScoreContainer>Score: {score}</ScoreContainer>
      <ButtonContainerStyle>
        <ButtonStyle id="1" onClick={changeCardType}>
          Dog
        </ButtonStyle>
        <ButtonStyle id="2" onClick={changeCardType}>
          Cat
        </ButtonStyle>
        <ButtonStyle onClick={changeSize}>bigger size</ButtonStyle>
        <SoundContainerStyle onClick={changeSound}> 
          {mute ? <img src={muteSound} alt="mute" /> : <img src={unmuteSound} alt="mute" />}
        </SoundContainerStyle>
      </ButtonContainerStyle>
    </HeaderStyle>
  );
}
