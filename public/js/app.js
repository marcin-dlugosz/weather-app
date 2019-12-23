const loader = document.querySelector('#loader')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'Your weather forecast here'

const getWeather = (address) => {
    const forecastURL = `http://localhost:3000/weather?address=${address}`
    return fetch(forecastURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageOne.className = 'error'

            } else {

                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        }).then(()=> {
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
    messageOne.className = ''
    getWeather(searchVal)
    messageOne.textContent = ''
    messageTwo.textContent= ''
    if (searchVal){
    loader.className = 'spinner'
    }
    search.value = ''
})


