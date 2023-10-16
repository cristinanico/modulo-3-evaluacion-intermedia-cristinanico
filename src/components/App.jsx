import '../styles/App.scss';
import React, { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) => {
      const name = country.name.common.toLowerCase();
      const continent = country.continents[0].toLowerCase();

      // La primera es el texto de búsqueda del usuario en minúsculas, evita error. La segunda, veririca si el nombre del país coincide con el texto de búsqueda. 
      const searchTextLower = searchText.toLowerCase();
      const nameMatch = name.includes(searchTextLower);

      // Filtra por continente
      const continentMatch = selectedContinent === 'all' || continent === selectedContinent;

      return nameMatch && continentMatch;
    });

    setFilteredCountries(filtered);
  }, [countries, searchText, selectedContinent]);

  return (
    <>
      <h1>Country Info App</h1>
      <div>
        <input
          type="text"
          placeholder="Country name"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <select
          value={selectedContinent}
          onChange={(event) => setSelectedContinent(event.target.value)}
        >
          <option value="all">All</option>
          <option value="africa">Africa</option>
          <option value="north america">North America</option>
          <option value="south america">South America</option>
          <option value="europe">Europe</option>
          <option value="asia">Asia</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.cca2}> {/* Utiliza "cca2" como ID */}
            <h3>{country.name.common}</h3>
            <p>Capital: {country.capital}</p>
            <p>{country.flag}</p>
            <p>Continente: {country.continents[0]}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
