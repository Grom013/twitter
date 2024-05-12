import React, { useEffect, useState } from "react";
import mail from "../../public/assets/mail";
import './RegModal.css'

function RegModal({ handleVisible, isVisibleReg }) {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [id]: value
        }));
        if (id === 'email' && !mail(value)) {
            setErrorMessage('Некорректный адрес электронной почты');
        }else {
            setErrorMessage('');
        }
    }
    const confirmChange = (e) => {
        setConfirmPassword(e.target.value)
        setErrorConfirmPassword('');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.email.length === 0) {
            setErrorMessage('Введите mail');
        }
        if (userData.password.length < 6) {
            setErrorPassword('неверный формат пароля');
        }        
        if (userData.password.length === 0) {
            setErrorPassword('Введите пароль');
        }        
        if (confirmPassword !== userData.password) {
            setErrorConfirmPassword('Пароли не совпадают');
            return; 
        }
        if (errorMessage || errorPassword || errorConfirmPassword) {
            return; 
        }
    
        try {
            const response = await fetch('https://twitter1-g0o3.onrender.com/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            const responseData = await response.json();
            console.log(responseData);
    
            if (response.ok) {
                console.log('Данные успешно отправлены на сервер');
                setUserData({
                    email:'',
                    password: ''
                });
                setErrorMessage('');
                setConfirmPassword('');
                handleVisible();
            } else {
                console.error('Ошибка при отправке данных на сервер');
                if (responseData.error === 'Пользователь с таким email уже существует') {
                    setErrorMessage('Пользователь с таким email уже существует');
                }
                if (password.length < 6) {
                    setErrorPassword('некорректный пароль');
                }
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    }
    
    
    return (
        <form className="regModal" id="regModal" style={{ display: isVisibleReg ? 'block' : 'none' }} onSubmit={handleSubmit}>
            <div className="modal-content">
                <div className="mobile-handler"></div>
                <div className="reg-modal-first-line">
                    <div>Регистрация</div>
                    <div className="close" onClick={handleVisible}>x</div>
                </div>
                <div className="block-input">
                    <input type="text" id="email" className="input-field" placeholder="" value={userData.email} onChange={handleChange}/>
                    <label htmlFor="email" className="input-label">Электронная почта</label>
                    {errorMessage&&<label htmlFor="email" style={{color: "red"}}>{errorMessage}</label>}
                </div>
                <div className="block-input">
                    <input type="password" id="password" className="input-field" placeholder="" value={userData.password}  onChange={handleChange} />
                    <label htmlFor="password" className="input-label">Пароль</label>
                    {errorPassword&&<label htmlFor="email" style={{color: "red"}}>{errorPassword}</label>}
                </div>
                <div className="block-input">
                    <input type="password" id="confirmPassword" className="input-field" placeholder="" value={confirmPassword}  onChange={confirmChange}/>
                    <label htmlFor="confirm-password" className="input-label">Подтверждение пароля</label>
                    {errorConfirmPassword&&<label htmlFor="email" style={{color: "red"}}>{errorConfirmPassword}</label>}
                </div>
                <button type="submit" className="submit-btn">Зарегистрироваться</button>
            </div>
        </form>
    )
}

export default RegModal;