import React, { useCallback } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import api from '../../utils/api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import auth from '../../utils/auth';

function App() {

  const [isLoading, setIsLoading] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegistrationOk, setIsRegistrationOk] = React.useState(false);


  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isLoggedIn, setIsLoggedIn] =React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const history = useHistory();
  const location = useLocation();

  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {      
      auth.tokenCheck({token})
        .then((data) => {
            setUserEmail(data.data.email);            
            setIsLoggedIn(true);
        })
        .catch(err => {
          console.log(err);
          localStorage.removeItem('token');
        })
    }
  }, [])

  React.useEffect(() => {
    tokenCheck()
  }, [tokenCheck])

  React.useEffect(()=>{
    if (isLoggedIn){
      history.push('/');
    }
  }, [isLoggedIn, history])

  React.useEffect(() => {
    api.getUserData()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err));
  }, [])

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups () {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardClick (card) {
    setSelectedCard(card)
  }

  function handleUpdateUser ({ name, about }) {
    setIsLoading(true);
    api.editUserData({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar ({ avatar }) {
    setIsLoading(true);
    api.editUserAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => console.log(err))
    }

    function handleCardDelete(card) {
        api.deleteMyCard(card)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id))
            })
            .catch(err => console.log(err))
    }

    React.useEffect(() => {
        api.getCards()
            .then(res => {
                setCards(res);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function handleAddPlaceSubmit ({ name, link }) {
      setIsLoading(true);
      api.addNewCard({ name, link})
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        })
    }

    function handleRegisterSubmit ({ password, email}) {
      auth.register({password, email})
            .then(() => {
              setIsInfoTooltipOpen(true);
              setIsRegistrationOk(true);
              history.push('/sign-in')    
            })
            .catch((err) => {
              console.log(err);
              setIsInfoTooltipOpen(true);
              setIsRegistrationOk(false); 
            })
    }

    function handleLoginSubmit ({ password, email}) {
      auth.login ({password, email})
        .then((res) => {
            setIsLoggedIn(true);
            setUserEmail(email);
            localStorage.setItem('token', res.token);
        })
        .catch((err) => {
          console.log(err);
          setIsInfoTooltipOpen(true);
          setIsRegistrationOk(false);
        })
    }

    function handleExit () {
      setIsLoggedIn(false);
      localStorage.removeItem('token');
    }


  return (
    
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header loggedIn={isLoggedIn} userEmail={userEmail} location={location} onExit={handleExit}/>
      <Switch>
        <ProtectedRoute exact path='/' loggedIn={isLoggedIn}>
        <Main onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards} />
          <Footer />
        </ProtectedRoute>
        <Route path='/sign-in'>
          <Login onLogin={handleLoginSubmit} isOpen={isInfoTooltipOpen} isRegistrationOk={isRegistrationOk} onClose={closeAllPopups}/>
        </Route>
        <Route path='/sign-up'>
          <Register isOpen={isInfoTooltipOpen} isRegistrationOk={isRegistrationOk} onRegister={handleRegisterSubmit} onClose={closeAllPopups}/>
        </Route>
      </Switch>
      
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpateAvatar={handleUpdateAvatar} isLoading={isLoading}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading}/>
      <PopupWithForm title={'Вы уверены?'} name={'confirm'} buttonText={'Да'}>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      
    </div>
    </CurrentUserContext.Provider>
    
  );
}

export default App;
