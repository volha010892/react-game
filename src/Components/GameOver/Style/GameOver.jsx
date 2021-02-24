import styled from 'styled-components';
export const GameOverStyle = styled.div`
  position: absolute;
  top: 10px;
  background-color: white;
  z-index: 3;
  height: 30%;
  width: 90%;
  box-shadow: 4px 4px 10px gray;
  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`;
export const ButtonStyle = styled.button`
  background: #00ad9f;
  border-radius: 4px;
  font-weight: 700;
  color: #fff;
  border: none;
  padding: 7px 15px;
  margin-left: 8px;
  cursor: pointer;
  &:hover {
    background: #008378;
  }
  &:focus {
    outline: 0;
  }
`;
