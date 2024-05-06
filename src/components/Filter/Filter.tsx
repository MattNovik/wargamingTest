import { useState } from 'react';
import CustomSelectMui from '../CustomSelectMui/CustomSelectMui';
import ShipLoader from '../../assets/img/ship_loader.gif';
import './Filter.scss';
import { FilterObject } from '../../types';

const Filter = ({
  loadingState,
  filterList,
  allShipCount,
  setFilterList,
}: {
  allShipCount: number;
  loadingState: boolean;
  filterList: FilterObject | null;
  setFilterList: any;
}) => {
  const [openState, setOpenState] = useState<boolean>(true);

  const handleButtonOpener = () => {
    setOpenState(!openState);
  };
  return (
    <div className="filter">
      {loadingState ? (
        <div className="filter__loader-wrapper">
          <img src={ShipLoader} width="50" height="50" alt="loader" />
        </div>
      ) : (
        <div className="filter__list">
          <div className="filter__head">
            <p className="filter__title">Фильтры</p>
            <p className="filter__counts">
              {allShipCount ? `Найдено - ${allShipCount}` : 'Не найдено'}
            </p>
            <button
              type="button"
              className="filter__button-opener"
              onClick={handleButtonOpener}
            >
              {openState ? 'Скрыть' : 'Раскрыть'}
            </button>
          </div>
          <div
            className={`filter__body ${
              openState ? 'filter__body--opened' : ''
            }`}
          >
            {filterList && filterList.level ? (
              <CustomSelectMui
                data={filterList?.level}
                title={'Уровни'}
                type={'level'}
                id={'level-select'}
                filterList={filterList}
                setFilterList={setFilterList}
              />
            ) : null}
            {filterList && filterList.type ? (
              <CustomSelectMui
                data={filterList?.type}
                title={'Тип'}
                type={'type'}
                id={'type-select'}
                filterList={filterList}
                setFilterList={setFilterList}
              />
            ) : null}
            {filterList && filterList.nation ? (
              <CustomSelectMui
                data={filterList?.nation}
                title={'Нация'}
                type={'nation'}
                id={'nation-select'}
                filterList={filterList}
                setFilterList={setFilterList}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
