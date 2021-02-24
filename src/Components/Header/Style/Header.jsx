import styled from 'styled-components';
export const ButtonContainerStyle = styled.div`
  display: flex;
  align-items: center;
`;
export const HeaderStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
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
export const SoundContainerStyle = styled.div`
  background: #fc8a7e;
  border-radius: 4px;
  font-weight: 700;
  color: #fff;
  border: none;
  padding: 7px 15px;
  margin-left: 8px;
  cursor: pointer;
  &:hover {
    background: #fa3232;
  }
  &:focus {
    outline: 0;
  }
`;
export const ScoreContainer = styled.div`
font-weight: 700;
`;
export const ContainerName = styled.div`
font-size: 1.5em;
font-weight: 700;
`;
