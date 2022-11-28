import countries from './data.js';

countries.map( country =>{
    // Each div for a country
    const one_country = document.createElement("div")
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
    } else if(country.continents[0]=="Asia"){
        continent.classList.add("ruda");
    } else if(country.continents[0]=="Antarctica"){
        continent.classList.add("lime");
    } else if(country.continents[0]=="Africa"){
        continent.classList.add("pilka");
    } else if(country.continents[0]=="North America"){
        continent.classList.add("raudonas");
    } else if(country.continents[0]=="South America"){
        continent.classList.add("violetine");
    } else if(country.continents[0]=="Australia"){
        continent.classList.add("zalia");
    } else if(country.continents[0]=="Oceania"){
        continent.classList.add("deepmelyna");
    }
    one_country.appendChild(continent);
    // Borders
    if(country.borders != undefined){
        let borders = document.createElement("h4");
        borders.innerText = country.borders;
        one_country.appendChild(borders);
    }
    // Languages
    if(country.languages!= undefined){
        for(let key in country.languages){
            let language = document.createElement("h4")
            language.innerText = country.languages[key];
            one_country.appendChild(language);
        }
    }
    // Currencies
    for(let key in country.currencies){
        let currency = document.createElement("h4");
        currency.innerText = key;
        one_country.appendChild(currency);
    }
    // END
    main.appendChild(one_country)
})