import { ActionReturn } from 'common/commonTypes';
import { SEARCH_COUNTRY } from 'redux/actionTypes';

export const searchCountry = (searchParam: string): ActionReturn<typeof SEARCH_COUNTRY, string> => {
  return {
    type: SEARCH_COUNTRY,
    payload: searchParam,
  };
};

export type SearchAction = ReturnType<typeof searchCountry>;
