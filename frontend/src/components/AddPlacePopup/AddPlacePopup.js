import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup ({ isOpen, onClose, onAddPlace, isLoading}) {
    const inputNameRef = React.useRef('');
    const inputLinkRef = React.useRef('');

    function handleSubmit (event) {
        event.preventDefault();
        onAddPlace({
            name: inputNameRef.current.value,
            link: inputLinkRef.current.value
        })
    }
React.useEffect(() => {
    inputLinkRef.current.value = '';
    inputNameRef.current.value = '';
}, [isOpen])
    return (
        <PopupWithForm title='Новое место' name='add' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} 
        buttonText='Сохранить' isLoading={isLoading}>
            <input className="form__input form__input_add form__input_type_title" type="text" 
            placeholder="Название" name="name" id="title-input" required minLength="2" maxLength="30"
            ref={inputNameRef}/>
            <span className="form__error form__error_type_add title-input-error"></span>
            <input className="form__input form__input_add form__input_type_link" type="url" 
            placeholder="Ссылка на картинку" name="link" id="link-input" required
            ref={inputLinkRef}/>
            <span className="form__error form__error_type_add link-input-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;