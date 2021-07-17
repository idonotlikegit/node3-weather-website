const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require("request")
const geocode = require('./ultils/geocode')
const forecast = require('./ultils/forecast')
// npm init -y, npm i express@4.17.1, npm install hbs@4.1.2, npm i request@2.88.2
// nodemon src/app.js -e js,hbs
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')   // This is known to work
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => 
   {
   res.render('index', 
               {
                  title: 'This is the Weather Page!',
                  name: 'MacDaddy Mays'
               }
            )
   }
)

app.get('/about', (req, res) =>
   {
      res.render('about',
                  {
                     title: 'This is the about page',
                     name: 'MacDaddy Mays'
                  }
      )
//      res.send('<h1>This is an about page!</h1>')
   }
)

app.get('/help', (req, res) =>
   {
      res.render('help',
                  {
                     title: 'This is the HELP page',
                     name: 'MacDaddy Mays',
                     help_message: 'Call 1-800-ballast for help!'
                  }
      )
      // res.send(
      //    [
      //       {
      //          name: 'Steve Mays',
      //          Age: 48,
      //          Height: '5 10'
      //       },
      //       {
      //          name: 'Amy Mays',
      //          Age: 48,
      //          Height: '4 6'
      //       },
      //       {
      //          name: 'Stephen Mays',
      //          Age: 17,
      //          Height: '5 10'
      //       }
      //    ]
      // )
   }
)
app.get('/weather', (req, res) =>
   {
//      if (!req.query.search)   // http://localhost:3000/weather?search=home
      if (!req.query.Address) // http://localhost:3000/weather?Address=138%20silo%20hill%20road,%20madison,%20al (NOTE the case sensitivity of the search string:  Address vs address)
      {
         return res.send(
            {
               error: 'You must provide the Address of which you are requesting the weather.  NOTE the case sensitivity.'
            }
         )
      }
      else
      {
         geocode(req.query.Address, (error, {latitude, longitude, location} = {}) =>
                  {
                     if (error)   
                     {
                        return (console.log(error))
                     }
                     forecast(latitude, longitude, (error, ForecastData) =>
                                 {
                                    if (error)   
                                    {
                                       return (console.log(error))
                                    }
                                    res.send(
                                       {
                                          Forecast: ForecastData,
                                          Location: ForecastData.location,
                                          Address: location
//                                          Address: req.query.Address
                                       }
                                    )
                                    console.log(location)
                                    console.log('Forecast Data:', ForecastData)
                                 }
                              )
                  }
               ) 
      //   res.send(
      //      {
      //         Forecast: '70 Deg F',
      //         Location: 'Here at the house.',
      //         Address: req.query.Address
      //      }
      //   )
      }
   }
)

app.get('/products', (req, res) =>
   { // http://localhost:3000/products?search=games&rating=5
      if (!req.query.search)
      {
         return res.send(
            {
               error: 'You must provide a search term!'
            }
         )
      }
      else
      {
//      console.log(req.query)
         res.send(
            {
               products: []
            }
         )
      }
   }
)

app.get('/help/*', (req, res) =>
   {
      res.render('404', 
                  {
                     title: '404',
                     name: 'MacDaddy Mays',
                     error_message: 'Help article not found.'
                  }
               )
   }
)

app.get('*', (req, res) =>
   {
      res.render('404', 
                  {
                     title: '404',
                     name: 'MacDaddy Mays',
                     error_message: 'Page not found.'
                  }
                )
   }
)
app.listen(3000, () =>
   {
      console.log('Server is up and listening on port 3000')      
   }
)
//console.log(__dirname)
//const PathOfHTML_Files = Path.join(__dirname, '\public')  // This does not appear to work
