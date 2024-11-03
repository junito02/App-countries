import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchesInput = country.name.common
      .toLowerCase()
      .includes(inputValue.toLowerCase());
    const matchesRegion =
      selectedRegion === "All" || country.region === selectedRegion;
    return matchesInput && matchesRegion;
  });

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleBackClick = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="App">
      <h1 className="title">App-countries</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Filtrar países..."
      />

      <select onChange={handleRegionChange} value={selectedRegion}>
        <option value="All">Todos los continentes</option>
        <option value="Africa">África</option>
        <option value="Americas">Américas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceanía</option>
      </select>

      {selectedCountry ? (
        <div className="country-details">
          <button className="back-button" onClick={handleBackClick}>
            ← Volver
          </button>
          <div className="details-card">
            <h2>{selectedCountry.name.common}</h2>
            <img
              src={selectedCountry.flags.png}
              alt={selectedCountry.flags.alt}
            />
            <p>
              <strong>Capital:</strong>{" "}
              {selectedCountry.capital ? selectedCountry.capital[0] : "N/A"}
            </p>
            <p>
              <strong>Región:</strong> {selectedCountry.region}
            </p>
            <p>
              <strong>Población:</strong>{" "}
              {selectedCountry.population.toLocaleString()}
            </p>
            <p>
              <strong>Subregión:</strong> {selectedCountry.subregion}
            </p>
            <p>
              <strong>Área:</strong> {selectedCountry.area.toLocaleString()} km²
            </p>
            <p>
              <strong>Idiomas:</strong>{" "}
              {Object.values(selectedCountry.languages || {}).join(", ")}
            </p>
            <p>
              <strong>Moneda:</strong>{" "}
              {Object.values(selectedCountry.currencies || {})
                .map((currency) => currency.name)
                .join(", ")}
            </p>
          </div>
        </div>
      ) : (
        <div className="country-container">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div
                className="country-card"
                key={country.name.common}
                onClick={() => handleCountryClick(country)}
              >
                <img src={country.flags.png} alt={country.flags.alt} />
                <h1>{country.name.common}</h1>
                <p>Capital: {country.capital ? country.capital[0] : "N/A"}</p>
                <p>Región: {country.region}</p>
                <p>Población: {country.population.toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No se encontraron países.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
