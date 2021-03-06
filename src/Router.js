import { Route, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';

import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Copyright from './Components/Copyright';
import Privacy from './Components/Privacy';
import TermsAndConditions from './Components/TermsAndConditions';
import AddLawyer from './Components/AddLawyer';
import AddLaw from './Components/AddLaw';
import AddCourt from './Components/AddCourt';
import FileACase from './Components/FileACase';
import LawAutoComplete from './Components/LawAutoComplete';
import CaseReport from './Components/CaseReport';
import VerifyCase from './Components/VerifyCase';
import FileCase from './Components/FileCase';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Route exact path="/" component={Home} />
                <Route path="/Home" component={Home} />
                <Route path="/About" component={About} />
                <Route path="/Copyright" component={Copyright} />
                <Route path="/Privacy" component={Privacy} />
                <Route path="/TermsAndConditions" component={TermsAndConditions} />
                <Route path="/AddLawyer" component={AddLawyer} />
                <Route path="/AddLaw" component={AddLaw} />
                <Route path="/AddCourt" component={AddCourt} />
                <Route path="/FileACase" component={FileACase} />
                <Route path="/LawAutoComplete" component={LawAutoComplete} />
                <Route path="/CaseReport" component={CaseReport} />
                <Route path="/VerifyCase" component={VerifyCase} />
                <Route path="/FileCase" component={FileCase} />

                <Footer/>
                
            </BrowserRouter>
        )
    }
}
