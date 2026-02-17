import { createContext } from 'react';

// Create the context
export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {}
});
