import React, { useState } from 'react';
import './Header.css';
import RegModal from '../RegModal/RegModal';
import LoginModal from '../LoginModal/LoginModal';

function Header() {
      const [isVisibleReg , setIsVisibleReg] = useState(false)
      const [isVisibleLogin , setIsVisibleLogin] = useState(false)
      const handleVisible = () => {
            setIsVisibleReg(prevVisible => !prevVisible)
      }
      const handleVisibleLogin = () => {
            setIsVisibleLogin(prevVisible => !prevVisible)
      }
      
  return (
        <div className="container">
            <RegModal handleVisible={handleVisible} isVisibleReg={isVisibleReg}/>
            <LoginModal handleVisibleLogin={handleVisibleLogin} isVisibleLogin={isVisibleLogin}/>
              <div className="header">
                    <img src="img/Vector.svg" alt="" />
                    <div className="header_logo" />
                    <div className="header_text">
                          Оставайся на связи с друзьями, даже когда их нет рядом
                    </div>
                    <button className="btn-reg" onClick={handleVisible}>Зарегистрироваться</button>
                    <button className="btn-login" onClick={handleVisibleLogin}>Войти</button>
              </div>
              <div className="header-img" />
        </div>
  );
}

export default Header;