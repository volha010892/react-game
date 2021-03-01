import styled from 'styled-components';
export const MenuStyle = styled.div`
  display: flex;
  justify-content: center;
`;
export const SoundContainerStyle = styled.div`
  width: 30%;
  background: #fc8a7e;
  border-radius: 4px;
  font-weight: 700;
  color: #fff;
  border: none;
  padding: 7px 15px;
  cursor: pointer;
  &:hover {
    background: #fa3232;
  }
  &:focus {
    outline: 0;
  }
`;

export const ButtonStyle = styled.button`
  width: 100%;
  background: #00ad9f;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.9em;
  color: #fff;
  border: none;
  padding: 7px 15px;
  cursor: pointer;
  &:hover {
    background: #008378;
  }
  &:focus {
    outline: 0;
  }
`;
export const MenuRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  &.column {
    flex-direction: column;
  }
  &.row {
    flex-direction: row;
    width: 90%;
  }
`;
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  font-weight: 700;
  font-size: 0.8em;
`;
export const ButtonContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;
