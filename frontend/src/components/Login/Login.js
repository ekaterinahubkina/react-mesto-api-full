import React from "react";
import InfoTooltip from "../InfoTooltip/InfoTooltip";


function Login ({ onLogin, isOpen, onClose, isRegistrationOk }) {

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
        onLogin({ password, email });
        setEmail('');
        setPassword('');     
    }

    return (
        <>
            <div className="form__container">
                <h2 className="form__title">Вход</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="email" name="email" className="form__input form__input_type_register" 
                    placeholder="Email" value={email || ""} onChange={handleEmailChange}></input>
                    <span className="form__error"></span>
                    <input type="password" name="password" className="form__input form__input_type_register" 
                    placeholder="Пароль" value={password || ""} onChange={handlePasswordChange}></input>
                    <span className="form__error"></span>
                    <button className="form__button form__button_type_register">Войти</button>
                </form>
            </div>
        <InfoTooltip isOpen={isOpenInfotool} onClose={onClose} isRegistrationOk={isRegistrationOk}/>
        </>
    );
}

export default Login;