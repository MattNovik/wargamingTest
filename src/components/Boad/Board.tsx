import './Board.scss';
import { useEffect, useState } from 'react';
import Item from '../Item/Item';

const Board = (data: any) => {
  const [shipsList, setShipsList] = useState<any>(data?.data);

  useEffect(() => {
    if (data && data.length) {
      setShipsList(data);
    }
    console.log(data);
  }, [data]);

  return (
    <div className="board">
      {shipsList && shipsList.length
        ? shipsList.map((item: any) => {
            return <Item data={item} />;
          })
        : null}
    </div>
  );
};

export default Board;
