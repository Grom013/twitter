import React, { useState } from 'react';
import './Header.css';
import RegModal from '../RegModal/RegModal';

function Header() {
      const [isVisible, setIsVisible] = useState(false)
      const handleVisible = () => {
            setIsVisible(prevVisible => !prevVisible)
      }
  return (
        <div className="container">
            <RegModal handleVisible={handleVisible} isVisible={isVisible}/>
              <div className="header">
                    <img src="img/Vector.svg" alt="" />
                    <div className="header_logo" />
                    <div className="header_text">
                          Оставайся на связи с друзьями, даже когда их нет рядом
                    </div>
                    <button className="btn-reg" onClick={handleVisible}>Зарегистрироваться</button>
                    <button className="btn-login">Войти</button>
              </div>
              <div className="header-img" />
        </div>
  );
}

export default Header;