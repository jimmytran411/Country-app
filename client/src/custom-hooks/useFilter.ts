import { useEffect, useState } from 'react';
import _ from 'lodash';

import { Country } from 'common/commonTypes';
import { useCountries } from './useCountries';
import { FilterInput } from 'views/Header/Search/Components/FilterForm';
import { useHandleUrl } from 'context/HandleUrlContext';

export const useFilter = (): Country[] => {
  const { countries } = useCountries();
  const { paramsFromUrl } = useHandleUrl();

  const [filterCountryList, setFilterCountryList] = useState<Country[]>([]);

  const filterCountries = (filter: FilterInput, countries: Country[]): void => {
    const { population: filterPopulation, populationOperator, language: filterLanguage } = filter;

    const countriesByPopulation = countries.filter(({ population }) =>
      populationOperator === 'Greater' ? population >= filterPopulation : population <= filterPopulation
    );

    if (!filterLanguage.length) {
      setFilterCountryList(countriesByPopulation);
    } else {
      const filteredCountry = countriesByPopulation.filter(({ languages }) => {
        return languages && Object.values(languages)[0] === filterLanguage;
      });
      setFilterCountryList(filteredCountry);
    }
  };

  useEffect(() => {
    const { population, populationOperator, language } = paramsFromUrl.filterInput;
    if (population || language) {
      filterCountries({ population, populationOperator, language: _.capitalize(language) }, countries);
    } else {
      setFilterCountryList(countries);
    }
  }, [countries, paramsFromUrl.filterInput, setFilterCountryList]);

  return filterCountryList;
};
