import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React from "react";

function EditAvatarPopup ({ isOpen, onClose, onUpateAvatar, isLoading }) {
  const inputRef = React.createRef('');

  React.useEffect(() => {
    inputRef.current.value = '';
  }, [inputRef, isOpen])


  function handleSubmit (event) {
    event.preventDefault();

    onUpateAvatar({
      avatar: inputRef.current.value,
    })
  }

    return (
        <PopupWithForm title='Обновить автар' name='avatar' isOpen={isOpen} onClose={onClose} 
        buttonText='Сохранить' onSubmit={handleSubmit} isLoading={isLoading}>
        <input ref={inputRef} className="form__input form__input_add form__input_type_link" type="url" 
        placeholder="Ссылка на аватар" name="link" id="avatar-link-input" required/>
        <span className="form__error form__error_type_avatar avatar-link-input-error"></span>
      </PopupWithForm>
    );
}

export default EditAvatarPopup;