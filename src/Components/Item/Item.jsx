import React, { useState} from 'react';
import Image from '../Image/Image';
import bg from '../../assets/img/bg.png';
import { ItemContainerStyle } from './Style/Item';

export default function Card({ img, /*isActive, onClick, */ id }) {
  const [check, setCheck] = useState(false);
  return (

    <ItemContainerStyle
    className={check?'':'back'} style={{transform:check?'rotateX(180deg)':'rotateX(0deg)'}}
      onClick={() => setCheck((prev) => !prev)}>
      <Image src={check?img:''} id={id} />
    </ItemContainerStyle>
  );
}
