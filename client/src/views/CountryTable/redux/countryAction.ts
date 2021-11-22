import { ActionReturn, Country } from 'common/commonTypes';
import {
  FETCH_COUNTRY_SUCCESS,
  FETCH_COUNTRIES_SUCCESS,
  SAGA_GET_ALL_COUNTRIES,
  SAGA_GET_COUNTRY_BY_NAME,
  GET_FAVORITE_COUNTRY,
  SAGA_GET_FAVORITE_COUNTRY,
  SAGA_ADD_FAVORITE_COUNTRY,
  SAGA_REMOVE_FAVORITE_COUNTRY,
  SET_FAVORITE_COUNTRY,
} from '../../../redux/actionTypes';

export const getCountries = (): ActionReturn<typeof SAGA_GET_ALL_COUNTRIES, null> => {
  return {
    type: SAGA_GET_ALL_COUNTRIES,
  };
};

export const fetchCountriesSuccess = (data: Country[]): ActionReturn<typeof FETCH_COUNTRIES_SUCCESS, Country[]> => {
  return {
    type: FETCH_COUNTRIES_SUCCESS,
    payload: data,
  };
};

export const getCountryByName = (countryName: string): ActionReturn<typeof SAGA_GET_COUNTRY_BY_NAME, string> => {
  return {
    type: SAGA_GET_COUNTRY_BY_NAME,
    payload: countryName,
  };
};

export const fetchCountrySucess = (data: Country[]): ActionReturn<typeof FETCH_COUNTRY_SUCCESS, Country[]> => {
  return {
    type: FETCH_COUNTRY_SUCCESS,
    payload: data,
  };
};

export const addFavoriteCountry = (countryName: string): ActionReturn<typeof SAGA_ADD_FAVORITE_COUNTRY, string> => {
  return {
    type: SAGA_ADD_FAVORITE_COUNTRY,
    payload: countryName,
  };
};

export const sagaGetFavoriteCountry = (): ActionReturn<typeof SAGA_GET_FAVORITE_COUNTRY, null> => {
  return {
    type: SAGA_GET_FAVORITE_COUNTRY,
  };
};

export const getFavoriteCountry = (
  favoriteCountries: string[]
): ActionReturn<typeof GET_FAVORITE_COUNTRY, string[]> => {
  return {
    type: GET_FAVORITE_COUNTRY,
    payload: favoriteCountries,
  };
};

export const removeFavoriteCountry = (
  countryName: string
): ActionReturn<typeof SAGA_REMOVE_FAVORITE_COUNTRY, string> => {
  return {
    type: SAGA_REMOVE_FAVORITE_COUNTRY,
    payload: countryName,
  };
};

export const setFavoriteCountry = (
  favoriteCountries: string[]
): ActionReturn<typeof SET_FAVORITE_COUNTRY, string[]> => {
  return {
    type: SET_FAVORITE_COUNTRY,
    payload: favoriteCountries,
  };
};

export type CountryAction = ReturnType<
  | typeof getCountries
  | typeof fetchCountriesSuccess
  | typeof getCountryByName
  | typeof fetchCountrySucess
  | typeof addFavoriteCountry
  | typeof removeFavoriteCountry
  | typeof getFavoriteCountry
  | typeof sagaGetFavoriteCountry
  | typeof setFavoriteCountry
>;
