import './index.css';
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';
import initialCards from '../utils/initial-cards.js';

const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');

const searchForm = document.forms.search;
const input = searchForm.input;

const disableSelector = 'card__btn_type_disable';
const btnCartSelector = 'card__btn_type_cart';

// Функция для запуска таймера на 2 сек
function handleprocessing(button) {
  setTimeout(()=>{
    button.removeAttribute("disabled");
    button.classList.remove(disableSelector);

    if(button.classList.contains(btnCartSelector)) {
      button.textContent = 'Купить';
      button.classList.remove(btnCartSelector);
    } else {
      button.textContent = 'В корзине';
      button.classList.add(btnCartSelector);
    }
  }, 2e+3);
}

// При нажатие на кнопку купить или в корзине
function handleButton(e) {
  const button = e.target;

  button.setAttribute("disabled", "disabled");
  button.textContent = 'Обработка...';
  button.classList.add(disableSelector);

  handleprocessing(button);
}

// Функция для закрытия попапа с помощью кнопки esc
function escapeClose(evt) {
  if (evt.key==='Escape') {
    closePopup();
  }
}

// Функция для закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeClose);
}

// Функция для открытия попапа
function openPopup(name, link, oldPrice, currentPrice, description) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeClose);

  popup.querySelector('.popup__title').textContent = name;
  popup.querySelector('.popup__img').src = link;
  popup.querySelector('.popup__old-price').textContent = oldPrice;
  popup.querySelector('.popup__current-price').textContent = currentPrice;
  popup.querySelector('.popup__text').textContent = description;
}

// Функция для добавления карточки
function addCard(name, link, oldPrice, currentPrice, status, description) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const button = card.querySelector('.card__btn');
  const picture = card.querySelector('.card__img');
  const title = card.querySelector('.card__title');

  picture.src = link;
  title.textContent = name;
  card.querySelector('.card__old-price').textContent = oldPrice;
  card.querySelector('.card__current-price').textContent = currentPrice;

  if(status === 'inCart') {
    button.classList.add(btnCartSelector);
    button.textContent = 'В корзине';
  } else if(status === 'sold') {
    button.classList.add('card__btn_type_disactive');
    card.classList.add('card_disactive');
  }

  // Навешиваем слушателей
  button.addEventListener('click', handleButton);
  picture.addEventListener('click', () => {
    openPopup(name, link, oldPrice, currentPrice, description);
  });
  title.addEventListener('click', () => {
    openPopup(name, link, oldPrice, currentPrice, description);
  });

  return card;
}

// Вставляем новую карточку  
function insertCard(name, link, oldPrice, currentPrice, status, description) {
  const card = addCard(name, link, oldPrice, currentPrice, status, description);
  cards.append(card);
}

// Вставляем начальные карточки
initialCards.forEach(item => {
  insertCard(item.name, item.link, item.oldPrice, item.currentPrice, item.status, item.description);
});

// Ищем карточки при нажатии на кнопку поиск
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const allCards = cards.querySelectorAll('.card');

  allCards.forEach(item => {
    if( item.querySelector('.card__title').textContent.indexOf(input.value) === -1 ) {
      item.style.display = 'none';
    } else {
      item.style.display = 'block';
    }
  });
})

// Возвращаем все карточки, если в инпуте пусто
input.addEventListener('change', (e) => {
  if(e.target.value === '') {
    const allCards = cards.querySelectorAll('.card');
    allCards.forEach(item => item.style.display = 'block');
  }
});

// Настраиваем слайдер в попапе
new Swiper('.images-slider', {
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true
  },
  mousewheel: {
    sensitivity: 1,
  },
  slidesPerView: 1.5,
  direction: 'vertical',
  virtual: {
    slides: (function() {
      let slide =[];
      for (let i = 0; i < 4; i++) {
        console.log(initialCards[i].link);
        slide.push(`<img class="images-slider__image swiper-slide" src=${initialCards[i].link}>`);
      }
      return slide;
    }()),
  },
});

//Навешиваем слушателей для закрытия попапа
closeButton.addEventListener('click', () => {
  closePopup();
});

popup.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }
});