const path = require('path')
const express = require('express')
const hbs =require('hbs')
const geocode = require('./utilt/geocode')
const forecast = require('./utilt/forecast')


const app = express()

const publicDyrictryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templets/views')
const partialsPath = path.join(__dirname, '../templets/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDyrictryPath))

app.get('', (req, res) => {
    res.render('index', {
        name: 'wather app',
        create: "Ahmed Galbat"
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        name: "help me",
        create: "Ahmed Galbat"
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        name:"about me",
        create: "Ahmed Galbat"
    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.address) {
        return res.send({
            error: "you must provide an address"
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     location: "cairo",
    //     address: req.query.address,
    //     weather: 'it\'s so hot'
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('helpError', {
        name:"helpError",
        create: "Ahmed Galbat",
        errorMassage: 'Help article is not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        name: '404',
        create: "Ahmed Galbat",
        errorMassage:"Error 404 (page not found)"
    })
})




//listening port
app.listen(3000, () => {
    console.log("server is up on port 3000")
})