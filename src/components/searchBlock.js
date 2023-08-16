import { React } from "react";

function SearchBlock( { cityName, setCityName, getWeather } ) {
    return (
        <div className="w-full mt-6 flex justify-between space-x-2">
            <input 
                className="w-auto h-10 flex-auto bg-stone-100 rounded-md px-4 focus:outline-none focus:ring-1 focus:ring-slate-300 transition duration-100 ease-linear" 
                type="text" 
                placeholder="Search"
                value={ cityName }
                onChange={ e => setCityName( e.target.value ) } ></input>

            <button 
                className="w-auto h-10 px-5 py-2 text-base text-white font-medium hover:bg-gray-700 bg-gray-800 rounded-md"
                onClick={ getWeather }>
                Search
            </button>
        </div>
    );
}

export default SearchBlock;