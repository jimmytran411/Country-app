import * as React from 'react';
import { HandleUrlProvider } from './HandleUrlContext';

import { ThemeProvider } from './ThemeContext';

type ChildProps = { children: JSX.Element[] | JSX.Element };

export const AppProvider: React.FC<ChildProps> = ({ children }: ChildProps) => {
  return (
    <ThemeProvider>
      <HandleUrlProvider>{children}</HandleUrlProvider>
    </ThemeProvider>
  );
};
