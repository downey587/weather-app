import React, { useState, useEffect } from "react";
import SearchBlock from './searchBlock';
import WeatherBlock from "./weatherBlock";

function MainBlock() {
    const apiKey = "76e5c883d6a73c54148b1b9a36fe1981";
    const apiLink = "https://api.openweathermap.org/data/2.5/forecast?"; // https://api.openweathermap.org/data/2.5/weather?

    const [ weatherData, setWeatherData ] = useState( " " );

    const [ lat, setLat ] = useState( " " );
    const [ lon, setLon ] = useState( " " );

    const [ cityName, setCityName ] = useState( "" );

    useEffect( () => {
        async function getCoordinates() {
            try {
                const response = await fetch( 
                    `http://api.openweathermap.org/geo/1.0/direct?q=${ cityName }&limit=5&appid=${ apiKey }`
                );
                
                if ( !response.ok ) {
                    throw new Error( ` HTTP error: ${ response.status } ` );
                }
        
                const data = await response.json();
    
                setLat( data[0].lat );
                setLon( data[0].lon );
            } catch( error ) {
                setWeatherData( `Error: ${ error }` );
            }
        }

        getCoordinates();
    }, [ cityName, weatherData ] );

    async function getWeather() {
        try {
            const response = await fetch( 
                `${ apiLink }lat=${ lat }&lon=${ lon }&appid=${ apiKey }`
            );

            if ( !response.ok ) {
                throw new Error( ` HTTP error: ${ response.status } ` );
            }

            const data = await response.json();

            setWeatherData( data );
            console.log( data );
            console.log( data.list[0].main.temp );
        } catch( error ) {
            setWeatherData( ` Error: ${ error } ` );
        }
    }

    return (
        <div className='px-5 py-5'>
            <h1 className="text-3xl"> Weather </h1>

            <SearchBlock cityName={ cityName } setCityName={ setCityName } getWeather={ getWeather } />
            
            <h1 className="text-xl font-medium mt-5 ml-1"> { typeof weatherData !== "string" ? `${ weatherData.city.name }, ` : " " } { typeof weatherData !== "string" ? weatherData.city.country : " " } </h1>

            <WeatherBlock weatherData={ weatherData } />
        </div>
    );
}

export default MainBlock;