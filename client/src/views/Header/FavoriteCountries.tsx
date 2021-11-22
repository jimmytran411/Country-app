import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { Grid, Button, Modal, makeStyles } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import { removeFavoriteCountry } from '../CountryTable/redux/countryAction';
import { useTheme } from '../../context/ThemeContext';
import { Store } from 'redux/rootReducer';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `40%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    maxHeight: '60vh',
    overflow: 'auto',
  },
  image: {
    width: 200,
    height: 100,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  countryRow: {
    padding: '20px 0px',
    borderBottom: '1px solid #f2f2f2',
  },
}));

type FavoriteCountriesProps = {
  onClose: () => void;
  open: boolean;
};

export const FavoriteCountries: React.FC<FavoriteCountriesProps> = ({ onClose, open }) => {
  const { favoriteCountries, countries } = useSelector((state: Store) => state.countryReducer);
  const dispatch = useDispatch();

  const { paper, image, link, countryRow } = useStyles();
  const { theme } = useTheme();

  const handleRemove = (countryName: string) => () => {
    dispatch(removeFavoriteCountry(countryName));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={paper}>
        {(!favoriteCountries.length || favoriteCountries[0] === '') &&
          `Nothing to show here. Try to add a country to your favorite, for example, where you were born`}
        {countries
          .filter(({ name }) => favoriteCountries.some((country) => country === name))
          .map(({ flags, name: countryName }) => {
            return (
              <Grid className={countryRow} container key={uuidv4()}>
                <Grid item xs>
                  <div className={image} style={{ backgroundImage: `url(${flags.svg})` }} />
                </Grid>
                <Grid item xs>
                  <Link className={link} onClick={onClose} to={`/country/${countryName}`}>
                    {countryName}
                  </Link>
                </Grid>
                <Grid item xs>
                  <Button onClick={handleRemove(countryName)}>
                    {theme === 'light' ? <RemoveCircleOutlineIcon /> : <RemoveCircleIcon />}
                  </Button>
                </Grid>
              </Grid>
            );
          })}
      </div>
    </Modal>
  );
};
