import 'react-medium-image-zoom/dist/styles.css';
import './Item.scss';
import { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import { ItemTypeElem } from '../../types';

const Item = ({
  data,
  itemRef,
  type,
}: {
  data: ItemTypeElem;
  itemRef: any;
  type: boolean;
}) => {
  const [shipData, setShipData] = useState(data);
  const [descriptionState, setDescriptionState] = useState<boolean>(true);

  const handleDescriptionOpener = () => {
    setDescriptionState(!descriptionState);
  };

  return (
    <div className={`item ${type ? 'item--tablet' : ''}`} ref={itemRef}>
      {shipData?.icons ? (
        <ul className="item__list-images">
          {shipData?.icons?.large ? (
            <Zoom>
              <img src={shipData?.icons.large} width="300" height="200" />
            </Zoom>
          ) : shipData?.icons?.medium ? (
            <Zoom>
              <img src={shipData?.icons.medium} width="300" height="100" />
            </Zoom>
          ) : null}
        </ul>
      ) : null}
      <div className="item__info">
        <ul className="item__list-char">
          <li className="item__item-char">
            <p className="item__elem-title item__elem-title--name">Название:</p>
            <p className="item__name">{shipData?.title}</p>
          </li>
          <li className="item__item-char">
            <p className="item__elem-title item__elem-title--level">Уровень:</p>
            <p className="item__level">{shipData?.level}</p>
          </li>
          <li className="item__item-char">
            <p className="item__elem-title item__elem-title--type">Тип:</p>
            <p className="item__type">{shipData?.type?.title}</p>
          </li>
          <li className="item__item-char">
            <p className="item__elem-title item__elem-title--nation">Нация:</p>
            <p className="item__nation">{shipData?.nation?.title}</p>
            <img
              src={shipData?.nation?.icons?.large}
              width="50"
              height="50"
              className="item__nation-icon"
            />
          </li>
        </ul>
        <div className="item__description">
          <p className="item__elem-title item__elem-title--description">
            Описание:
            <button
              type="button"
              className="item__description-opener"
              onClick={handleDescriptionOpener}
            >
              {descriptionState ? 'Развернуть' : 'Скрыть'}
            </button>
          </p>
          <p
            className={`item__description-text ${
              descriptionState ? 'item__description-text--hide' : null
            }`}
          >
            {shipData?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Item;
