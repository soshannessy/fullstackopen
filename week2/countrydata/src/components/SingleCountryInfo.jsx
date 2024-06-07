import React from 'react'

const SingleCountryInfo = ({ country }) => {
    return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} sq km</p>
      <p>Languages:</p>
      <ul>
      {Object.values(country.languages).map((language, index) => (
        <li key={index}>{language}</li>
      ))}
    </ul>
    <img src={country.flags.svg} alt={`${country.name.common} flag`} style={{width:"30vw"}} />
    </div>
  );
};

export default SingleCountryInfo;

