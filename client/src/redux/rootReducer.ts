import { combineReducers } from 'redux';

import countryReducer from '../views/CountryTable/redux/countryReducer';
import searchReducer from 'views/Header/Search/redux/searchReducer';

const rootReducer = combineReducers({ countryReducer, searchReducer });

export type Store = ReturnType<typeof rootReducer>;

export default rootReducer;
