let city = document.getElementById("cityName").innerText;
let button = document.getElementById("searchBtn");
button.addEventListener("click", function() {
    city = document.getElementById("cityInput").value;
    console.log("City updated to: " + city);
        if(city == ""){
        alert("Please Enter a city");
        return;

}


     fetchWeatherData(city);
        
});

     async function fetchWeatherData(city) {

        try{

        
         let response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
       );
       //console.log("Fetching geocoding data for city: " + response);

       let data = await response.json();

        console.log(data);
       if(data.results.length === 0){
        console.log("City not found");//not found
        return;//stop function here




       }

       let cityName = data.results[0].name;
       let cityElement = document.getElementById("cityName");
       cityElement.textContent = cityName;

        let latitude = data.results[0].latitude;//if found
        let longitude = data.results[0].longitude;

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);


        let weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
            );

        let weatherData = await weatherResponse.json();

        console.log(weatherData);
        let temperature = weatherData.current.temperature_2m;
        console.log("Temperature" ,temperature);

        let humidity = weatherData.current.relative_humidity_2m;
        console.log("Humidity:", humidity);

        let windSpeed = weatherData.current.wind_speed_10m;

        console.log("Wind Speed:", windSpeed);

        let temperatureElement = document.getElementById("temperature");
        temperatureElement.textContent = temperature + "°C";

        let humidityElement = document.getElementById("humidity");
        humidityElement.textContent = humidity + "%";

        let windElement = document.getElementById("windSpeed");
        windElement.textContent = windSpeed + "km/h";


        let weatherCode = weatherData.current.weather_code;

        console.log("Weather Code:", weatherCode);
        let condition;
        if(weatherCode === 0){//Exactly value 0
            condition = "Clear Sky";
            console.log("Condition",condition);
        }
      else if(weatherCode === 1){//Exactly value 1
            condition = "Mainly Clear";
            console.log("Condition",condition);
        }
        else if(weatherCode === 2){
            condition = "Partly Cloudy";
            console.log("Condition",condition);
        }
        else if(weatherCode === 3){
            condition = "Overcast";
            console.log("Condition",condition);
        }
        else{
            condition = "Unknown";
        }
        let conditionElement = document.getElementById("condition");
        conditionElement.textContent = condition;



        
    }
    catch(error){
        console.log(error);
    alert("Something went wrong.Please try again.")
}
}
let locationBtn = document.getElementById("locationBtn");

 function  getUserLocation() {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (position) {

            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            fetchWeatherByLocation(latitude, longitude);
        },

        function (error) {
            console.log(error);
            alert("Location permission denied or location could not be found.");
        }
 );
}
getUserLocation();


async function fetchWeatherByLocation(latitude, longitude) {

    try {

        let weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
        );

        let weatherData = await weatherResponse.json();

        console.log(weatherData);

        let temperature = weatherData.current.temperature_2m;
        let humidity = weatherData.current.relative_humidity_2m;
        let windSpeed = weatherData.current.wind_speed_10m;
        let weatherCode = weatherData.current.weather_code;

        document.getElementById("temperature").textContent =
            temperature + "°C";

        document.getElementById("humidity").textContent =
            humidity + "%";

        document.getElementById("windSpeed").textContent =
            windSpeed + " km/h";

        let condition;

        if (weatherCode === 0) {
            condition = "Clear Sky";
        }
        else if (weatherCode === 1) {
            condition = "Mainly Clear";
        }
        else if (weatherCode === 2) {
            condition = "Partly Cloudy";
        }
        else if (weatherCode === 3) {
            condition = "Overcast";
        }
        else {
            condition = "Unknown";
        }

        document.getElementById("condition").textContent = condition;

    }
    catch (error) {
        console.log(error);
        alert("Something went wrong. Please try again.");
    }
}
