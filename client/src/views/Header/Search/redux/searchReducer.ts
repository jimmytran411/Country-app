import { SEARCH_COUNTRY } from 'redux/actionTypes';
import { SearchAction } from './searchAction';

export type SearchReducer = {
  searchParam: string;
};

export const searchReducerInitialState: SearchReducer = {
  searchParam: '',
};

export default function (state = searchReducerInitialState, action: SearchAction): SearchReducer {
  switch (action.type) {
    case SEARCH_COUNTRY: {
      return { ...state, searchParam: action.payload };
    }

    default:
      return state;
  }
}
