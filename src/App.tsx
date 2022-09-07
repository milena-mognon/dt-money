import { defaultTheme } from './styles/themes/default';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <h1>Base React App Config</h1>
    </ThemeProvider>
  );
}

export default App;
