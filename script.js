/*


WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history

WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

api key: 2be2c44b37dc4c66978bc44dca205463

https://openweathermap.org/api/geocoding-api
http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}


https://openweathermap.org/forecast16
api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid={API key}


https://openweathermap.org/forecast5
https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

*/


var searchedCities = document.getElementById("searchedCities");
var citySearch = document.getElementById("citySearch");
var citySearchButton = document.getElementById("citySearchButton");
var resultsEl = document.getElementById("results");
var weatherToday = document.getElementById("weatherToday");
var cardText0 = document.getElementById("card-text-0");
var cardText1 = document.getElementById("card-text-1");
var cardText2 = document.getElementById("card-text-2");
var cardText3 = document.getElementById("card-text-3");
var cardText4 = document.getElementById("card-text-4");
var cardTextVariableName = 'cardText';

var rollingAverageTemp = 0;
var rollingAverageHumidity = 0;
var rollingAverageWindSpeed = 0;


var lat = 0;
var lon = 0;
var cityName = "";
var results = "";


citySearchButton.addEventListener	(
	'click', function()
	{
		lookupCity(citySearch.value);
	}
);

function lookupCity(request) {
	fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + request + '&limit=1&appid=2be2c44b37dc4c66978bc44dca205463')
	.then(response => response.text())
	.then((response) => {
		results = JSON.parse(response);
		lat = results[0]["lat"];
		lon = results[0]["lon"];
		cityName = results[0]["name"];
		lookupWeatherToday(lat,lon,cityName);
		lookupWeather(lat,lon,cityName);
		addCityButton(cityName);
	})
}

function lookupWeatherToday(lat,lon,cityName) {
	fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=2be2c44b37dc4c66978bc44dca205463&units=imperial')
	.then(response => response.text())
	.then((response) => {
		results = JSON.parse(response);
		console.log(results);

		temp = results["main"]["temp"];
		humidity = results["main"]["humidity"];
		windSpeed = results["wind"]["speed"];

		weatherToday.innerHTML = "Temp: " + temp + "f<br>Humidity: " + humidity + "<br>Wind Speed: " + windSpeed;

	})
}


