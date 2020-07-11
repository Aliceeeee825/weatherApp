const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define paths for express config
const publicDirectorPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views")
const partialPath= path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectorPath));

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Alice'
    })
})

app.get('/about', (req,res)=>{
    res.render("about", {
        title: "About",
        name: "Alice",
    });
})

app.get('/help', (req, res)=>{
    res.render("help", {
        title: "Help page",
        description: "Lorem Ipsum",
        name: "Alice",
    });
})

app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, { temperature, feelslike, forecast }) => {
            if (error) {
            return res.send({error});
            }
            res.send({
                location:location,
                temperature,
                feelslike,
                forecast
            })
        });
    });
})

app.get('/products', (req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render("404",{
        title:'404 Help',
        message: 'Help article not found',
        name: "Alice",
    })
})

app.get('*', (req,res)=>{
    res.render("404",{
        title:'404',
        message: 'Page not found',
        name: "Alice",
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})