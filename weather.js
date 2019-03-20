var days = document.getElementsByClassName("day");
var lButton = document.getElementById("leftButton");

for(var i = 5; i < 10; i++) {
    days[i].style.display = "none";
}

lButton.style.visibility = "hidden";

function rightAction() {
    var days = document.getElementsByClassName("day");
    var rButton = document.getElementById("rightButton");
    var lButton = document.getElementById("leftButton");

    if(lButton.style.visibility == "hidden")
        lButton.style.visibility = "visible";

    for(var i = 5; i < 10; i++) {
        if(days[i].style.display == "none") {
             days[i].style.display = "block";
             days[i - 5].style.display = "none";
             if(i == 9)
                 rButton.style.visibility = "hidden";
             break;
        }    
    }
}

function leftAction() {
    var days = document.getElementsByClassName("day");
    var rButton = document.getElementById("rightButton");
    var lButton = document.getElementById("leftButton");

    if(rButton.style.visibility == "hidden")
        rButton.style.visibility = "visible";

    for(var i = 4; i > -1; i--) {
        if(days[i].style.display == "none") {
             days[i].style.display = "block";
             days[i + 5].style.display = "none";
             if(i == 0)
                 lButton.style.visibility = "hidden";
             break;
        }
    }
}



function gotNewPlace() {
    var place = document.getElementById("zipSearch").value;
    var script = document.createElement('script');
    script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + place + "')&format=json&callback=callbackFunction";

    script.id = "jsonpCall";

    var oldScript = document.getElementById("jsonpCall");
    
    if(oldScript) {
        document.body.removeChild(oldScript);
    }

    document.body.appendChild(script);
}

function callbackFunction(data) {
    var today = document.getElementById("today");
    var time = document.getElementById("time");
    var now = data.query.results.channel.lastBuildDate;

    var condition = data.query.results.channel.item.condition;
    var curGraphic = document.getElementById("imageNow");
    var loc = document.getElementById("location");
    var curTemp = document.getElementById("currTemp");
    var words = document.getElementById("status");
    var water = document.getElementById("rain");
    var breeze = document.getElementById("wind");

    loc.textContent = JSON.stringify(data.query.results.channel.location.city).replace(/"/g,"") + ", " + JSON.stringify(data.query.results.channel.location.region).replace(/"/g,"");
    curTemp.textContent = JSON.stringify(condition.temp).replace(/"/g,"") + '\xB0';
    words.textContent = JSON.stringify(condition.text).replace(/"/g,"");

    if(words.textContent == "Sunny" || words.textContent == 
       "Mostly Sunny")
        curGraphic.src = 
        "./WeatherApp3/WeatherApp/sunny.png";
    if(words.textContent == "Partly Cloudy" || words.textContent 
       == "Partly Sunny")
        curGraphic.src = 
        "./WeatherApp3/WeatherApp/part-sun.png";
    if(words.textContent == "Mostly Cloudy" || words.textContent 
       == "Cloudy")
        curGraphic.src = 
        "./WeatherApp3/WeatherApp/cloudy.png";
    if(words.textContent == "Scattered Showers" ||  
       words.textContent == "Showers")
        curGraphic.src = 
        "./WeatherApp3/WeatherApp/rain.png";
    if(words.textContent == "Scattered Thunderstorms" || 
       words.textContent == "Thunderstorms")
        curGraphic.src = 
        "./WeatherApp3/WeatherApp/thunder.png";

    breeze.textContent = JSON.stringify(data.query.results.channel.wind.speed).replace(/"/g,"") + "mph";
    water.textContent = 
JSON.stringify(data.query.results.channel.atmosphere.humidity).replace(/"/g,"") + "%";


    var forecasts = data.query.results.channel.item.forecast;
    var dates = document.getElementsByClassName("date");
    var weathers = document.getElementsByClassName("weather");
    var temps = document.getElementsByClassName("temp");
    var graphics = document.getElementsByClassName("image");

    for(var i = 0; i < 10; i++) {
        var f = forecasts[i];
        dates[i].textContent =
            JSON.stringify(f.date).replace(/"/g,"");
        weathers[i].textContent =
            JSON.stringify(f.text).replace(/"/g,"");
        if(weathers[i].textContent == "Sunny" || 
           weathers[i].textContent == "Mostly Sunny")
            graphics[i].src = 
            "./WeatherApp3/WeatherApp/sunny.png";
        if(weathers[i].textContent == "Partly Cloudy" || 
                weathers[i].textContent == "Partly Sunny")
            graphics[i].src = 
            "./WeatherApp3/WeatherApp/part-sun.png";
        if(weathers[i].textContent == "Mostly Cloudy" || 
                weathers[i].textContent == "Cloudy")
            graphics[i].src = 
            "./WeatherApp3/WeatherApp/cloudy.png";
        if(weathers[i].textContent == "Scattered Showers"|| 
                weathers[i].textContent == "Showers")
            graphics[i].src = 
            "./WeatherApp3/WeatherApp/rain.png";
        if(weathers[i].textContent == "Scattered \
                Thunderstorms" || weathers[i].textContent ==
                "Thunderstorms")
            graphics[i].src = 
            "./WeatherApp3/WeatherApp/thunder.png";

        temps[i].textContent =
            JSON.stringify(f.high).replace(/"/g,"") + '\xB0' + "\t" +
            JSON.stringify(f.low).replace(/"/g,"") + '\xB0' ;
    }

    today.textContent = dates[0].textContent.split(" ")[1] + " " + dates[0].textContent.split(" ")[0] + ", " + dates[0].textContent.split(" ")[2] ;
    time.textContent = JSON.stringify(now).split(" ")[4] +  " " + JSON.stringify(now).split(" ")[5];
}





