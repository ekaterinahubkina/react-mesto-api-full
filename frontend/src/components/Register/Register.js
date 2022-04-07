import React from "react";
import { Link } from 'react-router-dom';
import InfoTooltip from "../InfoTooltip/InfoTooltip";


function Register ({ isOpen, onRegister, onClose, isRegistrationOk }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const isOpenInfotool = isOpen;

    function handleEmailChange (event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange (event) {
        setPassword(event.target.value);
    }

    function handleSubmit (event) {
        event.preventDefault();
        onRegister({ email, password })
    }

    return (
        <>
            <div className="form__container">
                <h2 className="form__title">Регистрация</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input id="email-input" name="email" type="email" className="form__input form__input_type_register" placeholder="Email" 
                    value={email || ""} onChange={handleEmailChange} required></input>
                    <span className="form__error"></span>
                    <input id="password-input" name="password" type="password" className="form__input form__input_type_register" placeholder="Пароль" 
                    value={password || ""} onChange={handlePasswordChange} required></input>
                    <span className="form__error"></span>
                    <button className="form__button form__button_type_register">Зарегистрироваться</button>
                </form>
                <span className="form__sign-in">Уже зарегистрированы? <Link className="form__link" to="/sign-in">Войти</Link></span>
            </div>
            <InfoTooltip isOpen={isOpenInfotool} onClose={onClose} isRegistrationOk={isRegistrationOk}/>
        </>
    );
}

export default Register;