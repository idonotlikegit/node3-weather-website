const request = require("request")

const forecast = (Latitude, Longitude, CallbackFunction) =>
{
   const url =   'http://api.weatherstack.com/current?access_key=9a679e0bee6a22f6fac3f6b8cde20537&query='
               + encodeURIComponent(Latitude)
               + ','
               + encodeURIComponent(Longitude)
               + '&units=f'
//   request({url: url, json: true}, (error, response) =>
   request({url, json: true}, (error, {body} = {}) =>
      {
         if (error)
         {
            CallbackFunction('Unable to connect to website.', undefined)
         }
//         else if (response.body.error)
         else if (body.error)
         {
            CallbackFunction('Unable to find location.', undefined)
         }
         else
         {
            CallbackFunction(undefined,
               {
//                  Temp_F: response.body.current.temperature,
                  Temp_F: body.current.temperature,
//                  ChanceOfPrecip: response.body.current.precip
                  ChanceOfPrecip: body.current.precip,
                  WindSpeed: body.current.wind_speed,
                  WindAngle: body.current.wind_degree
               }
            )
         }
      }
   )
}

module.exports = forecast