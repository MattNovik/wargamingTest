/// <reference types="vite-plugin-svgr/client" />

import './Board.scss';
import { useEffect, useState } from 'react';
import Item from '../Item/Item';
import ShipLoader from '../../assets/img/ship_loader.gif';
import TabletIcon from '../../assets/img/table.svg?react';
import RowsIcon from '../../assets/img/rows.svg?react';
import { ItemTypeElem } from '../../types';

const Board = ({
  data,
  loadingState,
  itemRef,
}: {
  data: ItemTypeElem[] | null;
  loadingState: boolean;
  itemRef: any;
}) => {
  const [shipsList, setShipsList] = useState<ItemTypeElem[] | null>(null);
  const [boardType, setBoardType] = useState<boolean>(false);

  const handleChangeBoardType = (type: string) => {
    if (type === 'tablet') {
      setBoardType(true);
      return;
    }
    setBoardType(false);
  };

  useEffect(() => {
    if (data) {
      setShipsList(data);
    }
  }, [data]);

  return (
    <div className="board">
      {loadingState ? (
        <div className="board__loader-wrapper">
          <img src={ShipLoader} width="50" height="50" alt="loader" />
        </div>
      ) : null}
      {shipsList ? (
        shipsList.length ? (
          <>
            <div className="board__visual-change">
              <button
                type="button"
                className={`board__button-change ${
                  boardType ? 'board__button-change--active' : ''
                }`}
                onClick={() => handleChangeBoardType('tablet')}
              >
                <TabletIcon />
              </button>
              <button
                type="button"
                className={`board__button-change ${
                  !boardType ? 'board__button-change--active' : ''
                }`}
                onClick={() => handleChangeBoardType('rows')}
              >
                <RowsIcon />
              </button>
            </div>
            <div
              className={`board__wrapper ${
                boardType ? 'board__wrapper--tablet' : ''
              }`}
            >
              {shipsList.map((item: ItemTypeElem, index: number) => (
                <Item
                  data={item}
                  itemRef={itemRef}
                  key={index + item.title}
                  type={boardType}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="board__no-data">
            По вашему запросу ничего не найдено! <br /> Попробуйте изменить ваш
            запрос
          </div>
        )
      ) : null}
    </div>
  );
};

export default Board;
