function PopupWithForm ({title, name, isOpen, onClose, buttonText, onSubmit, isLoading, children}) {
    const isLoadingText = ( isLoading? 'Сохранение...' : buttonText )

    return (
        <article className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}  >
            <div className={`popup__container popup__container_type_${name}`}>
                <button className={`popup__close-button popup__close-button_type_${name}`} type="button" aria-label="Закрыть" onClick={onClose}></button>
                <h3 className="popup__title">{title}</h3>
                <form className={`form form_type_${name}`} name={`${name}`} onSubmit={onSubmit} noValidate>
                    {children}
                    <button className="form__button" type="submit">{isLoadingText}</button>
                </form>
            </div>
        </article>
    );
}

export default PopupWithForm;