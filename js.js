import countries from './data.js';

// Event Listeners
document.querySelectorAll('.menu-item').forEach(item=> {
    item.addEventListener('click', function(){
        let target =event.target.innerText;
        target == "North America" ? target="North_America": target=="South America" ? target = "South_America":"";
        main.innerHTML = "";
        countriesOutput();
        filter(target);
    });
})

// Main div
let main = document.querySelector("#main");

// Logging countries
function countriesOutput(){
    countries.map( country =>{
        // Each div for a country
        const one_country = document.createElement("div")
        one_country.classList.add("country")
        // Country name
        const one_name = document.createElement("h2");
        one_name.innerText = country.name.common;
        one_country.appendChild(one_name);
        // Img
        const img = document.createElement("img");
        img.src = country.flags.png;
        one_country.appendChild(img)
        // Capital
        if(country.capital != undefined){
            const capital = document.createElement("h3");
            capital.innerText = country.capital[0];
            one_country.appendChild(capital)
        }
        // Continent
        continent = document.createElement("h4");
        continent.innerText = country.continents[0];
        continent.classList.add("continent");
        if(country.continents[0] == undefined){
            continent.classList.add("geltona");
        } else if(country.continents[0]=="Europe"){
            continent.classList.add("melyna");
            continent.classList.add("Europe");
        } else if(country.continents[0]=="Asia"){
            continent.classList.add("ruda");
            continent.classList.add("Asia");
        } else if(country.continents[0]=="Antarctica"){
            continent.classList.add("lime");
            continent.classList.add("Antarctica");
        } else if(country.continents[0]=="Africa"){
            continent.classList.add("pilka");
            continent.classList.add("Africa");
        } else if(country.continents[0]=="North America"){
            continent.classList.add("raudonas");
            continent.classList.add("North_America");
        } else if(country.continents[0]=="South America"){
            continent.classList.add("violetine");
            continent.classList.add("South_America");
        } else if(country.continents[0]=="Oceania"){
            continent.classList.add("deepmelyna");
            continent.classList.add("Oceania");
        }
        one_country.appendChild(continent);
        // Borders
        if(country.borders != undefined){
            let borders = document.createElement("h5");
            borders.innerText = country.borders;
            one_country.appendChild(borders);
        }
        // Languages
        if(country.languages!= undefined){
            for(let key in country.languages){
                var language = document.createElement("h5")
                language.innerText+= country.languages[key] + " ";
            }
            one_country.appendChild(language);
        }
        // Currencies
        for(let key in country.currencies){
            let currency = document.createElement("h5");
            currency.innerText = key;
            one_country.appendChild(currency);
        }
        // END
        main.appendChild(one_country)
    })
}

// Filter function
function filter(continents){
    document.querySelectorAll("h4").forEach(continent =>{
        continents == "All" ? " ": continent.classList.contains(continents) == false ? continent.parentElement.remove():" ";
    })
};
