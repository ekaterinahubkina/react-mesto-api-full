import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Header ({loggedIn, userEmail, location, onExit}) {

    const [isMobileAuthOpen, setIsMobileAuthOpen] = React.useState(false);

    function openMobileAuth () {
        setIsMobileAuthOpen(true);
    }

    function closeMobileAuth () {
        setIsMobileAuthOpen(false);
    }

    let button = {text: '', link: ''};
    button = headerButtonText();    

        function headerButtonText () {
            switch (location.pathname) {
                case '/': 
                button.text = 'Выйти';
                button.link = '/sign-in';
                return button;

                case '/sign-in': 
                button.text = 'Регистрация';
                button.link = '/sign-up';
                return button;

                case '/sign-up': 
                button.text = 'Войти';
                button.link = '/sign-in';
                return button;

                default:
                button.text = '';
                button.link = '';
                return
             
            }
        }

    const userEmailText = loggedIn ? userEmail : '';

    function exit() {
       loggedIn && onExit();
    } 
    


    return (
        <>
        {(location.pathname === '/' && isMobileAuthOpen) && 
            <div className="header__auth header__auth_mobile">
                <p className="header__email">{userEmailText}</p>
                <Link to={button.link} className="header__button header__button_mobile" onClick={ exit }>{button.text}</Link>
            </div>}
        
        <header className="header">
            <a className="logo" href="#">
                <img className="logo__image" src={logo} alt="Логотип"/>
            </a>
            {location.pathname === '/' &&
            <>
                <button className={`${isMobileAuthOpen ? "burger-menu__close-btn" : "burger-menu__close-btn_hidden"}`} onClick={closeMobileAuth}>
                </button>
                <div className={`burger-menu ${isMobileAuthOpen && "burger-menu_hidden"}`} onClick={openMobileAuth}>
                    <span className="burger-menu__line"></span>
                    <span className="burger-menu__line"></span>
                    <span className="burger-menu__line"></span>
                </div>
            </>}

            <div className={`header__auth ${location.pathname === '/' && "header__auth_hidden"}`} >
                <p className="header__email">{userEmailText}</p>
                <Link to={button.link} className="header__button" onClick={ exit }>{button.text}</Link>
            </div>
        </header>
        </>
    );
}

export default Header;