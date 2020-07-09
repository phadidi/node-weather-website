const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const weatherGeocode = document.querySelector('#weather-geocode')
const weatherForecast = document.querySelector('#weather-forecast')

weatherGeocode.textContent = ''
weatherForecast.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    weatherGeocode.textContent = 'Loading results...'
    weatherForecast.textContent = ''
    fetch('/weather?address=' + address.value).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            weatherGeocode.textContent = data.error
        } else {
            weatherGeocode.textContent = data.location
            weatherForecast.textContent = 'The current temperature is ' + data.forecast.current + ' degrees Farenheit. It feels like ' + data.forecast.feelslike + ' degrees Farenheit. There is a ' + data.forecast.precip + ' percent chance of rain.'
        }
    })
})
})