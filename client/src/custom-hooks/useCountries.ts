import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Store } from 'redux/rootReducer';
import { Country } from 'common/commonTypes';
import { getCountries } from 'views/CountryTable/redux/countryAction';

type UseCountries = {
  countries: Country[];
  isLoading: boolean;
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
};

export const useCountries = (): UseCountries => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const { countries: fetchedCountries } = useSelector((state: Store) => state.countryReducer);

  useEffect(() => {
    !fetchedCountries && dispatch(getCountries());
  }, [dispatch, fetchedCountries]);

  useEffect(() => {
    if (!fetchedCountries.length) {
      setIsLoading(true);
    } else {
      setCountries(fetchedCountries);
      setIsLoading(false);
    }
  }, [fetchedCountries]);

  return { countries, isLoading, setCountries };
};
