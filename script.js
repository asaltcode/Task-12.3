const cityName = document.getElementById("cityName");
const getBtn =document.getElementById("getBtn");
const currentWeather = document.querySelector(".currentWeather")
const min_temp = document.querySelector(".min-temp")
const max_temp = document.querySelector(".max-temp");
const weather_icon = document.getElementById("weather_icon")

//getting weaather from tamlnadu
function getWeather(city){
    const response = fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},tn,in&limit=15&appid=c2992e8e9788c5d112051a7a743a1b70`);
    response.then((datas)=>datas.json()).then((data)=>{
        const lat = data[0].lat;
        const lon = data[0].lon;
        cityWeather(lat, lon)
    }).catch((error)=>{
        alert("There is a typo in your city name")
    })
}


//Also fetches city weather from API
function cityWeather(lat, lon){
    const response = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c2992e8e9788c5d112051a7a743a1b70&units=metric`);
    response.then((datas)=>datas.json())
    .then((data)=>{ //assion the value
        currentWeather.lastElementChild.innerHTML = Math.round(data.main.feels_like);
        min_temp.lastElementChild.innerHTML = Math.floor(data.main.temp_min);
        max_temp.lastElementChild.innerHTML = Math.floor(data.main.temp_max);
        weather_icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        
    }).catch((error) =>{
        alert("There is a typo in your city name")
    })
}
//Get Weather button
getBtn.addEventListener("click", ()=>{
    //input validation
    let value = cityName.value
    if(isNaN(value)){        
        getWeather(cityName.value);
    }
    else{
        alert("Enter the valid input")
    }
})