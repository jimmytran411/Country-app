import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { CountryReducer, countryReducerInitialState } from 'views/CountryTable/redux/countryReducer';
import { SearchReducer, searchReducerInitialState } from 'views/Header/Search/redux/searchReducer';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

type RootReducer = {
  countryReducer: CountryReducer;
  searchReducer: SearchReducer;
};

const initialState: RootReducer = {
  countryReducer: countryReducerInitialState,
  searchReducer: searchReducerInitialState,
};
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
  if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
    });
  }
}

const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);

export default store;
