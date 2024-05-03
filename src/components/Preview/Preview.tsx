import './Preview.scss';

const Preview = ({ setPreviewState }: any) => {
  return (
    <div className="preview">
      <div className="preview__wrapper">
        <p className="preview__hello">Привет!</p>
        <p className="preview__name">Это тестовый проект</p>
        <p className="preview__name">Автор - Новик Матвей</p>
        <a
          href="http://t.me/lockdur"
          className="preview__link-tg"
          target="_blank"
        >
          Ссылка на tg
        </a>
        <a
          href="https://github.com/MattNovik"
          className="preview__link-gh"
          target="_blank"
        >
          Ссылка на github
        </a>
        <p className="preview__info">Основные моменты: </p>
        <ul className="preview__list-info">
          <li className="preview__item-info">
            1. Проект собран на Vite/React/SCSS/TS/MUI
          </li>
          <li className="preview__item-info">
            2. Функционал - отрисовка списка кораблей + фильтрация
          </li>
          <li className="preview__item-info">
            3. Отсутствие информации по API вынуждает грузить весь список
            кораблей сразу и только далее работать с ним В рейльном мире - не
            самый хороший способ, фильтрацию лучше перекладывать на сторону бэка
          </li>
          <li className="preview__item-info">
            4. Для селекторов использовал MUI + немного стилизации и конфигов.
            Для скорости и удобства
          </li>
          <li className="preview__item-info">
            5. Время затраченное на проект - 5-6 часов
          </li>
        </ul>
        <button
          type="button"
          onClick={() => setPreviewState(false)}
          className="preview__button-next"
        >
          К проекту
        </button>
      </div>
    </div>
  );
};

export default Preview;
