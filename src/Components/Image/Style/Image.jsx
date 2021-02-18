import styled from 'styled-components';
import bg from '../../../assets/img/bg.png'
export const ItemContainerStyle = styled.img`
object-fit:cover;
  .front,
  .back {
    background-size: cover;
  }

  .back {
    background-image: url(${bg});
  }

  .front {
    background-image: url(https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80&auto=format&fit=crop);
  }
`;
