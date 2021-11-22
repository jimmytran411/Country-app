export type Country = {
  flags: {
    svg: string;
    png: string;
  };
  name: string;
  population: number;
  region: string;
  languages: GenericObject;
  altSpellings: string[];
  subregion: string;
  borders: string[];
  currencies: {
    name: string;
  }[];
  alpha3Code: string;
};

type ActionObject<T> = {
  type: T;
};

type ActionObjectWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type ActionReturn<T, P> = P extends null ? ActionObject<T> : ActionObjectWithPayload<T, P>;

export type GenericObject = {
  id?: string;
  [key: string]: any;
};
