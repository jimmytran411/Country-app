import { GenericObject } from 'common/commonTypes';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Store } from 'redux/rootReducer';

interface UseSearch<T> {
  searchData: T[];
}

export const useSearch = <T extends GenericObject>(data: T[]): UseSearch<T> => {
  const [searchData, setSearchData] = useState<T[]>([]);

  const { searchParam } = useSelector((state: Store) => state.searchReducer);

  useEffect(() => {
    setSearchData(data.filter(({ name }) => name.toLowerCase().includes(searchParam.toLowerCase())));
  }, [data, searchParam]);

  return { searchData };
};
