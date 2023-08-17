import continentsColorsSvg from "./continentColorsSvg.js";
import countriesOutput from "./countriesOutput.js";

// Event Listeners for navbar
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    const target = e.target.id;
    filter(target);
  });
});

// Function for chaning colors in menu once you click on specific continent
const changingMenuColor = (continent) => {
  document.querySelectorAll(".menu-item.selected").forEach((selectedItem) => {
    selectedItem.classList.remove("selected");
  });

  const aElement = document.querySelector(`#${continent}`);

  aElement.classList.add("selected");
  document.documentElement.style.setProperty(
    "--selected-color",
    aElement.dataset.selectedColor
  );
  return;
};

// Filtering function
const filter = (continent) => {
  main.innerHTML = "";
  countriesOutput();
  changingMenuColor(continent);
  continentsColorsSvg(continent);
  document.querySelectorAll(".country").forEach((country) => {
    continent == "all"
      ? ""
      : country.classList.contains(continent) == false
      ? country.remove()
      : " ";
  });
};

export default filter;
