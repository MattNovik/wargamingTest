import { useEffect, useState } from 'react';
import './scss/index.scss';
import Board from './components/Boad/Board';
import api from './api/api';
import Filter from './components/Filter/Filter';

const App = () => {
  const [shipstList, setShipsList] = useState<any>(null);

  useEffect(() => {
    api
      .loadShips({
        query: `
        query Vehicles($languageCode: String = "ru") {
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
          `,
      })
      .then((data) => {
        if (data?.data?.data?.vehicles) {
          setShipsList(data?.data?.data?.vehicles.slice(0, 40));
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="App">
      <Filter />
      <Board data={shipstList} />
    </div>
  );
};

export default App;
