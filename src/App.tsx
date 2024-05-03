import { useEffect, useState, useCallback, useRef } from 'react';
import './scss/index.scss';
import Board from './components/Boad/Board';
import api from './api/api';
import Filter from './components/Filter/Filter';
import { toast } from 'react-toastify';

const QUERY_STRING = `query Vehicles($languageCode: String = "ru") {
  vehicles(lang: $languageCode) {
    title
    description
    icons {
      large
      medium
    }
    level
    type {
      name
      title
      icons {
        default
      }
    }
    nation {
      name
      title
      color
      icons {
        small
        medium
        large
      }
    }
  }
}
 `;

const App = () => {
  const [allShipsList, setAllShipsList] = useState<any>(null);
  const [filteredAllShipsList, setFilteredShipsList] = useState<any>(null);
  const [shipstList, setShipsList] = useState<any>(null);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [limitLoadingItems, setLimitLoadingItems] = useState<number>(20);
  const [offsetLoadingItems, setOffsetLoadingItems] =
    useState<number>(limitLoadingItems);
  const [filterList, setFilterList] = useState<any>(null);
  const [allShipCounts, setAllShipCounts] = useState<number>(0);

  const observer = useRef<HTMLDivElement | null>();

  const [scroll, setScroll] = useState(0);
  const onScroll = useCallback(
    () => setScroll(Math.round(window.scrollY)),
    [window.scrollY]
  );

  // Описание бесконечного скролла. Цепляется за последний элемент списка
  // При попадании в поле видимости, подгружает новые элементы
  const lastItemRef = useCallback(
    (node: any) => {
      if (observer?.current) {
        observer?.current?.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (
            filteredAllShipsList &&
            filteredAllShipsList.length === shipstList.length
          ) {
            return;
          }
          let loadingData = filteredAllShipsList.slice(
            offsetLoadingItems,
            offsetLoadingItems + limitLoadingItems
          );
          setOffsetLoadingItems(offsetLoadingItems + limitLoadingItems);
          setLoadingState(true);
          if (loadingData && loadingData.length) {
            console.log('loading');
            setShipsList((prevItems: any) => [...prevItems, ...loadingData]);
            setLoadingState(false);
          } else {
            toast.error('Ошибка загрузки!', {
              position: 'bottom-right',
            });
          }
          console.log('after');

          // Когда последний элемент появляется в поле зрения, загружаем новые данные
          // и добавляем их к 'items'. Конкретный массив newItems предлагается модифицировать в соответствии с вашими данными.
          /* setAuctionList((prevItems) => [...prevItems, ...newItems]); */
        }
      });
      if (node) observer?.current.observe(node); // Запуск наблюдения за последним элементом
    },
    [filteredAllShipsList, offsetLoadingItems]
  );

  const generateFilters = (data: any) => {
    let filterData: any = {
      level: [],
      type: [],
      nation: [],
    };

    data.map((item: any, index: number) => {
      if (!filterData.level.some((elem: any) => elem?.title === item?.level)) {
        filterData.level.push({ title: item?.level, checked: false });
      }
      if (
        !filterData.type.some((elem: any) => elem?.title === item?.type?.name)
      ) {
        filterData.type.push({
          title: item?.type?.name,
          ruName: item?.type?.title,
          checked: false,
        });
      }
      if (
        !filterData.nation.some(
          (elem: any) => elem?.title === item?.nation?.name
        )
      ) {
        filterData.nation.push({
          title: item?.nation?.name,
          ruName: item?.nation?.title,
          checked: false,
        });
      }
    });
    filterData.level.sort((a: any, b: any) => a.title - b.title);
    setFilterList({ ...filterData });
  };

  const updateListShips = (data: any) => {
    setFilteredShipsList(data);
    setAllShipCounts(data.length);
    let loadingData = data.slice(0, limitLoadingItems);
    setOffsetLoadingItems(limitLoadingItems);
    setLoadingState(true);
    if (loadingData) {
      setShipsList(loadingData);
      setLoadingState(false);
    }
  };

  const filterItems = () => {
    let filteredList = [...allShipsList];
    let generatedList: any = [];
    let isFiltered = false;
    Object.entries(filterList).forEach(function ([key, values]) {
      if (values.some((item: any) => item.checked === true)) {
        let checkedArray = values.map((item: any) => {
          if (item.checked === true) {
            return item.title;
          }
        });

        if (checkedArray.length) {
          if (isFiltered) {
            generatedList = generatedList.filter((item: any) => {
              if (key === 'level') {
                return checkedArray.includes(item.level);
              }
              if (key === 'type') {
                return checkedArray.includes(item.type.name);
              }
              if (key === 'nation') {
                return checkedArray.includes(item.nation.name);
              }
            });
          } else {
            generatedList = filteredList.filter((item: any) => {
              if (key === 'level') {
                return checkedArray.includes(item.level);
              }
              if (key === 'type') {
                return checkedArray.includes(item.type.name);
              }
              if (key === 'nation') {
                return checkedArray.includes(item.nation.name);
              }
            });
          }
          isFiltered = true;
        }
      }
    });

    if (isFiltered) {
      updateListShips(generatedList);
    } else {
      updateListShips(filteredList);
    }
  };

  const scrollIntoView = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // навешиваю скролл для возможности вернуться наверх страницы
  useEffect(() => {
    onScroll();

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  useEffect(() => {
    if (filterList) {
      filterItems();
    }
  }, [filterList]);

  useEffect(() => {
    api
      .loadShips({
        query: QUERY_STRING,
      })
      .then((data) => {
        if (data?.data?.data?.vehicles) {
          setAllShipsList(data?.data?.data?.vehicles);
          setShipsList(data?.data?.data?.vehicles.slice(0, limitLoadingItems));
          setOffsetLoadingItems(offsetLoadingItems + limitLoadingItems);
          setLoadingState(false);
          generateFilters(data?.data?.data?.vehicles);
          setFilteredShipsList(data?.data?.data?.vehicles);
          setAllShipCounts(data?.data?.data?.vehicles.length);
        }
      })
      .catch((error) => {
        setLoadingState(false);
        console.log(error);
        toast.error('Ошибка загрузки!', {
          position: 'bottom-right',
        });
      });
  }, []);

  return (
    <div className={`App ${loadingState ? 'App--loading' : ''}`}>
      <Filter
        allShipCount={allShipCounts}
        loadingState={loadingState}
        filterList={filterList}
        setFilterList={setFilterList}
      />
      <Board
        data={shipstList}
        loadingState={loadingState}
        itemRef={lastItemRef}
      />
      {scroll > 150 ? (
        <button
          type="button"
          onClick={scrollIntoView}
          className="App__to-header"
        >
          Наверх
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default App;
