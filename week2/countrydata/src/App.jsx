import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import CountryList from './components/CountryList'
import SingleCountryInfo from './components/SingleCountryInfo'


const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const sortedCountries = response.data.sort((a, b) => {
          if (a.name.common < b.name.common) return -1;
          if (a.name.common > b.name.common) return 1;
          return 0;
        });
        setCountries(sortedCountries);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm.length > 0 && (
        filteredCountries.length > 10 ? (
          <div>Too many countries, specify another filter</div>
        ) : filteredCountries.length === 1 ? (
          <SingleCountryInfo country={filteredCountries[0]} />
        ) : (
          <CountryList countries={filteredCountries} />
        )
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;