//@ts-nocheck
import { all, fork } from 'redux-saga/effects';

import {
  sagaAddFavoriteCountry,
  sagaGetAllCountries,
  sagaGetCountryByName,
  sagaGetFavoriteCountry,
  sagaRemoveFavoriteCountry,
} from '../views/CountryTable/redux/countrySaga';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga() {
  yield all([
    fork(sagaGetAllCountries),
    fork(sagaGetCountryByName),
    fork(sagaGetFavoriteCountry),
    fork(sagaAddFavoriteCountry),
    fork(sagaRemoveFavoriteCountry),
  ]);
}
