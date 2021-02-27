import muteSound from '../../assets/img/mute.svg';
import unmuteSound from '../../assets/img/unmute.svg';
import {
  ButtonContainerStyle,
  Container,
  ButtonStyle,
  MenuStyle,
  SoundContainerStyle,
} from './Style/Menu';
export default function Menu({
  mobileMenu,
  changeCardType,
  changeSize,
  mute,
  changeSound,
  changeColor,
  resetGame,
  autoPlay,
  autoplay,
  stopAutoPlay,
}) {
  return (
    <MenuStyle>
      <ButtonContainerStyle className={mobileMenu ? 'row' : 'column'}>
        <Container>
          <ButtonStyle
            disabled={autoplay}
            style={{ opacity: autoplay ? '0.5' : '1' }}
            onClick={changeCardType}>
            Change Type
          </ButtonStyle>
          CTRL+v
        </Container>
        <Container>
          <ButtonStyle
            disabled={autoplay}
            style={{ opacity: autoplay ? '0.5' : '1' }}
            onClick={changeSize}>
            Change Size
          </ButtonStyle>
          CTRL+c
        </Container>
        <Container>
          <ButtonStyle onClick={changeColor}>Change Color</ButtonStyle>
          CTRL+x
        </Container>
        <Container>
          <ButtonStyle
            disabled={autoplay}
            style={{ opacity: autoplay ? '0.5' : '1' }}
            onClick={resetGame}>
            New Game
          </ButtonStyle>
          CTRL+ENTER
        </Container>
        <Container>
          <SoundContainerStyle onClick={changeSound}>
            {mute ? <img src={muteSound} alt="mute" /> : <img src={unmuteSound} alt="mute" />}
          </SoundContainerStyle>
          CTRL+z
        </Container>
        <Container>
          <ButtonStyle
            disabled={autoplay}
            style={{ opacity: autoplay ? '0.5' : '1' }}
            onClick={autoPlay}>
            Autoplay
          </ButtonStyle>
          <ButtonStyle
            disabled={!autoplay}
            style={{ opacity: !autoplay ? '0.5' : '1' }}
            onClick={stopAutoPlay}>
            Stop autoplay
          </ButtonStyle>
        </Container>
      </ButtonContainerStyle>
    </MenuStyle>
  );
}
