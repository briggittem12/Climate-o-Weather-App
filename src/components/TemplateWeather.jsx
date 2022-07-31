import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ScreenWt from './ScreenWt'

const TemplateWeather = ({lat, lon}) => {

  const [climate, setClimate] = useState()
  const [temperature, setTemperature] = useState()
  const [degrees, setDegrees] = useState(true)
  const [chargingSc, setChargingSc] = useState(true)

  useEffect(() => {
    if(lat){
      let APIKey = '3febafa50d8e0a5f7eb28fc4955c4793'
      let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
      
      
      axios.get(URL)
      .then(res => {
        setClimate(res.data)
        let temp = {
          celsius: `${Math.round(res.data.main.temp -273.15)} °C`,
          farenheit: `${Math.round((res.data.main.temp -273.15) -9 / 5 + 32)} °F`
        }
        setTemperature(temp)
        setChargingSc(false)
      })
      .catch(err => console.log(err))
    }
  }, [lat, lon])


let changesClick = () => setDegrees(!degrees)

    if(chargingSc){
      return <ScreenWt/>
    } else {
  return (

    <article className='article'>
      <h1 className='title'>Weather App</h1>
        <h2 className='subtitle'>{`${climate?.name}, ${climate?.sys.country}`}</h2>
      <div className='climate__data'>
        <img src={climate && `http://openweathermap.org/img/wn/${climate?.weather[0].icon}@2x.png`} alt="" />
        <h2>{degrees ? temperature?.celsius : temperature?.farenheit}</h2>
      </div>
      <h3 className='climate__description'> &#34;{climate?.weather[0].description}&#34;</h3>
          <ul>
            <li className='climate__info'> <i className="fa-solid fa-wind icons"></i> <span>Wind Speed: </span>{climate?.wind.speed} m/s</li>
            <li className='climate__info'> <i className="fa-solid fa-cloud icons"></i> <span>Clouds: </span>{climate?.clouds.all}%</li>
            <li className='climate__info'> <i className="fa-solid fa-temperature-quarter icons"></i> <span>Pressure: </span>{climate?.main.pressure}hPA</li>
          </ul>
      <button className='climate__btn' onClick={changesClick}>{degrees ? 'Change to °F' : 'Change to °C'}</button>
    </article>     

    )
}
}

export default TemplateWeather