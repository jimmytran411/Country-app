import axios, { AxiosResponse, CancelToken } from 'axios';

import { Country } from '../common/commonTypes';

const baseUrl = 'https://restcountries.com/v3.1';

export const fetchCountryByName = (
  countryName: string,
  token: CancelToken,
  timeout?: number
): Promise<AxiosResponse<Country>> => {
  return axios.get(`${baseUrl}/name/${countryName}`, {
    cancelToken: token,
    timeout,
  });
};

export const fetchAllCountries = (token?: CancelToken, timeout?: number): Promise<AxiosResponse<Country[]>> => {
  return axios.get(`${baseUrl}/all`, {
    cancelToken: token,
    timeout,
  });
};
