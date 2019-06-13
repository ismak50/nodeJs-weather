const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const port = process.env.PORT || 3001

app.set('views',path.join(__dirname, '../public/templates/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname,'../public/templates/partials'));
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather App", 
        h1: "Quel titre !"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help", 
        h1: "Help !"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About", 
        h1: "About !"
    });
});

app.get('/weather', (req, res) => {
    console.log(req.query.address);
    
    // if (!address) {
    //     return res.send({
    //         error: 'No address provided.'
    //     })
    // }
    geocode(req.query.address, (error,{longitude, latitude, placeName} = {}) => {
        if(error) {
            return res.send({error});
        } else {
            forecast(longitude, latitude, (error, ForecastData) => {
                res.send({placeName, ForecastData});
            });
        }
    });
});


app.listen(port, () => {
    console.log('Server is up on port ' + port);
});