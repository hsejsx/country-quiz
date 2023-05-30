import { createContext } from 'react';
import { useEffect, useState } from 'react';
import XMLParser from 'react-xml-parser';

export const CountriesContext = createContext();

export function CountriesProvider({ children }) {
  const [countries, setCountries] = useState();
  const regex = /수도\s*:\s*([^)&\s]+(?:\)[^\s]*)?)/;
  useEffect(() => {
    const cachedData = localStorage.getItem('countriesData');
    if (cachedData) {
      setCountries(JSON.parse(cachedData));
    } else {
      fetch(
        `https://apis.data.go.kr/1262000/CountryBasicService/getCountryBasicList?serviceKey=${
          import.meta.env.VITE_APP_SERVICE_KEY
        }&numOfRows=200`
      )
        .then(res => res.text())
        .then(data => {
          let xml = new XMLParser().parseFromString(data);
          const items = xml.children[1].children[0].children;
          const extractedData = items.map(item => ({
            capital: item.children
              .find(child => child.name === 'basic')
              .value.match(regex)
              ? item.children
                  .find(child => child.name === 'basic')
                  .value.match(regex)[1]
              : '',
            countryName: item.children.find(
              child => child.name === 'countryName'
            ).value,
            imgUrl: item.children
              .find(child => child.name === 'imgUrl')
              .value.replace('&amp;', '&'),
          }));
          console.log(extractedData);
          setCountries(extractedData);
          setCountries(prev => {
            localStorage.setItem(
              'countriesData',
              JSON.stringify(prev.filter(country => country.capital))
            );
            return prev.filter(country => country.capital);
          });
        })
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <CountriesContext.Provider value={{ countries }}>
      {children}
    </CountriesContext.Provider>
  );
}
