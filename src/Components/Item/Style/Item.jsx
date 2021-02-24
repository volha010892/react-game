import styled from 'styled-components';
let vh = window.innerHeight;
let vw = window.innerWidth;
export const Flipper = styled.div`
  height: 100%;
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
  &.click {
    transform: rotateY(180deg);
  }
`;
export const ItemContainerStyle = styled.div`
  border-radius: 5px;
  box-shadow: 2px 2px 3px black;
  margin: 10px;
  perspective: 1000;
  &.big {
    width: ${vw / 5 - 50}px;
    height: ${0.18 * vh}px;
  }
  &.normal {
    width: ${vw /4 - 50}px;
    height: ${0.25 * vh}px;
  }
  &.click {
    transform: rotateY(180deg);
  }
`;
export const ImageFront = styled.div`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  z-index: 2;
  position: absolute;
`;
export const ImageBack = styled.div`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  position: absolute;
`;
