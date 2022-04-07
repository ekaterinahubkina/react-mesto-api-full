function ImagePopup ({card, onClose}) {
    return (
        <article className={`popup popup_type_picture ${card.name && card.link ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_picture">
                <button className="popup__close-button popup__close-button_type_pic" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <figure className="popup__figure">
                    <img className='popup__image' src={card.link} alt={card.name}/>
                    <figcaption className="popup__figcaption">{card.name}</figcaption>
                </figure>
            </div>
        </article>
    );
}

export default ImagePopup;