const SearchLocation = document.getElementById('SearchLocation');




if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {

        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;
        getWeatherData(`${lat},${long}`);

    })
} else {
    alert('geoloacation not found')
}

async function getWeatherData(query) {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=8a265543bfd5495ca55174935242006`)
    let data = await res.json()
    console.log(data);
    displayTodayWeather(data);
    displayTomorrowweather(data);
    displayafterTomWeather(data);
}

SearchLocation.addEventListener('input', function (e) {
    getWeatherData(e.target.value);
})


function displayTodayWeather(data) {

    let currentDate = data.current.last_updated;
    let date = new Date(currentDate);

    const todayWeekday = date.toLocaleString('en-us', { weekday: 'long' }); // weekDayName
    const TodayDate = date.getDate(); //dayNum
    const month = date.toLocaleString('en-us', { month: 'long' }); //monthName
    const city = data.location.name;
    const temp = data.current.temp_c
    const conditionState =data.current.condition.text;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;
    const compass = data.current.wind_dir;
    // const condImg = data.current.condition.icon;
    // console.log(condImg);

    
   
    




    Weekday.innerHTML = todayWeekday;
    dateToday.innerHTML = `${TodayDate} ${month}`;
    cityName.innerHTML = city;
    tempToday.innerHTML = temp;
    condition.innerHTML =conditionState;
    humidtyDegree.innerHTML = `${humidity} % `;
    windSpeed.innerHTML = `${wind}km/h`
    compassDir.innerHTML=compass;
    imgToday.setAttribute('src', `https://${data.current.condition.icon}` )



}


function displayTomorrowweather({forecast}){
    console.log(forecast);
    tomorrowDay.innerHTML = new Date(forecast.forecastday[1].date).toLocaleString('en-us',{weekday:'long'})
    tomImg.setAttribute('src',`https://${forecast.forecastday[1].day.condition.icon}`);
    maxDegree.innerHTML=forecast.forecastday[1].day.maxtemp_c;
    minDegree.innerHTML=forecast.forecastday[1].day.mintemp_c;
  
    
    console.log();

   
}

function displayafterTomWeather({forecast}){
    afterTomDay.innerHTML=new Date(forecast.forecastday[2].date).toLocaleString('en-us', {weekday:'long'});
    afterTomImg.setAttribute('src',`https://${forecast.forecastday[2].day.condition.icon}`);
    afterTomMaxDeg.innerHTML=forecast.forecastday[2].day.maxtemp_c;
    afterTomMindeg.innerHTML=forecast.forecastday[2].day.mintemp_c;
    console.log();
}


