import React from 'react';

// mbox
import { useLocalStore } from 'mobx-react';

// context
import { CountryContext } from '../../context/Context';

// services
import { fetchAllCountries } from '../../services/country/CountryService';


const CountryProvider = props => {

    const CountryStore = useLocalStore(() => ({

        filterOptions: { name: '' },

        countries: [],

        // fetch countries from API
        fetch: async () => {

            const data = await fetchAllCountries();

            if (data) {                
                CountryStore.countries.push(...data);
            }
        },


        // TODO: later add multiple filter possibility
        filter: () => {
            if (CountryStore.filterOptions.name !== '') {
                return CountryStore
                        .countries
                        .filter(country => 
                                    country
                                    .name
                                    .toLowerCase()
                                    .indexOf(CountryStore.filterOptions.name.toLowerCase()) !== -1);
            } else {
                return CountryStore.countries;
            }
        }

    }));


    return (
        <CountryContext.Provider value={CountryStore}>
            {props.children}
        </CountryContext.Provider>
    );

};

export default CountryProvider;
