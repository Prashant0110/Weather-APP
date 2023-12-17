const api='1e773bbc4a2cebc1067bc4542a2bde32'

const weatherDataEl=document.getElementById('Weather-data');
const cityInputEl=document.getElementById('city-input');

const formEl=document.querySelector('form');

formEl.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const city=cityInputEl.value;
    console.log(city);
    getWeatherData(city);
    
})

async function getWeatherData(city)
{
    try
    {
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`)
        

        if(!response.ok)
        {
            throw new Error('Response failed!!');
        }

        const data=await response.json();
        console.log(data);
        const temperature=Math.round(data.main.temp);
        const description=data.weather[0].description;
        const icon=data.weather[0].icon;


        const details=
        [
        `feels like: ${Math.round(data.main.feels_like)}°C`,
        `Humidity: ${data.main.humidity}%`,
        `Wind Speed: ${data.wind.speed}m/s`,
        ]

        weatherDataEl.querySelector('.icon').innerHTML= `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`
        weatherDataEl.querySelector('.temperature').textContent=`${temperature}°C`;
        weatherDataEl.querySelector('.description').textContent=description;

        weatherDataEl.querySelector('.details').innerHTML=details.map(detail=>{
            return `<div>${detail}</div>`
        })

    }

    catch(error)
    {
        weatherDataEl.querySelector('.description').textContent='Invalid Request,Please check your Spelling and try again!';
        weatherDataEl.querySelector('.icon').innerHTML= ''
        weatherDataEl.querySelector('.temperature').textContent=''

        weatherDataEl.querySelector('.details').innerHTML=''
        
    }
}

