//fetch('http://localhost:3000/weather?Address=boston').then((response) =>

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript with love.'
weatherForm.addEventListener('submit', (e) =>
   {
      e.preventDefault()
      const location = search.value

      messageOne.textContent = 'Loading...'
      messageTwo.textContent = ''
//      fetch('http://localhost:3000/weather?Address=' + location).then((response) =>
      fetch('/weather?Address=' + location).then((response) =>
         {
            response.json().then((data) =>
               {
                  if (data.error)
                  {
                     messageOne.textContent = 'No data was returned via data:  ' + data.error
                  }
                  else
                  {
//                     messageOne.textContent = 'Fartknocker'
                     messageOne.textContent = data.Forecast.Temp_F
                     // messageOne.textContent = data.Address
                     messageTwo.textContent = data.Forecast.ChanceOfPrecip
                  }
               }
            )
         }
      )
   }
)
