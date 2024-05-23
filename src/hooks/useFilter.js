import { useLocationStorage } from "./useLocalStorage";

export function useFilter(dataList, callback) {
  const [query, setQuery] = useLocationStorage("query", "");

  const filteredData = dataList.filter((el) => {
    return callback(el).toLowerCase().includes(query);
  });

  return [filteredData, setQuery];
}
