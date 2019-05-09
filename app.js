// Super Easy API

const request = require('request')

const weatherURL = 'https://api.darksky.net/forecast/dae3df5d7fb6776c1e30ae6b587c68cd/37.8267, -112'

//Weather API

request({ url: weatherURL, json: true }, (error, response) => {
  if (error) {
    // No Internet Error
    console.log('Unable to connect to weather service...')
    // User Input Errors
  } else if (response.body.error) {
    console.log('Unable to find location...')
  } else {
    console.log(`${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out.  There is a ${response.body.currently.precipProbability}% chance of rain.`)
  }
})

// Geocoding API

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Providence.json?access_token=pk.eyJ1IjoibWF0dGJyczUxIiwiYSI6ImNqdmV3MnRpNjA1dmM0M3RoNjlxOGxrN3cifQ.LKE5OBgak78IpuOaqGgqeQ'
request({ url: geocodeURL, json: true }, (err, res) => {
  if (err) {
    // No Internet Error
    console.log('Unable to connect to location services...')
    // User Input Errors
  } else if (res.body.features.length === 0) {
    console.log('Unable to find location. Try another search.')

  } else {
    const lat = res.body.features[0].center[1]
    const lon = res.body.features[0].center[0]

    console.log(`${lat} ${lon}`)
  }
})




const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWF0dGJyczUxIiwiYSI6ImNqdmV3MnRpNjA1dmM0M3RoNjlxOGxrN3cifQ.LKE5OBgak78IpuOaqGgqeQ'

  request({url: url, json: true}, (error, res) => {
    if (error) {
      callback('Unable to connect to location services.', undefined)
    } else if (res.body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      callback(undefined, {
        latitude: res.body.features[0].center[0],
        longitude: res.body.features[0].center[1],
        location: res.body.features[0].place_name
      })
    }

  })
  }

geocode('Boston', (error, data) => {
  if (error) {
    console.log('Error', error)
  } else {
    console.log('Data', data)
  }
})