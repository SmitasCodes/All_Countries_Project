import countries from '../assets/countriesData.js'
import continentColors from '../assets/continentColorsData.js';

// Countries output function
const countriesOutput = () => {
  // Sorting the countries array for alphabetical order
  countries.sort((a, b) => {
    const nameA = a.name.common.toUpperCase();
    const nameB = b.name.common.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });


  countries.map((country) => {
    // Each div for a country
    const card = document.createElement("div");
    card.classList.add("country");
    // Continent parts, setting background colors for specific continents
    let continent = document.createElement("h4");
    continent.innerText = country.continents[0];
    continent.classList.add("continent");
    continent.classList.add(continentColors[country.continents[0]]);
    card.appendChild(continent);
    // Country name
    const name = document.createElement("h2");
    name.classList.add("country_name");
    name.innerText = country.name.common;
    card.appendChild(name);
    // Img
    const img = document.createElement("img");
    img.src = country.flags.png;
    card.appendChild(img);
    // Capital
    if (country.capital != undefined) {
      const capital = document.createElement("h3");
      capital.innerText = country.capital[0];
      card.appendChild(capital);
    }
    // Borders
    if (country.borders != undefined) {
      let borders = document.createElement("h5");
      borders.innerText = country.borders;
      card.appendChild(borders);
    }
    // Languages
    if (country.languages != undefined) {
      for (let key in country.languages) {
        var languages = document.createElement("h5");
        languages.innerText += country.languages[key] + " ";
      }
      card.classList.add(
        country.continents[0].toLowerCase().replace(/ /g, "_")
      );
      card.appendChild(languages);
    }
    // Currencies
    for (let key in country.currencies) {
      let currency = document.createElement("h5");
      currency.innerText = key;
      card.appendChild(currency);
    }
    // End
    main.appendChild(card);
  });
};

export default countriesOutput;
