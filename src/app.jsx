import React, { Component } from 'react';
import CountriesList from './components/countriesList';
import { Container } from 'semantic-ui-react';
import Header from './header';

class App extends Component {

    render(){
        return(
            <Container>
                <Header />
                <CountriesList />
            </Container>
        )
    }
}

export default App;