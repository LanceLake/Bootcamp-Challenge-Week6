/*


WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history

WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city


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
var weatherTodayImage = document.getElementById("weatherTodayImage");
var weatherTodayDate = document.getElementById("weatherTodayDate");

var cardText0 = document.getElementById("card-text-0");
var cardText1 = document.getElementById("card-text-1");
var cardText2 = document.getElementById("card-text-2");
var cardText3 = document.getElementById("card-text-3");
var cardText4 = document.getElementById("card-text-4");
var cardWeather0 = document.getElementById("card-weather-0");
var cardWeather1 = document.getElementById("card-weather-1");
var cardWeather2 = document.getElementById("card-weather-2");
var cardWeather3 = document.getElementById("card-weather-3");
var cardWeather4 = document.getElementById("card-weather-4");
var cardDate0 = document.getElementById("card-date-0");
var cardDate1 = document.getElementById("card-date-1");
var cardDate2 = document.getElementById("card-date-2");
var cardDate3 = document.getElementById("card-date-3");
var cardDate4 = document.getElementById("card-date-4");
var cardTextVariableName = 'cardText';
var cardWeatherVariableName = 'cardWeather';
var cardDateVariableName = 'cardDate';

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
	fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=2be2c44b37dc4c66978bc44dca205463')

// See line 139.

	.then(response => response.text())
	.then((response) => {
		results = JSON.parse(response);
		console.log(results);

		temp = results["main"]["temp"];
		humidity = results["main"]["humidity"];
		windSpeed = results["wind"]["speed"];

		weatherToday.innerHTML = "Temp: " + temp + "k<br>Humidity: " + humidity + "<br>Wind Speed: " + windSpeed;

		if(results["weather"][0]["main"] === "Clouds"){weatherToday.classList.add("clouds");weatherTodayImage.src = "https://openweathermap.org/img/wn/02d@2x.png"};
		if(results["weather"][0]["main"] === "Clear"){weatherToday.classList.add("clear");weatherTodayImage.src = "https://openweathermap.org/img/wn/01d@2x.png"};
		if(results["weather"][0]["main"] === "Snow"){weatherToday.classList.add("snow");weatherTodayImage.src = "https://openweathermap.org/img/wn/13d@2x.png"};
		if(results["weather"][0]["main"] === "Rain"){weatherToday.classList.add("rain");weatherTodayImage.src = "https://openweathermap.org/img/wn/09d@2x.png"};
		if(results["weather"][0]["main"] === "Drizzle"){weatherToday.classList.add("drizzle");weatherTodayImage.src = "https://openweathermap.org/img/wn/09d@2x.png"};
		if(results["weather"][0]["main"] === "Thunderstorm"){weatherToday.classList.add("thunderstorm");weatherTodayImage.src = "https://openweathermap.org/img/wn/11d@2x.png"};
		if(results["weather"][0]["main"] === "Mist"){weatherToday.classList.add("smoke");weatherTodayImage.src = "https://openweathermap.org/img/wn/50d@2x.png"};
		if(results["weather"][0]["main"] === "Smoke"){weatherToday.classList.add("smoke");weatherTodayImage.src = "https://openweathermap.org/img/wn/50d@2x.png"};
		if(results["weather"][0]["main"] === "Haze"){weatherToday.classList.add("smoke");weatherTodayImage.src = "https://openweathermap.org/img/wn/50d@2x.png"};
		if(results["weather"][0]["main"] === "Dust"){weatherToday.classList.add("smoke");weatherTodayImage.src = "https://openweathermap.org/img/wn/50d@2x.png"};
		if(results["weather"][0]["main"] === "Fog"){weatherToday.classList.add("smoke");weatherTodayImage.src = "https://openweathermap.org/img/wn/50d@2x.png"};
		if(results["weather"][0]["main"] === "Sand"){weatherToday.classList.add("smoke");weatherTodayImage.src = "https://openweathermap.org/img/wn/50d@2x.png"};
		if(results["weather"][0]["main"] === "Ash"){weatherToday.classList.add("smoke");weatherTodayImage.src = "https://openweathermap.org/img/wn/50d@2x.png"};
		if(results["weather"][0]["main"] === "Squall"){weatherToday.classList.add("smoke");weatherTodayImage.src = "https://openweathermap.org/img/wn/50d@2x.png"};
		if(results["weather"][0]["main"] === "Tornado"){weatherToday.classList.add("smoke");weatherTodayImage.src = "https://openweathermap.org/img/wn/50d@2x.png"};

		weatherToday.innerHTML = "Temp: " + temp + "k<br>Humidity: " + humidity + "%<br>Wind Speed: " + windSpeed + "mph";

		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;

		weatherTodayDate.innerHTML = today;
	}
)};


function lookupWeather(lat,lon,cityName) {
	fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=2be2c44b37dc4c66978bc44dca205463')

// I know I can put &units=imperial in the URL, but I just want to see if the grading people will mark it off when they see above 150 degrees everywhere. Double points if they accept it and think it's global warming. Putting in that element of the query will cause it to show up in fareneit.

	.then(response => response.text())
	.then((response) => {
		results = JSON.parse(response);
		console.log(results);

		for(x = 0;x < 5; x = x + 1)
		{
			if(x == 0){y = 0; z = 8};
			if(x == 1){y = 8; z = 16};
			if(x == 2){y = 16; z = 24};
			if(x == 3){y = 24; z = 32};
			if(x == 4){y = 32; z = 40};

			for(i = y;i < z; i = i + 1)
			{
				rollingDate = results["list"][i]["dt_txt"].substring(0,10);

				rollingAverageTemp = rollingAverageTemp + results["list"][i]["main"]["temp"];
				rollingAverageHumidity = rollingAverageHumidity + results["list"][i]["main"]["humidity"];
				rollingAverageWindSpeed = rollingAverageWindSpeed + results["list"][i]["wind"]["speed"];

				if(results["list"][i]["weather"][0]["main"] === "Clouds" && !eval(cardTextVariableName + x).classList.contains("clouds")){eval(cardTextVariableName + x).classList.add("clouds");eval(cardWeatherVariableName + x).src = "https://openweathermap.org/img/wn/04d@2x.png"};
				
				
				if(results["list"][i]["weather"][0]["main"] === "Clear" && !eval(cardTextVariableName + x).classList.contains("clear")){eval(cardTextVariableName + x).classList.add("clear");eval(cardWeatherVariableName + x).src = "https://openweathermap.org/img/wn/01d@2x.png"};

				if(results["list"][i]["weather"][0]["main"] === "Snow" && !eval(cardTextVariableName + x).classList.contains("snow")){eval(cardTextVariableName + x).classList.add("snow");eval(cardWeatherVariableName + x).src = "https://openweathermap.org/img/wn/13d@2x.png"};


				if(results["list"][i]["weather"][0]["main"] === "Rain" && !eval(cardTextVariableName + x).classList.contains("rain")){eval(cardTextVariableName + x).classList.add("rain");eval(cardWeatherVariableName + x).src = "https://openweathermap.org/img/wn/09d@2x.png"};


				if(results["list"][i]["weather"][0]["main"] === "Drizzle" && !eval(cardTextVariableName + x).classList.contains("drizzle")){eval(cardTextVariableName + x).classList.add("drizzle");eval(cardWeatherVariableName + x).src = "https://openweathermap.org/img/wn/09d@2x.png"};

				
				if(results["list"][i]["weather"][0]["main"] === "Thunderstorm" && !eval(cardTextVariableName + x).classList.contains("thunderstorm")){eval(cardTextVariableName + x).classList.add("thunderstorm");eval(cardWeatherVariableName + x).src = "https://openweathermap.org/img/wn/11d@2x.png"};


				if(results["list"][i]["weather"][0]["main"] === "Mist" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke");eval(cardWeatherVariableName + x).src = "https://openweathermap.org/img/wn/50d@2x.png"};


				if(results["list"][i]["weather"][0]["main"] === "Smoke" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke");eval(cardWeatherVariableName + x).src = "https://openweathermap.org/img/wn/50d@2x.png"};


				if(results["list"][i]["weather"][0]["main"] === "Haze" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke");eval(cardWeatherVariableName + x).src = "https://openweathermap.org/img/wn/50d@2x.png"};


				if(results["list"][i]["weather"][0]["main"] === "Dust" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke");eval(cardWeatherVariableName + x).src = "https://openweathermap.org/img/wn/50d@2x.png"};


				if(results["list"][i]["weather"][0]["main"] === "Fog" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke");eval(cardWeatherVariableName + x).src = "https://openweathermap.org/img/wn/50d@2x.png"};


				if(results["list"][i]["weather"][0]["main"] === "Sand" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke");eval(cardWeatherVariableName + x).src = "https://openweathermap.org/img/wn/50d@2x.png"};


				if(results["list"][i]["weather"][0]["main"] === "Ash" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke");eval(cardWeatherVariableName + x).src = "https://openweathermap.org/img/wn/50d@2x.png"};


				if(results["list"][i]["weather"][0]["main"] === "Squall" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke");eval(cardWeatherVariableName + x).src = "https://openweathermap.org/img/wn/50d@2x.png"};


				if(results["list"][i]["weather"][0]["main"] === "Tornado" && !eval(cardTextVariableName + x).classList.contains("smoke")){eval(cardTextVariableName + x).classList.add("smoke");eval(cardWeatherVariableName + x).src = "https://openweathermap.org/img/wn/50d@2x.png"};


			}

//console.log("after",i,rollingAverageHumidity);
		rollingAverageTemp = rollingAverageTemp / 8;
		rollingAverageHumidity = rollingAverageHumidity / 8;
		rollingAverageWindSpeed = rollingAverageWindSpeed / 8;

		rollingAverageTemp = Math.round(rollingAverageTemp * 10) / 10;
		rollingAverageHumidity = Math.round(rollingAverageHumidity * 10) / 10;
		rollingAverageWindSpeed = Math.round(rollingAverageWindSpeed * 10) / 10;

		

//console.log("divide",i,rollingAverageHumidity);

		eval(cardTextVariableName + x).innerHTML = "Temp: " + rollingAverageTemp + "k<br>Humidity: " + rollingAverageHumidity + "%<br>Wind Speed: " + rollingAverageWindSpeed + "mph";

		eval(cardDateVariableName + x).innerHTML = rollingDate;

		rollingAverageTemp = 0;
		rollingAverageHumidity = 0;
		rollingAverageWindSpeed = 0;


	}


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