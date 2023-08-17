import React, { useState, useEffect } from "react";
import SearchBlock from './searchBlock';
import WeatherBlock from "./weatherBlock";

function MainBlock() {
    const apiKey = "76e5c883d6a73c54148b1b9a36fe1981";
    const apiLink = "https://api.openweathermap.org/data/2.5/forecast?"; // https://api.openweathermap.org/data/2.5/weather?

    const [ weatherData, setWeatherData ] = useState( " " );

    const [ lat, setLat ] = useState( " " );
    const [ lon, setLon ] = useState( " " );

    const [ cityName, setCityName ] = useState( "Los Angeles" );

    useEffect( () => {
        async function getCoordinates() {
            try {
                const response = await fetch( 
                    `https://api.openweathermap.org/geo/1.0/direct?q=${ cityName }&limit=5&appid=${ apiKey }`
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
        } catch( error ) {
            setWeatherData( ` Error: ${ error } ` );
        }
    }

    return (
        <div className='px-5 py-5 md:px-14 lg:px-20 md:py-8'>
            <h1 className="text-3xl sm:text-4xl"> Weather </h1>

            <SearchBlock cityName={ cityName } setCityName={ setCityName } getWeather={ getWeather } />
            
            <h1 className="text-2xl font-medium mt-5 ml-2 sm:text-3xl"> { typeof weatherData !== "string" ? `${ weatherData.city.name }, ` : " " } { typeof weatherData !== "string" ? weatherData.city.country : " " } </h1>

            <WeatherBlock weatherData={ weatherData } />
        </div>
    );
}

export default MainBlock;