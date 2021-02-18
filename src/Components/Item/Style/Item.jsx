import styled from 'styled-components';
import bg from '../../../assets/img/bg.png';
export const ItemContainerStyle = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 120px;
  width: 120px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px black;
  margin: 10px;
  object-fit: cover;
  &.front,
  &.back {
    background-size: cover;
  }

  &.back {
    opacity: opacity.interpolate(1 => o - 1);
    background-image: url(${bg});
 
  }

  &.front {
    background-image: url(https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80&auto=format&fit=crop);
  }
`;
