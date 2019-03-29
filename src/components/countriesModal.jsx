import React, { Component } from 'react';
import { Button, List, Image, Modal } from 'semantic-ui-react'

class CountryModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            languages: []
        }
    }

    componentWillMount(){
        this.props.country.languages.map((data) => {
            this.state.languages.push(data.name)
        });
    }

    render(){
        return(
            <Modal trigger={<Button>Show Modal</Button>}>
                <Modal.Header>{this.props.country.name}</Modal.Header>
                <Modal.Content image>
                <Image wrapped size='medium' src={this.props.country.flag} />
                <Modal.Description>
                    <p>Region: {this.props.country.region}</p>
                    <p>Total area covered: {this.props.country.area}</p>
                    <p>Native Name: {this.props.country.nativeName}</p>
                    <p>Population: {this.props.country.population}</p>
                    <p>Languages: {this.state.languages.join(', ')}</p>
                </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}


export default CountryModal;