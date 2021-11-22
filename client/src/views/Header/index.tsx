import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Grid, Button, Badge, makeStyles } from '@material-ui/core';
import StarsOutlinedIcon from '@material-ui/icons/StarsOutlined';
import StarsIcon from '@material-ui/icons/Stars';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import { useLocation } from 'react-router-dom';

import { getCountries, sagaGetFavoriteCountry } from '../CountryTable/redux/countryAction';
import { FavoriteCountries } from './FavoriteCountries';
import { useTheme } from '../../context/ThemeContext';
import { Store } from 'redux/rootReducer';
import { ExpandableContent } from 'views/CountryDetail/ExpandableContent';
import { FilterForm } from './Search/Components/FilterForm';
import { SearchField } from './Search/Components/SearchField';

const useStyles = makeStyles({
  root: {
    padding: '8px',
  },
  button: {
    margin: '1.5rem',
    borderRadius: '40px',
    height: '3.5rem',
  },
});

export const Header: React.FC = () => {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const { favoriteCountries } = useSelector((state: Store) => state.countryReducer);
  const dispatch = useDispatch();

  const { toggleTheme, theme } = useTheme();
  const { root, button } = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setCount(favoriteCountries ? favoriteCountries.length : 0);
  }, [favoriteCountries]);

  useEffect(() => {
    dispatch(sagaGetFavoriteCountry());
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <Grid component={Paper} className={root} container alignItems="center" justifyContent="center" spacing={0}>
      <Grid item xs={2}>
        <Button className={button} onClick={() => toggleTheme()}>
          {theme === 'light' ? <WbSunnyIcon /> : <Brightness2Icon />}
        </Button>
      </Grid>
      <Grid item xs={7}>
        {!pathname.includes('/country') && <SearchField />}
        {!pathname.includes('/country') && <ExpandableContent contentTitle={'Filter'} Component={FilterForm} />}
      </Grid>
      <Grid item xs={2}>
        <Button className={button} onClick={handleOpen}>
          <Badge badgeContent={count} color="primary">
            {theme === 'light' ? <StarsOutlinedIcon /> : <StarsIcon />}
          </Badge>
        </Button>
      </Grid>
      <FavoriteCountries onClose={handleClose} open={open} />
    </Grid>
  );
};
