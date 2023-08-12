import countries from "./data.js";

// Global Variables
let main = document.querySelector("#main");
const objectElement = document.querySelector("#external-svg");
const svgDoc = objectElement.contentDocument;
let previousContinent = null;

// Event Listeners
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    let target = e.target.id;
    main.innerHTML = "";
    countriesOutput();
    filter(target);
    continentsSvg(target);
  });
});

// Logging countries
function countriesOutput() {
  countries.map((country) => {
    // Each div for a country
    const one_country = document.createElement("div");
    one_country.classList.add("country");
    // Continent
    let continent = document.createElement("h4");
    continent.innerText = country.continents[0];
    continent.classList.add("continent");
    if (country.continents[0] == "Europe") {
      continent.classList.add("background_europe");
      continent.classList.add("europe");
    } else if (country.continents[0] == "Asia") {
      continent.classList.add("background_asia");
      continent.classList.add("asia");
    } else if (country.continents[0] == "Antarctica") {
      continent.classList.add("background_antarctica");
      continent.classList.add("antarctica");
    } else if (country.continents[0] == "Africa") {
      continent.classList.add("background_africa");
      continent.classList.add("africa");
    } else if (country.continents[0] == "North America") {
      continent.classList.add("background_north_america");
      continent.classList.add("north_america");
    } else if (country.continents[0] == "South America") {
      continent.classList.add("background_south_america");
      continent.classList.add("south_america");
    } else if (country.continents[0] == "Oceania") {
      continent.classList.add("background_oceania");
      continent.classList.add("oceania");
    }
    one_country.appendChild(continent);
    // Country name
    const one_name = document.createElement("h2");
    one_name.classList.add("country_name");
    one_name.innerText = country.name.common;
    one_country.appendChild(one_name);
    // Img
    const img = document.createElement("img");
    img.src = country.flags.png;
    one_country.appendChild(img);
    // Capital
    if (country.capital != undefined) {
      const capital = document.createElement("h3");
      capital.innerText = country.capital[0];
      one_country.appendChild(capital);
    }
    // Borders
    if (country.borders != undefined) {
      let borders = document.createElement("h5");
      borders.innerText = country.borders;
      one_country.appendChild(borders);
    }
    // Languages
    if (country.languages != undefined) {
      for (let key in country.languages) {
        var language = document.createElement("h5");
        language.innerText += country.languages[key] + " ";
      }
      one_country.appendChild(language);
    }
    // Currencies
    for (let key in country.currencies) {
      let currency = document.createElement("h5");
      currency.innerText = key;
      one_country.appendChild(currency);
    }
    // END
    main.appendChild(one_country);
  });
}
const continentsSvg = (continent) => {
  const allContinentPaths = svgDoc.querySelectorAll('[id$="_svg"]');

  // Chaning colors for all the countries
  if (continent === "all") {
    allContinentPaths.forEach((path) => {
      const currentContinent = path.id.replace(/_svg$/, "");
      const continentClass = document.querySelector(`.li_${currentContinent}`);
      const continentStyles = window.getComputedStyle(continentClass);
      const continentColor = continentStyles.backgroundColor;
      path.setAttribute("fill", continentColor);
    });

    previousContinent = "all";
    return;
  }

  // Black out continents if previously selected continent was 'all'
  if (previousContinent === "all") {
    allContinentPaths.forEach((path) => {
      path.setAttribute("fill", "#000");
    });
  }

  if (previousContinent && previousContinent !== "all") {
    const previousSvgPath = svgDoc.getElementById(`${previousContinent}_svg`);
    previousSvgPath.setAttribute("fill", "#000");
  }

  // Antarctica wasn't in svg file, so it's not displayed
  if (continent === "antarctica") {
    if (previousContinent && previousContinent !== "all") {
      const previousSvgPath = svgDoc.getElementById(`${previousContinent}_svg`);
      previousSvgPath.setAttribute("fill", "#000");
    }
    return;
  }

  // Change color for the selected continent
  const svgPath = svgDoc.getElementById(`${continent}_svg`);
  const continentClass = document.querySelector(`.li_${continent}`);
  const continentStyles = window.getComputedStyle(continentClass);
  const continentColor = continentStyles.backgroundColor;
  svgPath.setAttribute("fill", continentColor);

  previousContinent = continent;
};

// Calling coutnriesOutput to display all the countries once page loads
countriesOutput();

// Filter function
function filter(continents) {
  document.querySelectorAll("h4").forEach((continent) => {
    continents == "all"
      ? " "
      : continent.classList.contains(continents) == false
      ? continent.parentElement.remove()
      : " ";
  });
}
