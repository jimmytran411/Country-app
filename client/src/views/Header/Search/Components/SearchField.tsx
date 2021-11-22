import React from 'react';
import { TextField, withStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { searchCountry } from '../redux/searchAction';

export const CssTextField = withStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: theme.palette.text,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.text,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.text,
      },
    },
  },
}))(TextField);

export const SearchField: React.FC = () => {
  const [search, setSearch] = React.useState('');

  const dispatch = useDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTimeout(() => {
      setSearch(event.target.value);
    }, 1000);
  };

  React.useEffect(() => {
    dispatch(searchCountry(search));
  }, [search, dispatch]);

  return <CssTextField label="Search Country" variant="outlined" fullWidth onChange={handleSearchChange} />;
};
