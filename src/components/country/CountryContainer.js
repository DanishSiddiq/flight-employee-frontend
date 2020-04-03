import React, { useEffect, useState } from "react";

// custom components
import Search from './Search';
import CountriesList from './CountriesList';

// services
import { fetchAllCountries } from '../../services/country/CountryService';

// style
import '../../style/custom.css';

const CountryContainer = () => {

    const [lstCountries, setLstCountries]               = useState([]);
    const [lstSearchCountries, setLstSearchCountries]   = useState([]);
    const [inputs, setInputs]                           = useState({ txtSearch: '' });

    /**
     * fetching all countries from service
     */
    const fetchCountries = () => {
        fetchAllCountries().then( data => {
            setLstCountries(data);
            setLstSearchCountries(data);
        });
    };

    /**
     * handling search button event
     * @param {*} event 
     */
    const handleSearchCountries = (event) => {
        const txt = inputs.txtSearch.trim().toLowerCase(); 
        if (txt !== '') {
            setLstSearchCountries( lstCountries.filter(country => country.name.toLowerCase().indexOf(txt) !== -1) );
        }
    }

    /**
     * handling reset search
     * @param {*} event 
     */
    const handleResetCountries = (event) => {
        setInputs({ txtSearch: '' });
        setLstSearchCountries(lstCountries);
    }

    /**
     * all input texts dynamic binding
     * @param {*} event 
     */
    const handleOnChange = (event) => {
        const newValue  = event.target.value;
        const inputName = event.target.name;

        setInputs((prevState)=> {
          return(
              {
                ...prevState,
                [inputName]: newValue
            }
          );
        });
    }


    useEffect(fetchCountries, []);

    return (
        <div>
            <Search txtSearch={inputs.txtSearch} 
                    handleOnChange={handleOnChange}
                    handleSearchCountries={handleSearchCountries}
                    handleResetCountries={handleResetCountries} />
            <CountriesList countries={lstSearchCountries}/>
        </div>
    )
};

export default CountryContainer;
