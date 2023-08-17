import { React, useEffect, useState } from "react";
import sunnyImg from "../assets/sunny.png";
import cloudyImg from "../assets/cloudy.png";
import rainyImg from "../assets/rainy.png";

function WeatherDayBlock( { temp, feelsLike, wind, clouds, pressure, desc, date } ) {
    const [ weatherImg, setWeatherImg ] = useState( " " );
    const [ bgColor, setBgColor ] = useState( " " );

    const [ dateCont, setDateCont ] = useState( " " );

    let style = `w-auto h-auto py-5 ${ bgColor } rounded-3xl sm:py-7`;

    useEffect( ( ) => {
        if ( desc === "Clear" ) {
            setWeatherImg( sunnyImg );
            setBgColor( "bg-yellow-50" );
        } else if ( desc === "Clouds" ) {
            setWeatherImg( cloudyImg );
            setBgColor( "bg-gray-100" );
        } else if ( desc === "Rain" ) {
            setWeatherImg( rainyImg );
            setBgColor( "bg-slate-200" );
        }

        setDateCont( 
            date.replace( "2023-", "" ).replace( "-", "/" )
        );

        function formatDate() {
            if ( date[11] !== "0" ) {
                setDateCont( 
                    ` ${ date.replace( "2023-", "" ).replace( "-", "/" ).replace( ":00", "" ) } PM `
                );
            } else if ( date[11] === "0" ) {
                setDateCont( 
                    ` ${ date.replace( "2023-", "" ).replace( "-", "/" ).replace( ":00", "" ) } AM `
                );
            } 
            
            if ( date[12] === "5" ) {
                setDateCont( 
                    ` ${ date.replace( "2023-", "" ).replace( "-", "/" ).replace( "15", "3" ).replace( ":00", "" ) } PM `
                );
            } else if ( date[12] === "8" ) {
                setDateCont( 
                    ` ${ date.replace( "2023-", "" ).replace( "-", "/" ).replace( "18", "6" ).replace( ":00", "" ) } PM `
                );
            } else if ( date[12] === "1" ) {
                setDateCont( 
                    ` ${ date.replace( "2023-", "" ).replace( "-", "/" ).replace( "21", "9" ).replace( ":00", "" ) } PM `
                );
            }
        }
    
        formatDate();
    }, [ weatherImg, desc, date, dateCont ] );

    return (
        <div className={ style }>
            <div className="flex space-x-3 items-center sm:space-x-8 md:space-x-0">
                <div>
                    <div className="pl-3 pr-4 flex items-center space-x-4 sm:pl-16 md:pl-2 md:flex-col">
                        <img src={ weatherImg } alt="weather img." className="w-auto h-auto"></img>
                        <h1 className="text-3xl sm:text-5xl md:text-4xl md:mt-2"> { temp } °F </h1>
                    </div>

                    <h1 className="text-2xl font-medium mt-2 px-4 sm:text-4xl sm:font-normal sm:px-16 sm:mt-3 md:px-9 md:text-3xl"> { desc } </h1>
                </div>

                <div className="px-4 pt-2 sm:space-y-1">
                    <p className="text-xl font-medium mb-3 sm:text-3xl md:text-2xl"> RealFeel { feelsLike } °F </p>
                    <p className="sm:text-xl"> <span className="font-medium"> Wind: </span> { wind } mph </p>
                    <p className="sm:text-xl"> <span className="font-medium"> Pressure: </span> { pressure } hPa </p>
                    <p className="sm:text-xl"> <span className="font-medium"> Cloud Cover: </span> { clouds }% </p>

                    <h1 className="pt-3 sm:pt-5 font-medium text-slate-800 sm:text-lg"> { dateCont } </h1>
                </div>
            </div>
        </div>
    );
}

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

    function renderThreeDaysForecast( days ) {        
        const threeDaysWeatherArr = [  ];

        weatherCont.map( item => { 
            if ( item.date.includes( "00:00:00" ) && threeDaysWeatherArr.length < days ) {
                threeDaysWeatherArr.push( item );
            } 

            return threeDaysWeatherArr;
        } );

        const content =  threeDaysWeatherArr.map( item => 
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
                                { renderThreeDaysForecast( 3 ) }
                            </div>
                        </div>

                        <div className="mt-12">
                            <h1 className="text-lg ml-1 font-medium mb-3 sm:text-2xl sm:mb-5 sm:ml-2"> Next 5 days forecast </h1>

                            <div className="grid grid-flow-col grid-cols-1 grid-rows-5 gap-6 md:grid-cols-2 md:grid-rows-3 md:gap-5 xl:grid-cols-3 xl:grid-rows-2">
                                { renderThreeDaysForecast( 5 ) }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default WeatherBlock;