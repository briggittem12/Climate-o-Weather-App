import { useEffect, useState } from 'react'
import './App.css'
import TemplateWeather from './components/TemplateWeather'

function App() {
  
    const [location, setLocation] = useState()

    useEffect(() => {
      const success = pos => {
       
          const latlon = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          }
          setLocation(latlon)
        }
    
      navigator.geolocation.getCurrentPosition(success)
    }, [])

  console.log(location)

    
  return (
    <div className="App">
      <TemplateWeather lat={location?.lat} lon={location?.lon} /> 

    </div>
  )
}

export default App
