import React, { useEffect } from 'react';
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

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '26rem',
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
  const country = useSelector((state: Store) => state.countryReducer.country)[0];

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
              <ExpandableContent contentTitle="Region" content={country.subregion} />
              <ExpandableContent
                contentTitle="Borders"
                content={
                  country.borders.length
                    ? countries
                        .reduce((acc: string[], { alpha3Code, name }) => {
                          country.borders.includes(alpha3Code) && acc.push(name);
                          return acc;
                        }, [])
                        .join(', ')
                    : 'We are alone in the sea'
                }
              />
              <ExpandableContent
                contentTitle="Currencies"
                content={country.currencies.map(({ name }) => name).join(', ')}
              />
              <ExpandableContent contentTitle="Languages" content={Object.values(country.languages).join(', ')} />
            </CardActionArea>
          </Card>
        )}
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};
