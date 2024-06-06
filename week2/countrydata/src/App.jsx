import React, { useState, useEffect } from 'react';

function App() {
  const [countryData, setCountryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch('https://studies.cs.helsinki.fi/restcountries/api/' + {searchQuery});
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCountryData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountryData();
  }, []);

  useEffect(() => {
    const filteredSuggestions = countryData
      .filter((country) =>
        country.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
      .map((country) => country.name);

    if (filteredSuggestions.length > 10) {
      setMessage('Too many matches, specify another filter');
      setSuggestions([]);
    } else {
      setMessage('');
      setSuggestions(filteredSuggestions);
    }
  }, [searchQuery, countryData]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearchChange} />
      <ul>
        {message && <li>{message}</li>}
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
      {countryData}
    </div>
  );
}

export default App;


