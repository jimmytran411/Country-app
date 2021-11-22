/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
//@ts-nocheck
import { takeLatest, call, put } from 'redux-saga/effects';

import { fetchAllCountries, fetchCountryByName } from '../../../api/country';
import {
  SAGA_ADD_FAVORITE_COUNTRY,
  SAGA_GET_ALL_COUNTRIES,
  SAGA_GET_COUNTRY_BY_NAME,
  SAGA_GET_FAVORITE_COUNTRY,
  SAGA_REMOVE_FAVORITE_COUNTRY,
} from '../../../redux/actionTypes';
import { fetchCountriesSuccess, fetchCountrySucess, getFavoriteCountry, setFavoriteCountry } from './countryAction';

export const createSaga = (actionType, fetchFunction, fetchSuccessAction) => {
  return function* () {
    yield takeLatest(actionType, function* (action) {
      const payload = action.payload;
      const data = payload ? yield call(fetchFunction, payload) : yield call(fetchFunction);
      yield put(fetchSuccessAction(data));
    });
  };
};

export function* sagaGetAllCountries() {
  yield takeLatest(SAGA_GET_ALL_COUNTRIES, function* () {
    const { data } = yield call(fetchAllCountries);
    const countries = data.map(({ name, ...country }: any) => ({ ...country, name: name.common }));
    yield put(fetchCountriesSuccess(countries));
  });
}

export function* sagaGetCountryByName() {
  yield takeLatest(SAGA_GET_COUNTRY_BY_NAME, function* (action) {
    const countryName = action.payload;
    const { data } = yield call(fetchCountryByName, countryName);
    const country = { ...data[0], name: data[0].name.common };
    yield put(fetchCountrySucess(country));
  });
}

export function* sagaGetFavoriteCountry() {
  yield takeLatest(SAGA_GET_FAVORITE_COUNTRY, function* () {
    const countries = localStorage.getItem('favoriteCountries');
    const favoriteCountries = countries ? countries.split(',') : [];
    yield put(getFavoriteCountry(favoriteCountries));
  });
}

export function* sagaAddFavoriteCountry() {
  yield takeLatest(SAGA_ADD_FAVORITE_COUNTRY, function* (action) {
    const countryName = action.payload;

    const favoriteCountries = localStorage.getItem('favoriteCountries');
    const updatedFavoriteCountries = favoriteCountries ? `${favoriteCountries},${countryName}` : countryName;

    yield localStorage.setItem('favoriteCountries', updatedFavoriteCountries);
    yield put(setFavoriteCountry(updatedFavoriteCountries.split(',')));
  });
}

export function* sagaRemoveFavoriteCountry() {
  yield takeLatest(SAGA_REMOVE_FAVORITE_COUNTRY, function* (action) {
    const countryName = action.payload;
    const countries: string = localStorage.getItem('favoriteCountries') ?? '';
    const updateCountriesList: string = countries
      .split(',')
      .filter((country) => country !== countryName)
      .join(',');
    yield localStorage.setItem('favoriteCountries', updateCountriesList);
    yield put(setFavoriteCountry(updateCountriesList.split(',')));
  });
}
