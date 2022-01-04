const request = require('request');

const weatherstack = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=ffab86285da69e83e71b413283f1f27d&query=' +
    latitude +
    ',' +
    longitude;
  // +
  // '&units=f';

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather services.', undefined);
    } else if (response.body.error) {
      callback('Unable to find location.', undefined);
    } else {
      const temp = response.body.current.temperature;
      const app_temp = response.body.current.feelslike;
      callback(undefined, {
        weather_desc: response.body.current.weather_descriptions[0],
        temperature: temp,
        apparent_temp: app_temp,
      });
    }
  });
};

module.exports = weatherstack;
