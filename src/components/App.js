import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import PopupConfirmation from './PopupConfirmation';
import {api} from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';

function App() {  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen || isConfirmPopupOpen;
  const [imageLink, setImageLink] = React.useState('');
  const [imageTitle, setImageTitle] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(()=>{
    Promise.all([
      api.getUserInfo(),  // запрос информации о профиле
      api.getInitialCards()  // загрузка изначальных карточек
    ])
      .then(([info, initialCards])=>{
        setCurrentUser(info);
        setCards(initialCards);
      }).catch(err => console.log(err))
  }, [])

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleImageClick() {
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
  }  

  function handleImageClick(link, name) {
    setImageLink(link);
    setImageTitle(name);
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function handleUpdateUser({name, about}) {
    const data = {name: name, job: about};
    api.refreshUserInfo(data)
    .then((result) => {setCurrentUser(result);closeAllPopups();})
    .catch(err => console.log(err));
  }

  function handlePostNewCard(data) {
    api
    .postNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
    .refreshAvatar(data)
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    if (card.likes.some(i => i._id === currentUser._id)) {
      api
      .deleteLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
    } else {
      api
      .putLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
    };
  }

  function handleDeleteCard(card) {
    api
    .deleteCard(card._id)
    .then((newCard) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <div className="App">
          <div className="content">
            <Header />
            <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            imageWatch={handleImageClick}
            changeCards={setCards}
            onCardLike={handleCardLike}
            onDeleteCard={handleDeleteCard} />
            <Footer />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onPostNewCard={handlePostNewCard} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} imageInfo={{link: imageLink, title: imageTitle}} />
            <PopupConfirmation isOpen={isConfirmPopupOpen} onClose={closeAllPopups} />
          </div>
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;