import React, { Component } from 'react';
import { Card, Header, Grid, Search } from 'semantic-ui-react';
import CountryModal from './countriesModal';

class CountriesList extends Component {

    constructor(props){
        super(props);
        this.state = {
            countries: [],
            isLoading: false,
            searchQuery: '',
            value:'',
            results: [],
            dream: []
        }
        this.addFavCountry = this.addFavCountry.bind(this);
    }

    async componentWillMount(){
        await fetch('https://restcountries.eu/rest/v2/all',
            {method: 'GET'}
        ).then((response) => response.json())
        .then((data) => {
            this.setState({countries: data})
        });
    }

    addFavCountry(value) {
      var intVal = this.state.dream;
      var added = intVal.concat(value);
      this.setState({dream: added});
    }

    renderCountries(){
        return this.state.countries.map((country, index) => {
            return(
                <Card 
                    key={index}
                    image={country.flag}
                    header={country.name}
                    extra = {<CountryModal country={country} func={this.addFavCountry} />}
                />    
            )
        });
    }

    renderFavCountries(){
        if (this.state.dream !== "") {
            return this.state.dream.map((country, index) => {
                return(
                    <Card 
                        key={index}
                        image={country.flag}
                        header={country.name}
                    />    
                )
            });
        }
    }


    searchChange(searchQuery) {
        if (searchQuery.length > 0) {
            setTimeout(() => {
                fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`,
                    {method: 'GET'}
                ).then((response) => response.json()
                ).then((countries) => {
                    this.setState({results: countries});    
                })
            },500);
            
        } else {
            this.setState({ 
                results: []
            })
        }
    }

    handleResultSelect = (e, {result}) => {
        fetch(`https://restcountries.eu/rest/v2/name/${result.title}?fullText=true`,
            {method: 'GET'}
        ).then((response) => response.json())
        .then((data) => {
            this.setState({countries: data})
        });
    }
    

    render(){
        let filteredResults = []
        if(this.state.results.length > 0){
            this.state.results.map((data) => {
                let filteredData = {'title': data.name, 'image': data.flag}
                filteredResults = [...filteredResults, filteredData]
            });
        }
        return(
            <div>
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Header>List of countries!!</Header>
                            { this.renderCountries() }
                        </Grid.Column>
                        <Grid.Column>
                            <Header>Search for your favorite countries!!</Header>
                            <Search 
                                loading={this.state.isLoading}
                                onSearchChange={(event) => this.searchChange(event.target.value)}
                                onResultSelect={this.handleResultSelect}
                                results={filteredResults}
                            />
                            <Header>
                              <p>DreamList</p>
                              {this.renderFavCountries()}
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default CountriesList;
