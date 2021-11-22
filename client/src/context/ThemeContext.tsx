import * as React from 'react';

type ThemeContextProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const initialTheme: ThemeContextProps = {
  theme: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
};

const ThemeContext = React.createContext<ThemeContextProps>(initialTheme);

const ThemeProvider: React.FC = (props: any) => {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    localStorage.setItem('localTheme', theme === 'light' ? 'dark' : 'light');
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  React.useEffect(() => {
    const localTheme = localStorage.getItem('localTheme');
    localTheme && setTheme(localTheme);
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }} {...props} />;
};
const useTheme = (): ThemeContextProps => React.useContext(ThemeContext);

export { ThemeProvider, useTheme, ThemeContext };
