import React, { useState, useEffect } from "react";
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

export default WeatherDayBlock;