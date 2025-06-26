import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme } from './src/constants/theme';
import { AppNavigator } from './src/navigation/app-navigator';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;
