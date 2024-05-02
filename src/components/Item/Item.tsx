import { useEffect, useState } from 'react';
import './Item.scss';

const Item = (data: any) => {
  const [shipData, setShipData] = useState(data?.data);
  const [descriptionState, setDescriptionState] = useState<boolean>(true);

  const handleDescriptionOpener = () => {
    setDescriptionState(false);
  };

  return (
    <div className="item">
      {shipData.icons ? (
        <ul className="item__list-images">
          {shipData.icons?.large ? (
            <img src={shipData.icons.large} width="200" height="200" />
          ) : null}
          {shipData.icons?.medium ? (
            <img src={shipData.icons.medium} width="100" height="100" />
          ) : null}
        </ul>
      ) : null}
      <ul className="item__list-char">
        <li className="item__item-char">
          <p className="item__elem-title item__elem-title--name">Название:</p>
          <p className="item__name">{shipData.title}</p>
        </li>
        <li className="item__item-char">
          <p className="item__elem-title item__elem-title--level">Уровень:</p>
          <p className="item__level">{shipData.level}</p>
        </li>
        <li className="item__item-char">
          <p className="item__elem-title item__elem-title--type">Тип:</p>
          <p className="item__type">{shipData.type.title}</p>
        </li>
        <li className="item__item-char">
          <p className="item__elem-title item__elem-title--nation">Нация:</p>
          <p className="item__nation">{shipData.nation.title}</p>
          <img
            src={shipData.nation.icons.large}
            width="50"
            height="50"
            className="item__nation-icon"
          />
        </li>
        <li className="item__item-char item__item-char--description">
          <p className="item__elem-title item__elem-title--description">
            Описание:
            {descriptionState ? (
              <button
                type="button"
                className="item__description-opener"
                onClick={handleDescriptionOpener}
              >
                Развернуть
              </button>
            ) : null}
          </p>
          <p
            className={`item__description ${
              descriptionState ? 'item__description--hide' : null
            }`}
          >
            {shipData.description}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Item;
