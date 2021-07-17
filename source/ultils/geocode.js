const request = require("request")

const geocode = (address, CallbackFunction) =>
{
   const url =   'https://api.mapbox.com/geocoding/v5/mapbox.places/'
               + encodeURIComponent(address)
               + '.json?access_token=pk.eyJ1IjoibWFjZGFkZHltYXlzIiwiYSI6ImNrb2YxMHFsbzBmMngyb2xqMjEwZThnNHAifQ.2IOQqC0_cC1auWJbHvGTxQ&limit=1'
//   request({url: URL, json: true}, (error, response) =>
   request({url, json: true}, (error, {body}) =>
      {
         if (error)
         {
            CallbackFunction('Unable to connect to website.', undefined)
         }
//         else if (response.body.features.length === 0)
         else if (body.features.length === 0)
         {
            CallbackFunction('Unable to find location.', undefined)
         }
         else
         {
            CallbackFunction(undefined,
               {
                  // latitude: response.body.features[0].center[1],
                  // longitude: response.body.features[0].center[0],
                  // location: response.body.features[0].place_name
                  latitude: body.features[0].center[1],
                  longitude: body.features[0].center[0],
                  location: body.features[0].place_name
               }
            )
         }
      }
   )
}

module.exports = geocode