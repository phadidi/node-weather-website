const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3999

// Paths for Express cpmfog
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handlesbars engine setup and views location path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Here\'s the weather',
        name: 'Parsa Hadidi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Who are we?',
        name: 'Parsa Hadidi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Contact Help',
        title: 'Help',
        name: 'Parsa Hadidi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address to identify the weather.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error)
            return res.send({ error })
        forecast(latitude, longitude, (error, forecastData) => {
            if (error)
                return res.send({ error })
            return res.send({
                forecast: forecastData, 
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'Please provide a search term'
        })
    } else {
        res.send({
            products: ['The Manual', 'French Hand Saw ', 'Multi-Tool', 'Satchel']

        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'ERROR 404',
        name: 'Parsa Hadidi',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => { // This check uses a wild card character to occur for every other page once the above checks are exhausted
    res.render('404', {
        title: 'ERROR 404',
        name: 'Parsa Hadidi',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})