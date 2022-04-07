import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup ({ isOpen, onClose, onUpdateUser, isLoading }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen])

    function handleNameChange (event) {
        setName(event.target.value);
    }

    function handleDescriptionChange (event) {
        setDescription(event.target.value);
    }

    function handleSubmit (event) {
        event.preventDefault();

        onUpdateUser({
            name,
            about: description,
        })

    }

    return (

    <PopupWithForm title='Редактировать профиль' name='edit' isOpen={isOpen} onClose={onClose} buttonText='Сохранить' 
    onSubmit={handleSubmit} isLoading={isLoading}>
        <input className="form__input form__input_edit form__input_type_name" onChange={handleNameChange} type="text" name="name" id="name-input" required minLength="2" maxLength="40" value={name || ''}/>
        <span className="form__error form__error_type_edit name-input-error"></span>
        <input className="form__input form__input_edit form__input_type_occupation" onChange={handleDescriptionChange} type="text" name="occupation" id="occupation-input" required minLength="2" maxLength="200" value={description || ''}/>
        <span className="form__error form__error_type_edit occupation-input-error"></span>
    </PopupWithForm>
    );
}

export default EditProfilePopup;