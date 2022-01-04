const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000  // for heroku

const pubDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// for static templates - use index.html
// for dynamic templates - handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(pubDirPath));

// dynamic content always keep under views directory
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Created By Sanmit Mandal',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Created By Sanmit Mandal',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Section',
    msg: 'This section allows users to get help from the service provider in case of faults.',
    name: 'Created By Sanmit Mandal',
  });
});

app.get('/weather', (req, res) => {
  // console.log(req.query.address)
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must enter a location to fetch its weather information.',
    });
  } else {
    // what does = {} do ? -> basically default paramters for the lat,long and location if no args are passed
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (!error) {
        forecast(longitude, latitude, (error, forecastData) => {
          if (error == undefined) {


            res.send({
              forecast: forecastData.weather_desc,
              location,
              temperature: forecastData.temperature,
              address: req.query.address,
            });
          
          } else {
            return res.send({
              error: error,
            });
          }
        });
      } else {
        return res.send({
          error: error,
        });
      }
    });
  }
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    // return is needed to return only 1 response
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Sanmit Mandal',
    errorMessage: 'Page Not Found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Sanmit Mandal',
    errorMessage: 'Page Not Found.',
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
