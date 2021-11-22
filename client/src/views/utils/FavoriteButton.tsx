import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import StarsOutlinedIcon from '@material-ui/icons/StarsOutlined';
import StarsIcon from '@material-ui/icons/Stars';
import { useSelector, useDispatch } from 'react-redux';

import { useTheme } from '../../context/ThemeContext';
import { addFavoriteCountry } from '../CountryTable/redux/countryAction';
import { Store } from 'redux/rootReducer';

const useStyles = makeStyles({
  favoriteBtn: {
    color: 'inherit',
    borderRadius: '40px',
    height: '3.5rem',
  },
});

type FavoriteButtonProps = {
  countryName: string;
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ countryName }) => {
  const dispatch = useDispatch();
  const { favoriteCountries } = useSelector((state: Store) => state.countryReducer);

  const { favoriteBtn } = useStyles();
  const { theme } = useTheme();

  return (
    <Button
      onClick={() => dispatch(addFavoriteCountry(countryName))}
      disabled={favoriteCountries.some((country) => country === countryName)}
      className={favoriteBtn}
    >
      {theme === 'light' ? <StarsOutlinedIcon /> : <StarsIcon />}
    </Button>
  );
};
