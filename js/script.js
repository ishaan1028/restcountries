
let dataAPI;
let tempDataAPI;
let cardsList = document.querySelector(".cards-list");
let searchInput = document.querySelector(".sip");
let selectInput = document.querySelector(".fbr");

renderCards = (data) => {

    if (data.length !== 0) {
        const finalHTML = data.map(country => {
            return `<div class="card">
        <img src=${country.flag} alt="" />
        <div class="details">
            <p><span>Country:</span> ${country.name}</p>
            <p><span>population:</span> ${country.population}</p>
            <p><span>Region:</span> ${country.region}</p>
            <p><span>Capital:</span> ${country.capital}</p>
        </div>
    </div>`;
        }).join("");


        cardsList.innerHTML = finalHTML;
    }
    else {
        let oopsMsg = `<div class="invisible"></div><img class="shiba" src="/images/shiba.png" alt="">
            <h3 class="oops"> OOPS! No results found, try again by resetting the filter </h3>`
        cardsList.innerHTML = oopsMsg;
    }


}






getCountries = async () => {

    try {
        let data = await fetch("https://restcountries.eu/rest/v2/all");
        dataAPI = await data.json();
        tempDataAPI = dataAPI;

        renderCards(dataAPI);
    }
    catch (err) {
        alert(err);
    }


}



searchInput.addEventListener("keyup", (event) => {
    const sV = event.target.value.toLowerCase();
    const filtered = tempDataAPI.filter((country) => {
        return country.name.toLowerCase().includes(sV);
    });

    renderCards(filtered);



});

selectInput.addEventListener("change", (event) => {
    const sV = event.target.value;
    searchInput.value = "";
    if (sV === "all") {
        tempDataAPI = dataAPI;
        renderCards(dataAPI);

    }
    else {
        tempDataAPI = dataAPI.filter((country) => {
            return country.region === sV;
        });
        renderCards(tempDataAPI);
    }

});




getCountries();

