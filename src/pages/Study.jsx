import { useContext } from 'react';
import { CountriesContext } from '../context/CountriesContext';

export default function Study() {
  const { countries } = useContext(CountriesContext);

  if (countries)
    return (
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead>
            <tr>
              <th className='py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                국기
              </th>
              <th className='py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                번호
              </th>
              <th className='py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                나라
              </th>
              <th className='py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                수도
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {countries.map((country, index) => (
              <tr key={index}>
                <td className='py-4 px-6'>
                  <img src={country.imgUrl} alt='Flag' className='h-6 w-6' />
                </td>
                <td className='py-4 px-6'>{index + 1}</td>
                <td className='py-4 px-6'>{country.countryName}</td>
                <td className='py-4 px-6'>{country.capital}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
