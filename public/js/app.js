const loader = document.querySelector('#loader')
const msgWrapper = document.querySelector('#msgWrapper')
const messageOne = document.querySelector('#message-1')

messageOne.textContent = 'Your weather forecast here'

const getWeather = (address) => {
    const forecastURL = `/weather?address=${address}`
    return fetch(forecastURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageOne.className = 'error'

            } else {
                messageOne.textContent = data.location
                data.forecast.forEach((summary) => {
                    const pElement = document.createElement('p')
                    pElement.textContent = `${summary.daily} Temperatura: ${Math.round(summary.temperature)}°C`
                    msgWrapper.appendChild(pElement)
                })
            }
        }).then(() => {
            loader.className = ''
            loader.removeAttribute('class')
        })
    })
}

// Form for fetching forecast
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchVal = search.value
    getWeather(searchVal)
    messageOne.textContent = ''
    msgWrapper.innerHTML = ''
    if (searchVal) {
        loader.className = 'spinner'
    }
    search.value = ''
})