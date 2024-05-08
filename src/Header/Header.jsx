import React from 'react';
import './Header.css';

function Header() {
  return (
        <div className="container">
              <div className="header">
                    <img src="img/Vector.svg" alt="" />
                    <div className="header_logo" />
                    <div className="header_text">
                          Оставайся на связи с друзьями, даже когда их нет рядом
                    </div>
                    <button className="btn-reg">Зарегистрироваться</button>
                    <button className="btn-login">Войти</button>
              </div>
              <div className="header-img" />
        </div>
  );
}

export default Header;