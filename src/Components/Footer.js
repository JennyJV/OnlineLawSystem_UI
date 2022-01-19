import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Styles/footer.css';

class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <footer className="footer">
                            <Link to='/Home'><button className="footer-button">Home</button></Link>
                            <span> | </span>
                            <Link to='/About'><button className="footer-button">About Us</button></Link>
                            <span> | </span>
                            <Link to="Copyright"><button className="footer-button">Copyright Policy</button></Link>
                            <span> | </span>
                            <Link to="Privacy"><button className="footer-button">Privacy Policy</button></Link>
                            <span> | </span>
                            <Link to="TermsAndConditions"><button className="footer-button">Terms & Conditions</button></Link>
                       
                </footer>
            </React.Fragment>
        )
    }
}

export default withRouter(Footer);
