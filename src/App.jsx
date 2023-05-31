import { Outlet } from 'react-router-dom';
import { CountriesProvider } from './context/CountriesContext';

function App() {
  return (
    <>
      <CountriesProvider>
        <Outlet />
      </CountriesProvider>
    </>
  );
}

export default App;
