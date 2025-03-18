const citySearchBtn = document.querySelector("#citySearchSubmit")
const cityName = document.querySelector("#cityName")

citySearchBtn.addEventListener("click", (e) =>{
    cityWeather()
    e.preventDefault()
})

const cityWeather = async () => {
    const weather = document.querySelector(("#current-weather"))
    var weatherIcon = document.querySelector(".fa-solid")

    const cityTemp = document.querySelector('#temp')
    const cityResponse = document.querySelector('#city')
    const cityWeather = document.querySelector('#weather')
    const cityHumidity = document.querySelector('#humidity')
    cityTemp.innerHTML = ""
    cityResponse.innerHTML = ""
    cityWeather.innerHTML = "" 
    cityHumidity.innerHTML = ""

    const background = document.querySelector("body")

    let key = "1d9d277d6d4f60faaa2a762decd7214f"
    try{

        const city = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${key}`)

        console.log(`city.data`)
        console.log(city.data)
        const cityNameResponse = city.data.name
        console.log(cityNameResponse)
        const countryNameResponse = city.data.sys.country
        console.log(countryNameResponse)
        const cityTempResponse = city.data.main.temp
        console.log(Math.round(cityTempResponse-273.15))
        const cityWeatherResponse = city.data.weather[0].main
        console.log(cityWeatherResponse)
        const cityHumidityResponse = city.data.main.humidity
        console.log(cityHumidityResponse)

        const forcast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName.value}&appid=${key}`)
        // forcast - search only for 5 days
        console.log(`forcast.data`)
        console.log(forcast.data)

        const forcast1 = forcast.data.list[7].main.temp
        console.log(Math.round(forcast1-273.15))
        const forcast1day = forcast.data.list[7].dt_txt
        console.log(forcast1day.split(" ")[0])
        // const forcast2 = forcast.data.list[15].main.temp
        // console.log(Math.round(forcast2-273.15))
        // const forcast3 = forcast.data.list[23].main.temp
        // console.log(Math.round(forcast3-273.15))
        // const forcast4 = forcast.data.list[31].main.temp
        // console.log(Math.round(forcast4-273.15))
        // const forcast5 = forcast.data.list[39].main.temp
        // console.log(Math.round(forcast5-273.15))

        // temp
        cityTemp.innerHTML = ""
        cityTemp.innerHTML = `${Math.round(cityTempResponse-273.15)}°`
        weather.append(cityTemp)
        // city
        cityResponse.innerHTML = ""
        cityResponse.innerHTML = `${cityNameResponse}`
        weather.append(cityResponse)
        // weather
        cityWeather.innerHTML = ""
        cityWeather.innerHTML = `${cityWeatherResponse}`
        weather.append(cityWeather)
        // humidity
        cityHumidity.innerHTML = ""
        cityHumidity.innerHTML = `${cityHumidityResponse}% Humidity`
        weather.append(cityHumidity)

        // weather 
        if(cityWeatherResponse == "Clouds" || cityWeatherResponse == "Moderate Clouds"){
            weatherIcon.classList.remove("fa-cloud","fa-cloud-sun","fa-cloud-showers-heavy","fa-snowflake","fa-smog");
            weatherIcon.classList.add('fa-cloud')
            document.body.style.backgroundColor = "grey";
        }
        if(cityWeatherResponse == "Clear"){
            weatherIcon.classList.remove("fa-cloud","fa-cloud-sun","fa-cloud-showers-heavy","fa-snowflake", "fa-smog");
            weatherIcon.classList.add('fa-cloud-sun')
            document.body.style.backgroundColor = "lightblue";
        }
        if(cityWeatherResponse == "Rain"){
            weatherIcon.classList.remove("fa-cloud","fa-cloud-sun","fa-cloud-showers-heavy","fa-snowflake", "fa-smog");
            weatherIcon.classList.add('fa-cloud-showers-heavy')
            document.body.style.backgroundColor = "lightgrey";
        }
        if(cityWeatherResponse == "Snow"){
            weatherIcon.classList.remove("fa-cloud","fa-cloud-sun","fa-cloud-showers-heavy","fa-snowflake", "fa-smog");
            weatherIcon.classList.add('fa-snowflake')
            document.body.style.backgroundColor = "white";
        }
        if(cityWeatherResponse == "Fog"){
            weatherIcon.classList.remove("fa-cloud","fa-cloud-sun","fa-cloud-showers-heavy","fa-snowflake", "fa-smog");
            weatherIcon.classList.add('fa-smog')
            document.body.style.backgroundColor = "darkgrey";
        }


    


    }
    catch(e){
        
        cityResponse.innerHTML = "please search city"
        cityTemp.innerHTML = ""
        cityWeather.innerHTML = ""
        cityHumidity.innerHTML = ""
        weatherIcon.classList.remove("fa-cloud","fa-cloud-sun","fa-cloud-showers-heavy","fa-snowflake", "fa-smog");
            
        console.log("weather not available!", e)
    }
}

cityWeather()

