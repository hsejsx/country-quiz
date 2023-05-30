import { useEffect } from 'react';
import XMLParser from 'react-xml-parser';

export default function Study() {
  useEffect(() => {
    fetch(
      `https://apis.data.go.kr/1262000/CountryBasicService/getCountryBasicList?serviceKey=${
        import.meta.env.VITE_APP_SERVICE_KEY
      }&numOfRows=10`
    )
      .then(res => res.text())
      .then(data => {
        let xml = new XMLParser().parseFromString(data);
        const items = xml.children[1].children[0].children;
        const extractedData = items.map(item => ({
          basic: item.children.find(child => child.name === 'basic').value,
          countryName: item.children.find(child => child.name === 'countryName')
            .value,
          imgUrl: item.children.find(child => child.name === 'imgUrl').value,
        }));
        console.log(extractedData);
      })
      .catch(err => console.log(err));
  }, []);
  return <div></div>;
}
