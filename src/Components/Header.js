import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import qs from 'qs';
import { Link } from 'react-router-dom';

import '../Styles/header.css';

const constants = require('../constants');
const API_URL = constants.API_URL;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '450px'
    },
};

Modal.setAppElement('#root');

class Header extends Component {

    constructor() {
        super();
        this.state = {
            isLoginModalOpen: false,
            isSignupModalOpen: false,
            email: '',
            password: '',
            password2: '',
            name: '',
            aadhar: '',
            role: '',
            user: undefined,
            isLoggedIn: false,
            loginError: '',
            signUpError: ''
        };
    }

    goToHome = () => {
        this.props.history.push('/');
    }

    openLoginModal = () => {
        this.setState({
            email: '',
            password: '',
            loginError: '',
            isLoginModalOpen: true
        });
    }

    closeLoginModal = () => {
        this.setState({
            isLoginModalOpen: false
        });
    }

    openSignupModal = () => {
        this.setState({
            email: '',
            password: '',
            password2: '',
            name: '',
            aadhar: '',
            role: '',
            signUpError: '',
            isSignupModalOpen: true
        })
    }

    closeSignupModal = () => {
        this.setState({
            isSignupModalOpen: false
        });
    }

    loginHandler = () => {
        const { email, password } = this.state;
        const obj = {
            email: email,
            password: password
        };

        axios.post("http://localhost:5000/login", qs.stringify(obj)).then(
            (result) => {
                localStorage.setItem("user", result.data.user.email);
                localStorage.setItem("role", result.data.user.role);
                localStorage.setItem("fullName",result.data.user.name);
                localStorage.setItem("isLoggedIn", true);
                this.setState({
                    user: result.data.user,
                    isLoggedIn: true,
                    loginError: '',
                    isLoginModalOpen: false
                });
                this.goToHome();
            }).catch((err) => {
                this.setState({
                    isLoggedIn: false,
                    loginError: err.response.data
                });
            })

    }

    signupHandler = (e) => {
        e.preventDefault();
        const { name, email, password, password2, aadhar, role } = this.state;
        const obj = {
            name: name,
            email: email,
            password: password,
            password2: password2,
            aadhar: aadhar,
            role: role
        };
        axios.post("http://localhost:5000/register", qs.stringify(obj)).then(
            (res) => {
                localStorage.setItem("isLoggedIn", false);
                localStorage.setItem("user", "");
                localStorage.setItem("role", "");
                localStorage.setItem("fullName","");
                this.setState({
                    isLoggedIn: false,
                    signUpError: '',
                    isSignupModalOpen: false
                });
            }).catch((err) => {
                this.setState({
                    isLoggedIn: false,
                    signUpError: err.response.data
                });
            })
this.logout();
    }

