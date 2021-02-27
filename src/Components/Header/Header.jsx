import React from 'react';
import fullScreen from '../../assets/img/fullscreen.svg';
import { HeaderStyle, ScoreContainer, ContainerName, FullScreen } from './Style/Header';
export default function Header({ score, handle }) {
  return (
    <HeaderStyle>
      <ContainerName>Memory Game</ContainerName>
      <ScoreContainer>Score: {score}</ScoreContainer>
      <FullScreen onClick={handle.enter}>
        <img src={fullScreen} alt="full screen button" />
      </FullScreen>
    </HeaderStyle>
  );
}
