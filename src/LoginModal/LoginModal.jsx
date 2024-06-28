import { useState } from 'react';
import './LoginModal.css'
const LoginModal = ({isVisibleLogin, handleVisibleLogin}) => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevUserData => ({
          ...prevUserData,
          [name]: value
        }));
      };
      

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData);
        try {
            const response = await fetch('https://twitter1-g0o3.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    }
    
    return ( 
        <form className="loginModal" id="loginModal"  onSubmit={handleSubmit} style={{ display: isVisibleLogin ? 'block' : 'none' }} >
            <div className="modal-content">
                <div className="mobile-handler"></div>
                <div className="reg-modal-first-line">
                    <div>Регистрация</div>
                    <div className="close" onClick={handleVisibleLogin}>x</div>
                </div>
                <div className="block-input">
                    <input type="text" id="loginEmail" name='email' className="input-field" placeholder="" value={userData.email} onChange={handleChange}/>
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