import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Grid,
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Paper,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

import { getCountryByName } from '../CountryTable/redux/countryAction';
import { ExpandableContent } from './ExpandableContent';
import { FavoriteButton } from '../utils/FavoriteButton';
import { Store } from '../../redux/rootReducer';
import { Country } from '../../common/commonTypes';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 500,
    border: '1px solid #cac9c9',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));

export const CountryDetail: React.FC = () => {
  const { countryName } = useParams<{ countryName: string }>();

  const dispatch = useDispatch();
  const { countries } = useSelector((state: Store) => state.countryReducer);
  const country = useSelector((state: Store) => state.countryReducer.country);

  const { card, link } = useStyles();

  useEffect(() => {
    dispatch(getCountryByName(countryName));
  }, [dispatch, countryName]);

  return (
    <Grid
      component={Paper}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={2}></Grid>
      <Grid item xs>
        {!country && <CircularProgress />}
        {country && (
          <Card className={card}>
            <CardActions>
              <Button size="small" color="primary">
                <Link className={link} to="/">
                  <ArrowBackIcon />
                </Link>
              </Button>
              <FavoriteButton countryName={country.name} />
            </CardActions>

            <CardActionArea>
              <CardMedia
                component="img"
                alt={`${country.name}'s flag`}
                height="200"
                image={country.flags.svg}
                title={`${country.name}'s flag`}
              />

              <CardContent>
                <Typography gutterBottom align="center" variant="h5" component="h2">
                  {country.name}
                </Typography>
              </CardContent>

              <ExpandableContent contentTitle="Other name" content={country.altSpellings.join(', ')} />
              <ExpandableContent
                contentTitle="Region"
                content={country.subregion ? country.subregion : 'No available information'}
              />
              <ExpandableContent
                contentTitle="Borders"
                content={
                  country.borders
                    ? countries
                        .reduce((acc: string[], { fifa, name }) => {
                          country.borders.includes(fifa) && acc.push(name);
                          return acc;
                        }, [])
                        .join(', ')
                    : 'We are alone in the sea'
                }
              />
              <ExpandableContent contentTitle="Currencies">
                <Currency currencies={country.currencies} />
              </ExpandableContent>
              <ExpandableContent
                contentTitle="Languages"
                content={country.languages ? Object.values(country.languages).join(', ') : 'No available information'}
              />
            </CardActionArea>
          </Card>
        )}
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

function Currency({ currencies }: Pick<Country, 'currencies'>) {
  const renderData = useMemo(() => {
    const currencyAbbreviation = Object.keys(currencies);
    const currency: any = Object.values(currencies)[0];
    return {
      abbreviation: currencyAbbreviation,
      name: currency.name,
      symbol: currency.symbol,
    };
  }, [currencies]);

  return (
    <Grid container justifyContent="space-between" direction="column" spacing={2}>
      <Grid container item xs spacing={2}>
        <Grid item>Abbreviation:</Grid>
        <Grid item>{renderData.abbreviation}</Grid>
      </Grid>

      <Grid item xs container spacing={2}>
        <Grid item>Name:</Grid>
        <Grid item>{renderData.name}</Grid>
      </Grid>

      <Grid item xs container spacing={2}>
        <Grid item>Symbol:</Grid>
        <Grid item>{renderData.symbol}</Grid>
      </Grid>
    </Grid>
  );
}
