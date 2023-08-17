import { React } from "react";

function SearchBlock( { cityName, setCityName, getWeather } ) {
    return (
        <div className="w-full mt-6 flex justify-between space-x-2 md:space-x-4">
            <input 
                className="w-auto h-10 sm:h-12 sm:text-lg flex-auto bg-stone-100 rounded-lg px-4 focus:outline-none focus:ring-1 focus:ring-slate-300 transition duration-100 ease-linear" 
                type="text" 
                placeholder="Search"
                value={ cityName }
                onChange={ e => setCityName( e.target.value ) } ></input>

            <button 
                className="w-auto h-10 sm:h-12 px-5 py-2 text-base sm:text-lg text-white font-medium hover:bg-gray-700 bg-gray-800 rounded-lg"
                onClick={ getWeather }>
                Search
            </button>
        </div>
    );
}

export default SearchBlock;