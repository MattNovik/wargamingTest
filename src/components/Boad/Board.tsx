import './Board.scss';
import { useEffect, useState } from 'react';
import Item from '../Item/Item';
import ShipLoader from '../../assets/img/ship_loader.gif';

const Board = ({
  data,
  loadingState,
  itemRef,
}: {
  data: any;
  loadingState: boolean;
  itemRef: any;
}) => {
  const [shipsList, setShipsList] = useState<any>(null);

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
          shipsList.map((item: any, index: number) => (
            <Item data={item} itemRef={itemRef} key={index + item.title} />
          ))
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
