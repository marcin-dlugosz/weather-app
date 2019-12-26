const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather 4 U',
        name: 'Marcin Dlugosz'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Marcin Dlugosz'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is a help message!',
        name: 'Marcin Dlugosz'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {
        longitude,
        latitude,
        location
    } = {}) => {


        if (error) {
           return res.send({
                error
            })

        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
               return res.send({
                    error
                })
            }
             res.send({
                 location: location,
                 forecast: forecastData,
                 address: req.query.address
             })
        })

       
    })


})

// 404 page setup
app.get('/help/*', (req, res) => {
    res.render('my404Page', {
        errorMessage: 'Help article not found!',
        title: '404',
        name: 'Marcin Dlugosz'
    })
})

app.get('*', (req, res) => {
    res.render('my404Page', {
        errorMessage: '404 error: Page not found',
        title: '404',
        name: 'Marcin Dlugosz'

    })
})

app.listen(port, () => {
    console.log('server is running')

})