// Your code here
const weatherDiv = document.getElementById('weather')
const form = document.querySelector('form')
const userInput = document.getElementById('weather-search')
//Await and fetch
form.onsubmit = async function(e) {
    e.preventDefault()
    try {
    const locationName = this.search.value.trim()
    if (!locationName) return
    userInput.value = ''
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=imperial&APPID=70e77c9d7cf93a8a29161c4bf87d7c45`)
    const weatherData = await res.json()
    renderWeather(weatherData)
} catch(err) {
    const error = document.createElement('h2')
    weatherDiv.appendChild(error)
    error.textContent = "Location Not Found"
    }
}
//Destructure name
const renderWeather = ({
    sys: {
        country
    },
    name,
    dt,
    coord: {
        lat,
        lon
    },
    main: {
        temp,
        feels_like
    },
    weather: [{
        icon,
        description
    },
]
}) => {
    //Time var
    const day = new Date(dt * 1000)
    const time = day.toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit'
    })
    //Capitalize description
    var firstLetter = description.charAt(0)
    var firstLetterCap = firstLetter.toUpperCase()
    var remainingLetters = description.slice(1)
    var condition = firstLetterCap + remainingLetters
    //Display weather
    weatherDiv.innerHTML = 
    `<h2>${name}, ${country}</h2>
    <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_BLANK">Click to view map</a>
    <img src = "https://openweathermap.org/img/wn/${icon}@2x.png">
    <p>${condition}</p>
    <p>Current: ${temp} °F</p>
    <p>Feels Like: ${feels_like} °F</p>
    <p>Last updated: ${time}</p>`
}