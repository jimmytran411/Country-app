import { createTheme, ThemeProvider } from '@material-ui/core';
import { useTheme } from 'context/ThemeContext';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CountryDetail } from './views/CountryDetail';
import { CountryTable } from './views/CountryTable/components';
import { Header } from './views/Header';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    type: 'light',
  },
});

const App: React.FC = () => {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme === 'light' ? { ...lightTheme } : { ...darkTheme }}>
      <Header />
      <Switch>
        <Route exact path="/">
          <CountryTable />
        </Route>
        <Route path="/country/:countryName">
          <CountryDetail />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
