import { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ isVisibleLogin, handleVisibleLogin }) => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          });
      
          if (response.ok) {
            const responseData = await response.json();
            console.log('Успешная аутентификация:', responseData);
      
            document.cookie = `token=${responseData.token}; path=/`;
            document.cookie = `email=${responseData.email}; path=/`;

            if(responseData.token){
              window.location.href = '/feed'
            }
          } else {
            const errorData = await response.json();
            console.error('Ошибка аутентификации:', errorData.error);
          }
        } catch (error) {
          console.error('Произошла ошибка при выполнении запроса:', error);
        }
      };
      
      

    return (
        <form className="loginModal" id="loginModal" onSubmit={handleSubmit} style={{ display: isVisibleLogin ? 'block' : 'none' }}>
            <div className="modal-content">
                <div className="mobile-handler"></div>
                <div className="reg-modal-first-line">
                    <div>Регистрация</div>
                    <div className="close" onClick={handleVisibleLogin}>x</div>
                </div>
                <div className="block-input">
                    <input type="text" id="loginEmail" name='email' className="input-field" placeholder="" value={userData.email} onChange={handleChange} />
                    <label htmlFor="loginEmail" className="input-label">Электронная почта</label>
                </div>
                <div className="block-input">
                    <input type="password" id="loginPassword" name='password' className="input-field" placeholder="" value={userData.password} onChange={handleChange} />
                    <label htmlFor="loginPassword" className="input-label">Пароль</label>
                </div>
                <button type="submit" className="submit-btn">Войти</button>
            </div>
        </form>
    );
}

export default LoginModal;
