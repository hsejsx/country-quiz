import { CountriesProvider } from './context/CountriesContext';
import Study from './pages/Study';

function App() {
  return (
    <>
      <CountriesProvider>
        <Study />
      </CountriesProvider>
    </>
  );
}

export default App;
