import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect,useState } from 'react';
import axios from 'axios';

function App() {
  let locKey,locName,temp;
  const apiKey="roYNvMRnI40DTAXQ3L7TlxZjqZpjuVNM";
  const[data1,setDataName]=useState();
  const[data2,setDataTemp]=useState();
  const[inputCity,setInputCity]=useState("")
  const getWeatherDetails=(cityName)=>{
    if(!cityName) return;
    //fetching the location key
    const apiLocURL="http://dataservice.accuweather.com/locations/v1/cities/search?apikey="+ apiKey +"&q="+cityName
    
        axios.get(apiLocURL).then((res)=>{
        setDataName(res.data[0].LocalizedName);
        locKey=res.data[0].Key;
        locName=res.data[0].LocalizedName;
        console.log("Location key response",locKey)
        console.log("Location key response",locName)
        const apiURL="http://dataservice.accuweather.com/currentconditions/v1/"+locKey+"?apikey="+ apiKey

        axios.get(apiURL).then((res)=>{
          setDataTemp(res.data[0].Temperature.Metric.Value);
          temp=res.data[0].Temperature.Metric.Value;
          console.log("temp details",temp);
          setDataTemp(temp);
        });

      }).catch((err)=>{
        console.log("err",err);
      })

  }

  const handleChangeInput=(e)=>{
    setInputCity(e.target.value);
  }
  
  const handleSearch=()=>{
    getWeatherDetails(inputCity);
  }

  return (
    <div className='col-md-12'>
      <div className="weatherBg">
        <h1 className="heading">Weather App</h1>

        <div className='d-grid gap-3 col-4 mt-4'>
        <input type="text" className='form-control' value={inputCity} onChange={handleChangeInput}/>
        <button className='btn btn-primary' type='button' onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className='col-md-12 text-center mt-5'>
        <div className='shadow rounded weatherResultBox'></div>
        <img className='weathericon'
        src='https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png'/>
        <h5 className='weatherCity'>{data1}</h5>
        <h6 className='waetherTemp'>{data2}°C</h6>
      </div>
    </div>

  );
}

export default App;
