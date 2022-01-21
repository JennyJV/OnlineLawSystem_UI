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
            loginError: undefined,
            signUpError: undefined
        };
    }

    goToHome = () => {
        this.props.history.push('/');
    }

    openLoginModal = () => {
        this.setState({
            isLoginModalOpen: true
        });
    }

    closeLoginModal = () => {
        this.setState({
            isLoginModalOpen: false
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
                localStorage.setItem("user", JSON.stringify(result.data.user));
                localStorage.setItem("role", JSON.stringify(result.data.role));
                localStorage.setItem("isLoggedIn", true);
                this.setState({
                    user: result.data.user,
                    role: result.data.role,
                    isLoggedIn: true,
                    loginError: undefined,
                    isLoginModalOpen: false
                });
            }).catch((err) => {
                this.setState({
                    isLoggedIn: false,
                    loginError: "Username or Password is incorrect"
                });
            })

    }


    loginCancelHandler = () => {
        this.closeLoginModal();
    }

    openSignupModal = () => {
        this.setState({
            isSignupModalOpen: true
        })
    }

    closeSignupModal = () => {
        this.setState({
            isSignupModalOpen: false
        });
    }

    signupHandler = () => {
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
                this.setState({
                    isLoggedIn: false,
                    loginError: undefined,
                    isLoginModalOpen: false
                });
            }).catch((err) => {
                this.setState({
                    isLoggedIn: false,
                    loginError: "Registration failed"
                });
            })

    }

    signupCancelHandler = () => {
        this.closeSignupModal();
    }

    checkmessage = () => {
        alert(this.role);
    }

    toggleAuth = (auth) => {
        if (auth === 'login') {
            this.signupCancelHandler();
            this.openLoginModal();
        } else {
            this.loginCancelHandler();
            this.openSignupModal();
        }
    }

    handleChange = (e, field) => {
        const val = e.target.value;
        this.setState({
            [field]: val,
            loginError: undefined,
            signUpError: undefined
        });
    }

    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("role")
        localStorage.removeItem("isLoggedIn");
        this.setState({
            user: undefined,
            role: undefined,
            isLoggedIn: false
        });
    }

    render() {
        const { isLoginModalOpen, isSignupModalOpen, email, password, password2, name, user, role, aadhar, loginError, isLoggedIn } = this.state;
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
                            <Link to='/CaseReport'><button className="signup-button">About</button></Link>
                            {(() => {
                                if (isLoggedIn) {
                                    if ("admin" == user.role) {
                                        return (
                                            <>
                                                <button class="dropdown-toggle menu" data-bs-toggle="dropdown">
                                                    Services
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><Link class="dropdown-item" to="/AddCourt">Add Court</Link></li>
                                                    <li><Link class="dropdown-item" to="/AddLaw">Add Law</Link></li>
                                                    <li><Link class="dropdown-item" to="/AddLawyer">Add Lawyer</Link></li>
                                                </ul>
                                            </>
                                        )
                                    } if ("lawyer" == user.role) {
                                        return (
                                            <>
                                                <button class="dropdown-toggle menu" data-bs-toggle="dropdown">
                                                    Services
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">View New Cases</a></li>
                                                    <li><a class="dropdown-item" href="#">Verify Case</a></li>
                                                    <li><a class="dropdown-item" href="#">File verified case</a></li>
                                                </ul>
                                            </>
                                        )
                                    } if ("public" == user.role) {
                                        return (
                                            <>
                                                <button class="dropdown-toggle menu" data-bs-toggle="dropdown">
                                                    Services
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">File a case</a></li>
                                                    <li><a class="dropdown-item" href="#">View Case Status</a></li>
                                                </ul>
                                            </>
                                        )
                                    }

                                }
                            })()}

                        </div>

                        <div className="loginSection col-5 logo">
                            {
                                isLoggedIn
                                    ?
                                    <>
                                        <span className="text-white m-4">Welcome {user.name} !</span>
                                        <button className="signup-button" onClick={this.logout}>Logout</button>
                                    </>
                                    :
                                    <>
                                        <button className="login-button" onClick={this.openLoginModal}>Sign In</button>
                                        <span className="text-white">|</span>
                                        <button className="signup-button" onClick={this.openSignupModal}>Register</button>
                                    </>
                            }

                        </div>
                    </div>
                </div>
                <Modal isOpen={isLoginModalOpen} style={customStyles}>

                    <h3 className="popup-heading">
                        Login
                        <button className="float-end btn btn-close mt-2" onClick={this.closeLoginModal}></button>
                    </h3>
                    <form className="my-4">
                        <label for="username" class="sr-only">Email</label>
                        <input id="username" className="form-control my-2" type="text" value={email} required onChange={(e) => this.handleChange(e, 'email')} />
                        <label for="pwd" class="sr-only">Password</label>
                        <input id="pwd" className="form-control my-2" type="password" value={password} required onChange={(e) => this.handleChange(e, 'password')} />
                        <input type="button" className="btn-primary form-control login-btn my-4" onClick={this.loginHandler} value="Login" />
                    </form>

                    <hr className="my-2" />
                    <div className="bottom-text">
                        Not a member? <button className="text-danger btn m-0 p-0" onClick={() => this.toggleAuth('signup')}>Register</button>
                    </div>
                </Modal>
                <Modal isOpen={isSignupModalOpen} style={customStyles}>
                    <h2 className="popup-heading">
                        Register
                        <button className="float-end btn btn-close mt-2" onClick={this.closeSignupModal}></button>
                    </h2>
                    <form className="my-4">
                        <input className="form-control my-3" type="text" placeholder="Full Name" value={name} onChange={(e) => this.handleChange(e, 'name')} />
                        <input className="form-control my-3" type="text" placeholder="Email" value={email} onChange={(e) => this.handleChange(e, 'email')} />
                        <input className="form-control my-3" type="text" placeholder="Aadhar number" value={aadhar} onChange={(e) => this.handleChange(e, 'aadhar')} />
                        <input className="form-control my-3" type="password" placeholder="Password" value={password} onChange={(e) => this.handleChange(e, 'password')} />
                        <input className="form-control my-3" type="password" placeholder="Confirm Password" value={password2} onChange={(e) => this.handleChange(e, 'password2')} />
                        <select class="form-control my-3" onChange={(e) => this.handleChange(e, 'role')}>
                            <option value="none">Select Role</option>
                            <option value="public">Public</option>
                            <option value="lawyer">Lawyer</option>
                        </select>
                        <button className="btn-primary form-control login-btn my-4" onClick={this.signupHandler}>Register</button>
                    </form>
                    <hr className="my-2" />
                    <div className="bottom-text">
                        Already have an account? <button className="text-danger btn m-0 p-0" onClick={() => this.toggleAuth('login')}>Login</button>
                    </div>
                </Modal>

            </React.Fragment>
        )
    }
}

export default withRouter(Header);
