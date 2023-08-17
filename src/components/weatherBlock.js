import { React, useEffect, useState } from "react";
import WeatherDayBlock from "./weatherInfoBlock";

function WeatherBlock( { weatherData } ) {
    const [ weatherCont, setWeatherCont ] = useState( " " );

    useEffect( ( ) => {
        if ( typeof weatherData !== "string" ) {
            const weatherContData = weatherData.list.map( item => {
                return {
                    "id": weatherData.list.indexOf( item ),
                    "temp": Math.floor( ( ( ( item.main.temp - 273.15 ) * 9 ) / 5 ) + 32 ),
                    "feels_like": Math.floor( ( ( ( item.main.feels_like - 273.15 ) * 9 ) / 5 ) + 32 ),
                    "wind": Math.floor( item.wind.speed * 2.237 ),
                    "clouds": item.clouds.all,
                    "pressure": item.main.pressure,
                    "desc": item.weather["0"].main,
                    "date": item.dt_txt,
                }    
            } );

            setWeatherCont( weatherContData );

        } else {
            setWeatherCont( " " );
        }
    }, [ weatherData ] );

    function renderDaysForecast( days ) {        
        const daysWeatherArr = [  ];

        weatherCont.map( item => { 
            if ( item.date.includes( "00:00:00" ) && daysWeatherArr.length < days ) {
                daysWeatherArr.push( item );
            } 

            return daysWeatherArr;
        } );

        const content =  daysWeatherArr.map( item => 
            <li key={ item.id } className="list-none">
                <WeatherDayBlock temp={ item.temp } feelsLike={ item.feels_like } wind={ item.wind } clouds={ item.clouds } pressure={ item.pressure } desc={ item.desc } date={ item.date } />    
            </li>
        );

        return content;
    }

    return (
        <div className="w-full h-auto mt-6">
            <div>
                { 
                    typeof weatherCont !== "object" ? 

                    " " : 

                    <div>
                        <div>
                            <h1 className="text-lg ml-1 font-medium mb-3 sm:text-2xl sm:mb-5 sm:ml-2"> Current Weather </h1>
                            
                            <WeatherDayBlock temp={ weatherCont[0].temp } feelsLike={ weatherCont[0].feels_like } wind={ weatherCont[0].wind } clouds={ weatherCont[0].clouds } pressure={ weatherCont[0].pressure } desc={ weatherCont[0].desc } date={ weatherCont[0].date } />
                        </div>

                       <div className="mt-12">
                            <h1 className="text-lg ml-1 font-medium mb-3 sm:text-2xl sm:mb-5 sm:ml-2"> Next 9 hours forecast </h1>
                            
                            <div className="grid grid-flow-col grid-cols-1 grid-rows-3 gap-6 sm:gap-8 md:grid-cols-2 md:grid-rows-2 md:gap-4 xl:grid-cols-3 xl:grid-rows-1">
                                <WeatherDayBlock temp={ weatherCont[1].temp } feelsLike={ weatherCont[1].feels_like } wind={ weatherCont[1].wind } clouds={ weatherCont[1].clouds } pressure={ weatherCont[1].pressure } desc={ weatherCont[1].desc } date={ weatherCont[1].date } />
                                <WeatherDayBlock temp={ weatherCont[2].temp } feelsLike={ weatherCont[2].feels_like } wind={ weatherCont[2].wind } clouds={ weatherCont[2].clouds } pressure={ weatherCont[2].pressure } desc={ weatherCont[2].desc } date={ weatherCont[2].date } />
                                <WeatherDayBlock temp={ weatherCont[3].temp } feelsLike={ weatherCont[3].feels_like } wind={ weatherCont[3].wind } clouds={ weatherCont[3].clouds } pressure={ weatherCont[3].pressure } desc={ weatherCont[3].desc } date={ weatherCont[3].date } />
                            </div>
                        </div>

                        <div className="mt-12">
                            <h1 className="text-lg ml-1 font-medium mb-3 sm:text-2xl sm:mb-5 sm:ml-2"> Next 3 days forecast </h1>

                            <div className="grid grid-flow-col grid-cols-1 grid-rows-3 gap-6 sm:gap-8 md:grid-cols-2 md:grid-rows-2 md:gap-4 xl:grid-cols-3 xl:grid-rows-1">
                                { renderDaysForecast( 3 ) }
                            </div>
                        </div>

                        <div className="mt-12">
                            <h1 className="text-lg ml-1 font-medium mb-3 sm:text-2xl sm:mb-5 sm:ml-2"> Next 5 days forecast </h1>

                            <div className="grid grid-flow-col grid-cols-1 grid-rows-5 gap-6 md:grid-cols-2 md:grid-rows-3 md:gap-5 xl:grid-cols-3 xl:grid-rows-2">
                                { renderDaysForecast( 5 ) }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default WeatherBlock;