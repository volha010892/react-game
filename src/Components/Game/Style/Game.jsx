import styled from 'styled-components';
let vh = window.innerHeight;
let vw = window.innerWidth;
export const MainContainerStyle = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;
export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  &.row{
  flex-direction: row;
  }
  &.column{
    flex-direction: column;
  }
`;
export const ButtonContainerStyle = styled.div`
  display: flex;
  align-items: center;
`;
export const ImagesContainerStyle = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  box-shadow: 4px 4px 10px gray;
  margin: 0;
`;
export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
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
export const ScoreContainer = styled.div``;
export const ContainerName = styled.div``;
