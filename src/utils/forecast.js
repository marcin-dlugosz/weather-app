const rpn = require('request-promise-native')
const forecast = (longitude, latitude) => {
    const url = 'https://api.darksky.net/forecast/345dbc83571d0e6a0cc9cb432aa8c46f/' + latitude + ',' + longitude + '?lang=pl&units=si'
    return rpn(url).then((response) => {
        return JSON.parse(response)
    }).then((body) => {
        return Promise.all(body.daily.data.map(dailyWeather => {
            return {
                time: dailyWeather.time,
                daily: dailyWeather.summary,
                temperature: dailyWeather.temperatureHigh
            }
        }))
    })
}

module.exports = forecast