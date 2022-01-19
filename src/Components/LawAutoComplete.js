import React, { Component } from 'react';
import Autocomplete from  'react-autocomplete';
import { matchLaw } from './dataService';
import axios from 'axios';
import '../Styles/home.css';

export default class LawAutoComplete extends Component {
    constructor(props) {
        super(props)
        this.state = {
          LawData: []
        }
      }

      componentDidMount() {
        axios.get("http://localhost:5000/getAllLaw").then(
        (result) => {
            console.log(result.data.laws)
          this.setState({
            LawData: result.data.laws
          });
        }).catch((err) => {
          console.log("Something went wrong");
        })
      }

  state = { value: '' };

  render() {
    return (
      <div className='form-control outer-container'>
      <form>
        <div className="autocomplete-wrapper">

            <Autocomplete
              value={ this.state.value }
              inputProps={{ id: 'law-autocomplete' }}
              wrapperStyle={{ position: 'relative', display: 'inline-block'}}
              items={ this.state.LawData }
              getItemValue={ item => item.ipc }
              shouldItemRender={ matchLaw }
              onChange={(event, value) => this.setState({ value }) }
              onSelect={ value => this.setState({ value }) }
              renderMenu={ children => (
                <div className = "menu">
                  { children }
                </div>
              )}
              renderItem={ (item, isHighlighted) => (
                <div
                  className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                  key={ item.abbr } >
                  { item.ipc }
                </div>
              )}
            />
            </div>
          </form>
          
      </div>
    );
  }
}