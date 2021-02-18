import styled from 'styled-components';
let vh=window.innerHeight;
export const MainContainerStyle = styled.div`
height: ${vh}px;
margin: 0 auto;
display: flex;
justify-content: space-around;
flex-direction: column;
align-items: center;
`;
export const GameContainerStyle = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;
export const ButtonContainerStyle = styled.div`
display: flex;
align-items: center;
`;
export const ImagesContainerStyle = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
box-shadow: 4px 4px 10px gray;
&.big{
  width: 855px;
  height: auto;
}
&.normal{
  height: 450px;
  width: 570px;
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