    handleChange = (e, field) => {
        const val = e.target.value;
        this.setState({
            [field]: val,
            loginError: '',
            signUpError: ''
        });
    }

    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("fullName");
        localStorage.removeItem("isLoggedIn");
        this.setState({
            user: undefined,
            isLoggedIn: false
        });
        this.goToHome();
    }

    render() {
        const { isLoginModalOpen, isSignupModalOpen, email, password, password2, name, user, aadhar, loginError, signUpError, isLoggedIn } = this.state;
        return (
            <React.Fragment>
                <div className="header">
                    <div className="row">
                        <div className="col-3  ">
                            <img src={require('../Assets/OLS_logo.png').default}
                                alt="Logo" height="70px"
                            />
                            <span class="text-white heading"> Online Law System</span>
                        </div><div className="col-4">
                            <button className="signup-button" onClick={this.goToHome}>Home</button>
                            <Link to='/About'><button className="signup-button">About</button></Link>
                            {(() => {
                                if (localStorage.getItem("isLoggedIn")) {
                                    if ("admin" == localStorage.getItem("role")) {
                                        return (
                                            <>
                                                <button class="dropdown-toggle menu" data-bs-toggle="dropdown">
                                                    Services
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><Link class="dropdown-item" to="/AddCourt">Add Court</Link></li>
                                                    <li><Link class="dropdown-item" to="/AddLaw">Add Law</Link></li>
                                                    <li><Link class="dropdown-item" to="/AddLawyer">Add Lawyer</Link></li>
                                                    <li><Link class="dropdown-item" to="/CaseReport">Case Report</Link></li>
                                                </ul>
                                            </>
                                        )
                                    } if ("lawyer" == localStorage.getItem("role")) {
                                        return (
                                            <>
                                                <button class="dropdown-toggle menu" data-bs-toggle="dropdown">
                                                    Services
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><Link class="dropdown-item" to="/CaseReport">View New Cases</Link></li>
                                                    <li><Link class="dropdown-item" to="/VerifyCase">Verify Case</Link></li>
                                                    <li><Link class="dropdown-item" to="/FileCase">File verified case</Link></li>
                                                </ul>
                                            </>
                                        )
                                    } if ("public" == localStorage.getItem("role")) {
                                        return (
                                            <>
                                                <button class="dropdown-toggle menu" data-bs-toggle="dropdown">
                                                    Services
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><Link class="dropdown-item" to="/FileACase">File a case</Link></li>
                                                    <li><Link class="dropdown-item" to="/CaseReport">View Case Status</Link></li>
                                                </ul>
                                            </>
                                        )
                                    }

                                }
                            })()}

                        </div>

                        <div className="loginSection col-5 logo">
                        {(() => {
                                if (localStorage.getItem("isLoggedIn")) {
                                    return(
                                    <>
                                        <span className="text-white m-4">Welcome {localStorage.getItem("fullName")} !</span>
                                        <button className="signup-button" onClick={this.logout}>Logout</button>
                                    </>)
                                }else{
                                    return(
                                    <>
                                        <button className="login-button" onClick={this.openLoginModal}>Sign In</button>
                                        <span className="text-white">|</span>
                                        <button className="signup-button" onClick={this.openSignupModal}>Register</button>
                                    </>)
                            }
                         }) ()}

                        </div>
                    </div>
                </div>
                <Modal isOpen={isLoginModalOpen} style={customStyles}>
                    <div class="row">
                        <div class="col-2"> <h2 className="popup-heading">
                            Login </h2></div>
                        <div class="col-3"> <img
                            className="d-block w-80"
                            src={require('../Assets/login1.jpg').default}
                            height="80px"
                        /></div>
                        <div class="col-7" align="right"> <button className="float-end btn btn-close mt-2" onClick={this.closeLoginModal}></button></div>

                    </div>
                    <form className="my-4">
                        <label for="username" class="sr-only">Email</label>
                        <input id="username" className="form-control mt-3" type="text" value={email} required onChange={(e) => this.handleChange(e, 'email')} />
                        <span className="text-danger mt-2 mb-3">{loginError.email}</span><br/>
                        <label for="pwd" class="sr-only ">Password</label>
                        <input id="pwd" className="form-control mt-3" type="password" value={password} required onChange={(e) => this.handleChange(e, 'password')} />
                        <span className="text-danger mt-2">{loginError.password}</span>
                        <input type="button" className="btn-primary form-control login-btn my-5" onClick={this.loginHandler} value="Login" />
                        <span className="text-danger">{loginError.message}</span>
                    </form>



                </Modal>
                <Modal isOpen={isSignupModalOpen} style={customStyles}>
                    <div class="row">
                        <div class="col-4"> <h2 className="popup-heading">
                            Register </h2></div>
                        <div class="col-4"> <img
                            className="d-block w-80"
                            src={require('../Assets/register1.jpg').default}
                            height="80px"
                        /></div>
                        <div class="col-4" align="right"> <button className="float-end btn btn-close mt-2" onClick={this.closeSignupModal}></button></div>

                    </div>

                    <form className="my-4">
                        <input className="form-control my-3" type="text" placeholder="Full Name" value={name} onChange={(e) => this.handleChange(e, 'name')} />
                        <span className="text-danger">{signUpError.name}</span>
                        <input className="form-control my-3" type="text" placeholder="Email" value={email} onChange={(e) => this.handleChange(e, 'email')} />
                        <span className="text-danger">{signUpError.email}</span>
                        <input className="form-control my-3" type="text" placeholder="Aadhar number" value={aadhar} onChange={(e) => this.handleChange(e, 'aadhar')} />
                        <span className="text-danger">{signUpError.aadhar}</span>
                        <input className="form-control my-3" type="password" placeholder="Password" value={password} onChange={(e) => this.handleChange(e, 'password')} />
                        <span className="text-danger">{signUpError.password}</span>
                        <input className="form-control my-3" type="password" placeholder="Confirm Password" value={password2} onChange={(e) => this.handleChange(e, 'password2')} />
                        <span className="text-danger">{signUpError.password2}</span>
                        <select class="form-control my-3" onChange={(e) => this.handleChange(e, 'role')}>
                            <option value="">Select Role</option>
                            <option value="public">Public</option>
                            <option value="lawyer">Lawyer</option>
                        </select>
                        <span className="text-danger">{signUpError.role}</span>
                        <button className="btn-primary form-control login-btn my-5" onClick={this.signupHandler}>Register</button>
                        <span className="text-danger">{signUpError.message}</span>
                    </form>


                </Modal>

            </React.Fragment>
        )
    }
}

export default withRouter(Header);
