import { useEffect, useState } from 'react';
import XMLParser from 'react-xml-parser';

export default function Study() {
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

  if (countries)
    return (
      <section className='flex flex-col w-full mx-auto max-w-xl'>
        {countries.map((country, index) => (
          <section key={index} className='md:flex items-start mb-4'>
            <div className='w-full h-auto max-w-xl md:flex-shrink-0 md:basis-[40%] mb-2'>
              <img
                className='w-full h-full object-cover'
                src={country.imgUrl}
                alt=''
              />
            </div>
            <table className='table-auto flex-grow text-center'>
              <thead>
                <tr>
                  <th className='px-1 py-2'>번호</th>
                  <th className='px-4 py-2'>나라</th>
                  <th className='px-4 py-2'>수도</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border px-4 py-2'>{index + 1}</td>
                  <td className='border px-4 py-2'>{country.countryName}</td>
                  <td className='border px-4 py-2'>{country.capital}</td>
                </tr>
              </tbody>
            </table>
          </section>
        ))}
      </section>
    );
}
