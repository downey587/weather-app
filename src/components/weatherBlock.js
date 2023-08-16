import { React, useEffect, useState } from "react";
import sunnyImg from "../assets/sunny.png";
import cloudyImg from "../assets/cloudy.png";
import rainyImg from "../assets/rainy.png";

function WeatherDayBlock( { temp, feelsLike, wind, clouds, pressure, desc, date } ) {
    const [ weatherImg, setWeatherImg ] = useState( " " );

    useEffect( ( ) => {
        if ( clouds < 40 ) {
            setWeatherImg( sunnyImg );
        } else if ( 40 < clouds < 70 ) {
            setWeatherImg( cloudyImg );
        } else if ( clouds > 70 ) {
            setWeatherImg( rainyImg );
        }
    }, [ weatherImg ] );

    return (
        <div className="w-auto h-auto py-5 bg-slate-50 rounded-xl">
            <div className="flex space-x-3 items-center">
                <div>
                    <div className="pl-3 pr-4 flex items-center space-x-4">
                        <img src={ weatherImg } alt="weather img." className="w-auto h-auto"></img>
                        <h1 className="text-3xl"> { temp } °F </h1>
                    </div>

                    <h1 className="text-2xl font-medium mt-2 px-4"> { desc } </h1>
                </div>

                <div className="px-4 pt-2">
                    <p className="text-xl font-medium mb-3"> RealFeel { feelsLike } °F </p>
                    <p> <span className="font-medium"> Wind: </span> { wind } mph </p>
                    <p> <span className="font-medium"> Pressure: </span> { pressure } hPa </p>
                    <p> <span className="font-medium"> Cloud Cover: </span> { clouds }% </p>
                </div>
            </div>

            <h1 className="px-4 text-slate-400"> { date } </h1>
        </div>
    );
}

function WeatherBlock( { weatherData } ) {
    const [ weatherCont, setWeatherCont ] = useState( " " );

    useEffect( ( ) => {
        if ( typeof weatherData !== "string" ) {
            setWeatherCont( 
                [   
                    {
                        "temp": Math.floor( ( ( ( weatherData.list[0].main.temp - 273.15 ) * 9 ) / 5 ) + 32 ),
                        "feels_like": Math.floor( ( ( ( weatherData.list[0].main.feels_like - 273.15 ) * 9 ) / 5 ) + 32 ),
                        "wind": Math.floor( weatherData.list[0].wind.speed * 2.237 ),
                        "clouds": weatherData.list[0].clouds.all,
                        "pressure": weatherData.list[0].main.pressure,
                        "desc": weatherData.list[0].weather["0"].main,
                        "date": weatherData.list[0].dt_txt,
                    },

                    {
                        "temp": Math.floor( ( ( ( weatherData.list[1].main.temp - 273.15 ) * 9 ) / 5 ) + 32 ),
                        "feels_like": Math.floor( ( ( ( weatherData.list[1].main.feels_like - 273.15 ) * 9 ) / 5 ) + 32  ),
                        "wind": Math.floor( weatherData.list[1].wind.speed * 2.237 ),
                        "clouds": weatherData.list[1].clouds.all,
                        "pressure": weatherData.list[1].main.pressure,
                        "desc": weatherData.list[1].weather["0"].main,
                        "date": weatherData.list[1].dt_txt,
                    },

                    {
                        "temp": Math.floor( ( ( ( weatherData.list[2].main.temp - 273.15 ) * 9 ) / 5 ) + 32 ),
                        "feels_like": Math.floor( ( ( ( weatherData.list[2].main.feels_like - 273.15 ) * 9 ) / 5 ) + 32  ),
                        "wind": Math.floor( weatherData.list[2].wind.speed * 2.237 ),
                        "clouds": weatherData.list[2].clouds.all,
                        "pressure": weatherData.list[2].main.pressure,
                        "desc": weatherData.list[2].weather["0"].main,
                        "date": weatherData.list[2].dt_txt,
                    }
                ]
            );

        } else {
            setWeatherCont( " " );
        }
    }, [ weatherData ] );

    return (
        <div className="w-full h-auto mt-5">
            <div className="grid grid-flow-col grid-cols-1 grid-rows-2 gap-4">
                <WeatherDayBlock temp={ weatherCont[0].temp } feelsLike={ weatherCont[0].feels_like } wind={ weatherCont[0].wind } clouds={ weatherCont[0].clouds } pressure={ weatherCont[0].pressure } desc={ weatherCont[0].desc } date={ weatherCont[0].date } />
            </div>
        </div>
    );
}

export default WeatherBlock;