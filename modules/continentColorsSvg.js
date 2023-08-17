import filter from "./continentFilter.js";

const objectElement = document.querySelector("#continents-svg");
const svgDoc = objectElement.contentDocument;
let previousContinent = null;

// Function for svg manipulation
const continentsColorsSvg = (continent) => {
  const allContinentPaths = svgDoc.querySelectorAll('[id$="_svg"]');
  // Changing colors for all the countries
  if (continent === "all") {
    allContinentPaths.forEach((path) => {
      const currentContinent = path.id.replace(/_svg$/, "");
      const continentClass = document.querySelector(
        `h4.background_${currentContinent}`
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
  const continentClass = document.querySelector(`h4.background_${continent}`);
  const continentStyles = window.getComputedStyle(continentClass);
  const continentColor = continentStyles.backgroundColor;
  svgPath.setAttribute("fill", continentColor);

  previousContinent = continent;
};

// Function for picking continents from svg
document.addEventListener("DOMContentLoaded", function () {
  const allContinentPaths = svgDoc.querySelectorAll('[id$="_svg"]');

  allContinentPaths.forEach((continent) => {
    const continentName = continent.id.replace(/_svg$/, "");

    continent.style.cursor = "pointer";
    continent.style.webkitTapHighlightColor = "transparent";

    const title = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "title"
    );
    title.textContent = continentName.replace(/_/g, " ");
    continent.appendChild(title);

    continent.addEventListener("click", function () {
      if (previousContinent != continentName) {
        filter(continentName);
      }
    });
  });
});

export default continentsColorsSvg;
