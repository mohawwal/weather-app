const apiKey = ""

const main= document.querySelector(".main");
const form = document.querySelector(".form");
const search = document.querySelector(".search");


const url = function(city) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
}


async function getWeatherLocation(city) {
    const resp = await fetch(url(city), {
        mode: "cors"
    });
    const respData = await resp.json();

    addWeatherToPage(respData);
}


function addWeatherToPage(data) {
    const weather = document.createElement('div');
    weather.classList.add('weather');
    const temp = Ktoc(data.main.temp);
    weather.innerHTML = `
                        <div class=box>
                            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
                            <h2>${temp} degree Celsius</h2>
                            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
                        </div>
                        <small>${data.weather[0].main}</small>    
                        `; 
    main.innerHTML = "";
    main.appendChild(weather);                               
}


function Ktoc(K) {
    return Math.floor(K - 273.15);
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value;
    if(city) {
        getWeatherLocation(city)
    }
});


