import React, { Component } from 'react';
import { Card, Header } from 'semantic-ui-react';
import CountryModal from './countriesModal';

class CountriesList extends Component {

    constructor(props){
        super(props);
        this.state = {
            countries: []
        }
    }

    async componentWillMount(){
        await fetch('https://restcountries.eu/rest/v2/all',
            {method: 'GET'}
        ).then((response) => response.json())
        .then((data) => {
            this.setState({countries: data})
        });
    }

    renderCountries(){
        return this.state.countries.map((country, index) => {
            return(
                <Card 
                    key={index}
                    image={country.flag}
                    header={country.name}
                    extra = {<CountryModal country={country} />}
                />    
            )
        });
    }

    render(){
        return(
            <div>
                <Header>List of countries!!</Header>
                { this.renderCountries() }
            </div>
        )
    }
}

export default CountriesList;