import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const d = new Date();
let day = d.getDay();
console.log(d);
let dayName;
let shortDayName;
let weather = null;

switch (day) {
    case 0: dayName = "Sunday";
        shortDayName = "Sun";
        break;
    case 1: dayName = "Monday";
        shortDayName = "Mon";
        break;
    case 2: dayName = "Tuesday";
        shortDayName = "Tue";
        break;
    case 3: dayName = "Wednesday";
        shortDayName = "Wed";
        break;
    case 4: dayName = "Thursday";
        shortDayName = "Thu";
        break;
    case 5: dayName = "Friday";
        shortDayName = "Fri";
        break;
    case 6: dayName = "Saturday";
        shortDayName = "Sat";
        break;
}


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {

    try {
        const currentLocation = await axios.get("http://ip-api.com/json");
        let city = currentLocation.data.city;
        weather = await axios.get("http://api.weatherapi.com/v1/current.json?q=" + city,
            {
                headers: {
                    "key": "7f9a6420885043528ef223926241806"
                }
            });
        console.log(weather.data);
        res.render("index.ejs", {
            weather: weather.data.current.condition.text,
            wind: weather.data.current.wind_kph,
            country: weather.data.location.country,
            city: city,
            temperature: weather.data.current.temp_c,
            dayName: dayName,
            shortDayName: shortDayName,
            dayDate: d.getDate(),
            icon: weather.data.current.condition.icon,
            humidity: weather.data.current.humidity,
            precipitation: weather.data.current.precip_mm,

        })
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.post("/location", async (req, res) => {
    let city = req.body.city;
    try {
        weather = await axios.get("http://api.weatherapi.com/v1/current.json?q=" + city,
            {
                headers: {
                    "key": "7f9a6420885043528ef223926241806"
                }
            });
        console.log(weather.data);
        res.render("index.ejs", {
            weather: weather.data.current.condition.text,
            wind: weather.data.current.wind_kph,
            country: weather.data.location.country,
            city: city,
            temperature: weather.data.current.temp_c,
            dayName: dayName,
            shortDayName: shortDayName,
            dayDate: d.getDate(),
            icon: weather.data.current.condition.icon,
            humidity: weather.data.current.humidity,
            precipitation: weather.data.current.precip_mm,

        })
    } catch (error) {
        res.status(404).send(error.message);
    }

});

app.listen(port, (req, res) => {
    console.log("server is listening in port " + port);
});