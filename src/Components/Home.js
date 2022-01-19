import React, { Component } from 'react';
import '../Styles/home.css';
import Banner from './Banner';
import HomeContent from './HomeContent';
export default class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <Banner/>
                <HomeContent/>
            </React.Fragment>
        )
    }
}
