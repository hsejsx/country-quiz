import { useContext } from 'react';
import { CountriesContext } from '../context/CountriesContext';

export default function Study() {
  const { countries } = useContext(CountriesContext);

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
