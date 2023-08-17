import continentsColorsSvg from "./continentColorsSvg.js";
import countriesOutput from "./countriesOutput.js";

// Event Listeners for navbar
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    document.querySelectorAll(".menu-item.selected").forEach((selectedItem) => {
      selectedItem.classList.remove("selected");
    });

    item.classList.add("selected");
    document.documentElement.style.setProperty(
      "--selected-color",
      item.dataset.selectedColor
    );

    const target = e.target.id;
    filter(target);
  });
});

// Filtering function
const filter = (continent) => {
  main.innerHTML = "";
  countriesOutput();
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
