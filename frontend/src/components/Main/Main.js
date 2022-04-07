import React from 'react';
import Card from '../Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main (props) {

    // const [isHovered, setIsHovered] = React.useState(false);
    // function handleHover () {
    //     setIsHovered(!isHovered);
    // } 
    // не работает, onMouseOver не меняет state

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__main-info">
                    <div className="profile__avatar-container">
                        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" onClick={props.onEditAvatar}/>
                        <div className="profile__avatar-hover"></div>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__occupation">{currentUser.about}</p>
                        <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
                    </div>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.onAddPlace}></button>
            </section>
            <section className="cards" aria-label="Карточки мест">
                {props.cards.map((item) => (
                        <Card card={item} {...item} key={item._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>                
                    ))
                }
            </section>
        </main>
    );

}

export default Main;