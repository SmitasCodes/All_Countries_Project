import countries from "./data.js";

// Global Variables
let main = document.querySelector("#main");
const objectElement = document.querySelector("#external-svg");
const svgDoc = objectElement.contentDocument;
let previousContinent = null;

// Event Listeners
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    document
      .querySelectorAll(".menu-item")
      .forEach((item) => item.classList.remove("selected"));
    item.classList.add("selected");
    document.documentElement.style.setProperty(
      "--selected-color",
      item.dataset.selectedColor
    );
    main.innerHTML = "";
    countriesOutput();
    let target = e.target.id;
    continentsColorsSvg(target);
    filter(target);
  });
});

// Filter function
const filter = (continent) => {
  document.querySelectorAll(".country").forEach((country) => {
    continent == "all"
      ? ""
      : country.classList.contains(continent) == false
      ? country.remove()
      : " ";
  });
};

// Logging countries
const countriesOutput = () => {
  // Sorting the countries array for alphabeticall order
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
    if (country.continents[0] == "Europe") {
      continent.classList.add("background_europe");
    } else if (country.continents[0] == "Asia") {
      continent.classList.add("background_asia");
    } else if (country.continents[0] == "Antarctica") {
      continent.classList.add("background_antarctica");
    } else if (country.continents[0] == "Africa") {
      continent.classList.add("background_africa");
    } else if (country.continents[0] == "North America") {
      continent.classList.add("background_north_america");
    } else if (country.continents[0] == "South America") {
      continent.classList.add("background_south_america");
    } else if (country.continents[0] == "Oceania") {
      continent.classList.add("background_oceania");
    }
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

const continentsColorsSvg = (continent) => {
  const allContinentPaths = svgDoc.querySelectorAll('[id$="_svg"]');
  // Changing colors for all the countries
  if (continent === "all") {
    allContinentPaths.forEach((path) => {
      const currentContinent = path.id.replace(/_svg$/, "");
      const continentClass = document.querySelector(
        `.background_${currentContinent}`
      );
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
  const continentClass = document.querySelector(`.background_${continent}`);
  const continentStyles = window.getComputedStyle(continentClass);
  const continentColor = continentStyles.backgroundColor;
  svgPath.setAttribute("fill", continentColor);

  previousContinent = continent;
};

// Function for picking continents from svg
document.addEventListener("DOMContentLoaded", function () {
  const allContinentPaths = svgDoc.querySelectorAll('[id$="_svg"]');

  allContinentPaths.forEach((continent) => {
    continent.addEventListener("click", function () {
      const continentName = continent.id.replace(/_svg$/, "");
      filter(continentName);
    });
  });
});

// Calling countriesOutput to display all the countries once page loads
countriesOutput();
continentsColorsSvg("all");
