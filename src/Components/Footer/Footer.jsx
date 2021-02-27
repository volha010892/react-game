import React from 'react';
import icon from '../../assets/img/icon.png';
import rsSchool from '../../assets/img/rs_school_js.svg';
import {FooterStyle} from './Styled/Footer';
export default function Footer() {
  return (
    <FooterStyle>
          2021
          <div onClick={()=>window.location ='https://github.com/volha010892'}>
            <img src={icon} alt="git hub logo"/>
          </div>
          <div onClick={()=>window.location ="https://rs.school/js/"}>
            <img src={rsSchool} alt="rsschool log" />
          </div>
     </FooterStyle>
  );
}
