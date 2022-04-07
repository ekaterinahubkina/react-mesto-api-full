import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React from "react";

function Card ({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `card__delete-button ${!isOwn && 'card__delete-button_hidden'}`
    );

    const isLiked = card.likes.some(like => like._id === currentUser._id);

    const cardLikeButtonClassName = (
        `card__like-button ${isLiked && 'card__like-button_active'}`

    );

    function handleClick () {
        onCardClick(card);
    }

    function handleLikeClick () {
        onCardLike(card);
    }

    function handleDeleteClick () {
        onCardDelete(card);
    }

    return (
        <article className="card">
            <img className="card__image" alt={card.name} src={card.link} onClick={handleClick}/>
            <h2 className="card__title">{card.name}</h2>
            <div className="card__likes-wrapper">
                <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Нравится"></button>
                <div className="card__likes-number">{card.likes.length}</div>
            </div>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" aria-label="Удалить"></button>
        </article>
    );
}

export default Card;