import { Country } from '../../../common/commonTypes';
import {
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRY_SUCCESS,
  GET_FAVORITE_COUNTRY,
  SET_FAVORITE_COUNTRY,
} from '../../../redux/actionTypes';
import { CountryAction } from './countryAction';

export type CountryReducer = {
  countries: Country[];
  country: Country[];
  favoriteCountries: string[];
};

export const countryReducerInitialState: CountryReducer = {
  countries: [],
  country: [],
  favoriteCountries: [],
};

export default function (state = countryReducerInitialState, action: CountryAction): CountryReducer {
  switch (action.type) {
    case FETCH_COUNTRIES_SUCCESS:
      return { ...state, countries: action.payload };

    case FETCH_COUNTRY_SUCCESS:
      return { ...state, country: action.payload };

    case GET_FAVORITE_COUNTRY:
      return { ...state, favoriteCountries: action.payload };

    case SET_FAVORITE_COUNTRY:
      return { ...state, favoriteCountries: action.payload };

    default:
      return state;
  }
}
