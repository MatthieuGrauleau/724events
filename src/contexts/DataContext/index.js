import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  // Event Card
  const [last, setLast] = useState(null);
  // This funtion return last event entry in collection
  const getLastEvent = (allEvents) => {
    const byDateDesc = allEvents?.events.sort((evtA, evtB) =>
      new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
    );
    setLast(byDateDesc[0]);
  };
  const getData = useCallback(async () => {
    try {
      const retreiveData = await api.loadData();
      setData(retreiveData);
      // event Card
      getLastEvent(retreiveData);
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;

    getData();
  });

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;

// Notes :
// Another way to add last :

// const getLast = useCallback(async () => {
//   try {
//     const datas = await api.loadData();
//     getLastEvent(datas.event);
//   } catch (err) {
//     setError(err);
//   }
// });

// useEffect(() => {
//   if (last) return;
//   getLast();
// });