function lookupWeather(lat,lon,cityName) {
	fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=2be2c44b37dc4c66978bc44dca205463&units=imperial')
	.then(response => response.text())
	.then((response) => {
		results = JSON.parse(response);
		console.log(results);

		for(x = 0;x < 5; x = x + 1)
		{
			if(x == 0){y = 0; z = 7};
			if(x == 1){y = 8; z = 15};
			if(x == 2){y = 16; z = 23};
			if(x == 3){y = 24; z = 31};
			if(x == 4){y = 32; z = 39};

			for(i = y;i <= z; i = i + 1)
			{

				console.log("Before",i,rollingAverageTemp,rollingAverageHumidity,rollingAverageWindSpeed);


				rollingAverageTemp = rollingAverageTemp + results["list"][i]["main"]["temp"];
				rollingAverageHumidity = rollingAverageHumidity + results["list"][i]["main"]["humidity"];
				rollingAverageWindSpeed = rollingAverageWindSpeed + results["list"][i]["wind"]["speed"];



				if(results["list"][i]["weather"][0]["main"] === "Clouds" && !eval(cardTextVariableName + x).classList.contains("clouds")){eval(cardTextVariableName + x).classList.add("clouds")};
				if(results["list"][i]["weather"][0]["main"] === "Clear" && !eval(cardTextVariableName + x).classList.contains("clear")){eval(cardTextVariableName + x).classList.add("clear")};
				if(results["list"][i]["weather"][0]["main"] === "Snow" && !eval(cardTextVariableName + x).classList.contains("snow")){eval(cardTextVariableName + x).classList.add("snow")};
				if(results["list"][i]["weather"][0]["main"] === "Rain" && !eval(cardTextVariableName + x).classList.contains("rain")){eval(cardTextVariableName + x).classList.add("rain")};
				if(results["list"][i]["weather"][0]["main"] === "Drizzle" && !eval(cardTextVariableName + x).classList.contains("drizzle")){eval(cardTextVariableName + x).classList.add("drizzle")};
				if(results["list"][i]["weather"][0]["main"] === "Thunderstorm" && !eval(cardTextVariableName + x).classList.contains("thunderstorm")){eval(cardTextVariableName + x).classList.add("thunderstorm")};
				if(results["list"][i]["weather"][0]["main"] === "Mist" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke")};
				if(results["list"][i]["weather"][0]["main"] === "Smoke" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke")};
				if(results["list"][i]["weather"][0]["main"] === "Haze" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke")};
				if(results["list"][i]["weather"][0]["main"] === "Dust" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke")};
				if(results["list"][i]["weather"][0]["main"] === "Fog" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke")};
				if(results["list"][i]["weather"][0]["main"] === "Sand" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke")};
				if(results["list"][i]["weather"][0]["main"] === "Ash" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke")};
				if(results["list"][i]["weather"][0]["main"] === "Squall" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke")};
				if(results["list"][i]["weather"][0]["main"] === "Tornado" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke")};
			}

console.log("after",i,rollingAverageTemp,rollingAverageHumidity,rollingAverageWindSpeed);
		rollingAverageTemp = rollingAverageTemp / 8;
		rollingAverageHumidity = rollingAverageHumidity / 8;
		rollingAverageWindSpeed = rollingAverageWindSpeed / 8;

console.log("divide",i,rollingAverageTemp,rollingAverageHumidity,rollingAverageWindSpeed);

		eval(cardTextVariableName + x).innerHTML = "Temp: " + rollingAverageTemp + "f<br>Humidity: " + rollingAverageHumidity + "<br>Wind Speed: " + rollingAverageWindSpeed;
	}

/*

		rollingAverageTemp = 0;
		rollingAverageHumidity = 0;
		rollingAverageWindSpeed = 0;

		for(i = 8;i < 16; i = i + 1)
		{
			rollingAverageTemp = rollingAverageTemp + results["list"][i]["main"]["temp"];
			rollingAverageHumidity = rollingAverageHumidity + results["list"][i]["main"]["humidity"];
			rollingAverageWindSpeed = rollingAverageWindSpeed + results["list"][i]["wind"]["speed"];

			if(results["list"][i]["weather"][0]["main"] === "Clouds"){cardText1.classList.add("clouds")};
			if(results["list"][i]["weather"][0]["main"] === "Clear"){cardText1.classList.add("clear")};
			if(results["list"][i]["weather"][0]["main"] === "Snow"){cardText1.classList.add("snow")};
			if(results["list"][i]["weather"][0]["main"] === "Rain"){cardText1.classList.add("rain")};
			if(results["list"][i]["weather"][0]["main"] === "Drizzle"){cardText1.classList.add("drizzle")};
			if(results["list"][i]["weather"][0]["main"] === "Thunderstorm"){cardText1.classList.add("thunderstorm")};
			if(results["list"][i]["weather"][0]["main"] === "Mist"){cardText1.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Smoke"){cardText1.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Haze"){cardText1.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Dust"){cardText1.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Fog"){cardText1.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Sand"){cardText1.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Ash"){cardText1.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Squall"){cardText1.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Tornado"){cardText1.classList.add("smoke")};
		}

		rollingAverageTemp = rollingAverageTemp / 8;
		rollingAverageHumidity = rollingAverageHumidity / 8;
		rollingAverageWindSpeed = rollingAverageWindSpeed / 8;

		cardText1.innerHTML = "Temp: " + rollingAverageTemp + "f<br>Humidity: " + rollingAverageHumidity + "<br>Wind Speed: " + rollingAverageWindSpeed;

		rollingAverageTemp = 0;
		rollingAverageHumidity = 0;
		rollingAverageWindSpeed = 0;

		for(i = 16;i < 24; i = i + 1)
		{

			rollingAverageTemp = rollingAverageTemp + results["list"][i]["main"]["temp"];
			rollingAverageHumidity = rollingAverageHumidity + results["list"][i]["main"]["humidity"];
			rollingAverageWindSpeed = rollingAverageWindSpeed + results["list"][i]["wind"]["speed"];

			if(results["list"][i]["weather"][0]["main"] === "Clouds"){cardText2.classList.add("clouds")};
			if(results["list"][i]["weather"][0]["main"] === "Clear"){cardText2.classList.add("clear")};
			if(results["list"][i]["weather"][0]["main"] === "Snow"){cardText2.classList.add("snow")};
			if(results["list"][i]["weather"][0]["main"] === "Rain"){cardText2.classList.add("rain")};
			if(results["list"][i]["weather"][0]["main"] === "Drizzle"){cardText2.classList.add("drizzle")};
			if(results["list"][i]["weather"][0]["main"] === "Thunderstorm"){cardText2.classList.add("thunderstorm")};
			if(results["list"][i]["weather"][0]["main"] === "Mist"){cardText2.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Smoke"){cardText2.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Haze"){cardText2.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Dust"){cardText2.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Fog"){cardText2.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Sand"){cardText2.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Ash"){cardText2.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Squall"){cardText2.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Tornado"){cardText2.classList.add("smoke")};
		}

		rollingAverageTemp = rollingAverageTemp / 8;
		rollingAverageHumidity = rollingAverageHumidity / 8;
		rollingAverageWindSpeed = rollingAverageWindSpeed / 8;

		cardText2.innerHTML = "Temp: " + rollingAverageTemp + "f<br>Humidity: " + rollingAverageHumidity + "<br>Wind Speed: " + rollingAverageWindSpeed;

		rollingAverageTemp = 0;
		rollingAverageHumidity = 0;
		rollingAverageWindSpeed = 0;


		for(i = 24;i < 32; i = i + 1)
		{
			rollingAverageTemp = rollingAverageTemp + results["list"][i]["main"]["temp"];
			rollingAverageHumidity = rollingAverageHumidity + results["list"][i]["main"]["humidity"];
			rollingAverageWindSpeed = rollingAverageWindSpeed + results["list"][i]["wind"]["speed"];

			if(results["list"][i]["weather"][0]["main"] === "Clouds"){cardText3.classList.add("clouds")};
			if(results["list"][i]["weather"][0]["main"] === "Clear"){cardText3.classList.add("clear")};
			if(results["list"][i]["weather"][0]["main"] === "Snow"){cardText3.classList.add("snow")};
			if(results["list"][i]["weather"][0]["main"] === "Rain"){cardText3.classList.add("rain")};
			if(results["list"][i]["weather"][0]["main"] === "Drizzle"){cardText3.classList.add("drizzle")};
			if(results["list"][i]["weather"][0]["main"] === "Thunderstorm"){cardText3.classList.add("thunderstorm")};
			if(results["list"][i]["weather"][0]["main"] === "Mist"){cardText3.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Smoke"){cardText3.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Haze"){cardText3.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Dust"){cardText3.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Fog"){cardText3.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Sand"){cardText3.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Ash"){cardText3.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Squall"){cardText3.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Tornado"){cardText3.classList.add("smoke")};
		}

		rollingAverageTemp = rollingAverageTemp / 8;
		rollingAverageHumidity = rollingAverageHumidity / 8;
		rollingAverageWindSpeed = rollingAverageWindSpeed / 8;

		cardText3.innerHTML = "Temp: " + rollingAverageTemp + "f<br>Humidity: " + rollingAverageHumidity + "<br>Wind Speed: " + rollingAverageWindSpeed;

		rollingAverageTemp = 0;
		rollingAverageHumidity = 0;
		rollingAverageWindSpeed = 0;

		for(i = 32;i < 40; i = i + 1)
		{
			rollingAverageTemp = rollingAverageTemp + results["list"][i]["main"]["temp"];
			rollingAverageHumidity = rollingAverageHumidity + results["list"][i]["main"]["humidity"];
			rollingAverageWindSpeed = rollingAverageWindSpeed + results["list"][i]["wind"]["speed"];

			if(results["list"][i]["weather"][0]["main"] === "Clouds"){cardText4.classList.add("clouds")};
			if(results["list"][i]["weather"][0]["main"] === "Clear"){cardText4.classList.add("clear")};
			if(results["list"][i]["weather"][0]["main"] === "Snow"){cardText4.classList.add("snow")};
			if(results["list"][i]["weather"][0]["main"] === "Rain"){cardText4.classList.add("rain")};
			if(results["list"][i]["weather"][0]["main"] === "Drizzle"){cardText4.classList.add("drizzle")};
			if(results["list"][i]["weather"][0]["main"] === "Thunderstorm"){cardText4.classList.add("thunderstorm")};
			if(results["list"][i]["weather"][0]["main"] === "Mist"){cardText4.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Smoke"){cardText4.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Haze"){cardText4.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Dust"){cardText4.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Fog"){cardText4.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Sand"){cardText4.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Ash"){cardText4.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Squall"){cardText4.classList.add("smoke")};
			if(results["list"][i]["weather"][0]["main"] === "Tornado"){cardText4.classList.add("smoke")};
	
		}

		rollingAverageTemp = rollingAverageTemp / 8;
		rollingAverageHumidity = rollingAverageHumidity / 8;
		rollingAverageWindSpeed = rollingAverageWindSpeed / 8;

		cardText4.innerHTML = "Temp: " + rollingAverageTemp + "f<br>Humidity: " + rollingAverageHumidity + "<br>Wind Speed: " + rollingAverageWindSpeed;

		rollingAverageTemp = 0;
		rollingAverageHumidity = 0;
		rollingAverageWindSpeed = 0;
*/
	})
}

function addCityButton(city) {
	if (!document.getElementById("cityButton-" + city))
	{
	
		buttonCity = document.createElement('button');
		buttonCity.innerHTML = city;
		buttonCity.classList.add("form-control");
		buttonCity.classList.add("btn");
		buttonCity.classList.add("btn-primary");
		buttonCity.setAttribute('ID','cityButton-' + city);
		searchedCities.appendChild(buttonCity);
		buttonCity.addEventListener('click', function(){lookupCity(this.innerHTML)});

	}
}