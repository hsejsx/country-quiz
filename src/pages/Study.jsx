import { useEffect } from 'react';

export default function Study() {
  useEffect(() => {
    fetch(
      `https://apis.data.go.kr/1262000/CountryBasicService/getCountryBasicList?serviceKey=${
        import.meta.env.VITE_APP_SERVICE_KEY
      }&numOfRows=10`
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }, []);
  return <div></div>;
}
