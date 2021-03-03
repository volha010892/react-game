import styled from 'styled-components';
export const GameOverStyle = styled.div`
  position: absolute;
  top: 10%;
  background-color: white;
  z-index: 3;
  font-weight: 700;
  bottom: 8%;
  left: 20px;
  right: 20px;
  box-shadow: 4px 4px 10px gray;
  div {
    display: flex;
    align-items: center;
  }
`;
export const BestResultContainer = styled.div`
flex-direction: column;
width: 80%;
tr{
  border: solid 1px #fc8a7e;
  flex-direction: row;
  display: flex;
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
