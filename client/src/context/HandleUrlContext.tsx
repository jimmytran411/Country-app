import { ActionReturn } from 'common/commonTypes';
import _ from 'lodash';
import qs from 'qs';
import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { SET_FILTER_INPUT, SET_PAGINATION } from 'redux/actionTypes';
import { FilterInput } from 'views/Header/Search/Components/FilterForm';

interface PaginationInput {
  page: number;
  rowsPerPage: number;
}

interface ParamsFromUrl {
  filterInput: FilterInput;
  pagination: PaginationInput;
}

type HandleFilterAction = ActionReturn<typeof SET_FILTER_INPUT, FilterInput>;
type HandlePaginationAction = ActionReturn<typeof SET_PAGINATION, PaginationInput>;
type HandleUrlAction = HandleFilterAction | HandlePaginationAction;

interface HandleUrlContext {
  paramsFromUrl: ParamsFromUrl;
  handleFilter: (filterInput: FilterInput) => void;
  handlePagination: (paginationInput: PaginationInput) => void;
}

const initialState: HandleUrlContext = {
  paramsFromUrl: {
    filterInput: {
      language: '',
      populationOperator: 'Greater',
      population: 0,
    },
    pagination: {
      page: 0,
      rowsPerPage: 10,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleFilter: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handlePagination: () => {},
};

const handleUrlReducer = (paramsFromUrl: ParamsFromUrl, action: HandleUrlAction) => {
  switch (action.type) {
    case SET_FILTER_INPUT:
      return {
        ...paramsFromUrl,
        filterInput: action.payload,
      };
    case SET_PAGINATION:
      return {
        ...paramsFromUrl,
        pagination: action.payload,
      };

    default:
      throw new Error('action not found');
  }
};

const HandleUrlContext = React.createContext<HandleUrlContext>(initialState);

const HandleUrlProvider: React.FC = (props: any) => {
  const [paramsFromUrl, dispatch] = React.useReducer(handleUrlReducer, initialState.paramsFromUrl);

  const { search } = useLocation();
  const history = useHistory();

  const handleFilter = (filterInput: FilterInput): void => {
    dispatch({ type: SET_FILTER_INPUT, payload: filterInput });
  };

  const handlePagination = (paginationInput: PaginationInput) => {
    dispatch({ type: SET_PAGINATION, payload: paginationInput });
  };

  React.useEffect(() => {
    const param = qs.parse(search.slice(1));
    const keys = Object.keys(param);
    if (keys.length) {
      keys.includes('page') && handlePagination({ page: Number(param.page), rowsPerPage: Number(param.rowsPerPage) });
      keys.includes('language') &&
        handleFilter({
          population: Number(param.population),
          populationOperator: param.populationOperator === 'Greater' ? 'Greater' : 'Less',
          language: String(param.language),
        });
    }
  }, [search]);

  React.useEffect(() => {
    const { filterInput, pagination } = paramsFromUrl;
    const isFilterChange = !_.isEqual(filterInput, initialState.paramsFromUrl.filterInput);
    const isPaginationChange = !_.isEqual(pagination, initialState.paramsFromUrl.pagination);

    const qsstring = qs.stringify(isFilterChange ? { ...filterInput, ...pagination } : pagination);

    (isFilterChange || isPaginationChange) && history.push(`/?${qsstring}`);
  }, [history, paramsFromUrl]);

  return <HandleUrlContext.Provider value={{ paramsFromUrl, handleFilter, handlePagination }} {...props} />;
};
const useHandleUrl = (): HandleUrlContext => React.useContext(HandleUrlContext);

export { HandleUrlProvider, useHandleUrl, HandleUrlContext };
