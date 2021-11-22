import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, CircularProgress, Grid } from '@material-ui/core';

import { useCountries } from 'custom-hooks/useCountries';
import { useSearch } from 'custom-hooks/useSearch';
import { FavoriteButton } from 'views/utils/FavoriteButton';
import { GenericTable } from './GenericTable/Table';
import { useFilter } from 'custom-hooks/useFilter';

const useStyles = makeStyles(() => ({
  image: {
    width: 150,
    height: 100,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '0 12px',
  },
}));

export const CountryTable: React.FC = () => {
  const { isLoading } = useCountries();
  const { image } = useStyles();
  const filterCountries = useFilter();
  const { searchData } = useSearch(filterCountries);

  return (
    <>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <GenericTable
          data={searchData}
          column={[
            {
              dataKey: 'flag',
              label: 'Flag',
              isSearchable: false,
              isSortable: false,
              renderContent: ({ flags }) => {
                return <div className={image} style={{ backgroundImage: `url(${flags.svg})` }} />;
              },
            },
            {
              dataKey: 'name',
              label: 'Name',
              isSearchable: false,
              isSortable: true,
              renderContent: ({ name }) => (
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/country/${name}`}>
                  {name}
                </Link>
              ),
            },
            { dataKey: 'population', label: 'Population', isSearchable: false, isSortable: true },
            {
              dataKey: 'languages',
              label: 'Languages',
              isSearchable: false,
              isSortable: false,
              renderContent: ({ languages }) => (
                <Grid container direction="column">
                  {languages
                    ? Object.values(languages).map((lang, index) => (
                        <Grid key={index} item xs>
                          {lang}
                        </Grid>
                      ))
                    : 'No information'}
                </Grid>
              ),
            },
            { dataKey: 'region', label: 'Region', isSearchable: false, isSortable: true },
            {
              dataKey: ' ',
              label: ' ',
              isSearchable: false,
              isSortable: false,
              renderContent: ({ name }) => <FavoriteButton countryName={name} />,
            },
          ]}
        />
      )}
    </>
  );
};
