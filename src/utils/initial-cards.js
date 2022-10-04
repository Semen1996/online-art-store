const birth = new URL('../image/The_Birth_of_Venus.png', import.meta.url);
const lastSupper = new URL('../image/The_Last_Supper.png', import.meta.url);
const adam = new URL('../image/The_Creation_of_Adam.png', import.meta.url);
const anatomy = new URL('../image/The_Anatomy_Lesson.png', import.meta.url);

const initialCards = [
    {
      name: '«Рождение Венеры» Сандро Боттичелли',
      link: birth,
      oldPrice: '2 000 000 $',
      currentPrice: '1 000 000 $',
      status: 'sale',
      description: 'Картина итальянского художника тосканской школы Сандро Боттичелли. Представляет собой живопись темперой.'
    },
    {
      name: '«Тайная вечеря» Леонардо да Винчи',
      link: lastSupper,
      oldPrice: '',
      currentPrice: '3 000 000 $',
      status: 'inCart',
      description: 'Фреска, работа Леонардо да Винчи, изображающая сцену последней трапезы Христа со своими учениками. Создана в 1495—1498 годы в доминиканском монастыре Санта-Мария-делле-Грацие в Милане.'
    },
    {
      name: '«Сотворение Адама» Микеланджело',
      link: adam,
      oldPrice: '6 000 000 $',
      currentPrice: '5 000 000 $',
      status: 'sale',
      description: 'Фреска Микеланджело, написанная около 1511 года.'
    },
    {
      name: '«Урок анатомии» Рембрандт',
      link: anatomy,
      oldPrice: '',
      currentPrice: 'Продана на аукционе',
      status: 'sold',
      description: 'Картина Рембрандта, написанная в 1632 году.'
    }
  ];

  export default initialCards;