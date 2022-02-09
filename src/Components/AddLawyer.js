import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

export default class AddLawyer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      regno: '',
      expertise: '',
      expertiseData: [],
      validationError: ''
    }
  }

  componentDidMount() {
    if (localStorage.getItem("isLoggedIn") && (localStorage.getItem("role") == "admin")) {
      axios.get("http://localhost:5000/expertise").then(
        (result) => {
          this.setState({
            validationError: '',
            expertiseData: result.data.expertise
          });
        }).catch((err) => {
          this.setState({
            validationError: err.response.data
          });
        })
    } else {
      this.goToHome();
    }
  }

  goToHome = () => {
    this.props.history.push('/');
  }

  handleChange = (e, field) => {
    const val = e.target.value;
    this.setState({
      validationError: '',
      [field]: val
    });
  }

  clearHandler = (e) => {
    e.preventDefault();
    this.setState({
      name: '',
      email: '',
      regno: '',
      expertise: '',
      validationError: ''
    })
  }

  addLawyerHandler = (e) => {
    e.preventDefault();

    const { name, regno, email, expertise, validationError } = this.state;
    const obj = {
      name: name,
      regno: regno,
      email: email,
      expertise: expertise
    };
    axios.post("http://localhost:5000/addLawyer", qs.stringify(obj)).then(
      (result) => {
        this.setState({
          validationError: ''
        });
      }).catch((err) => {
        this.setState({
          validationError: err.response.data
        });
      })

  }

  render() {
    const { name, email, regno, expertise, validationError } = this.state;
    return (
      <>
        <div className="container mt-5">
          <div class="mx-5 row">
            <div className="col-1"></div>
            <div className="col-9 shadow m-5 border rounded form-container">
              <h3 class="form-header mt-4">Add Lawyer</h3>
              <form>
                <div class="form-group mx-5">
                  <label for="nameInput">Name</label>
                  <input class="form-control mb-2" id="nameInput" value={name} onChange={(e) => this.handleChange(e, 'name')} />
                  <span className="text-danger mb-3">{validationError.name}</span>
                </div>
                <div class="form-group mx-5 mt-2">
                  <label for="emailInput">Email address</label>
                  <input type="email" class="form-control mb-2" id="emailInput" value={email} placeholder='name@example.com' onChange={(e) => this.handleChange(e, 'email')} />
                  <span className="text-danger mb-3">{validationError.email}</span>
                </div>
                <div class="form-group mx-5 mt-2">
                  <label for="regInput">Registration number</label>
                  <input class="form-control mb-2" id="regInput" value={regno} onChange={(e) => this.handleChange(e, 'regno')} />
                  <span className="text-danger mb-3">{validationError.regno}</span>
                </div>
                <div class="form-group mx-5 mt-2">
                  <label for="expertise">Area of Expertise</label>
                  <select className="form-control mb-2" name="expertise" id="expertise" value={expertise} onChange={(e) => this.handleChange(e, 'expertise')} >
                    <option value="">Select Area of Expertise</option>
                    {this.state.expertiseData.map((e, key) => {
                      return <option key={key} value={e.expertise}>{e.expertise}</option>;
                    })}
                  </select>
                  <span className="text-danger mb-3">{validationError.expertise}</span>
                </div>
                <div class="text-center">
                  <button class=" rounded form-btn mt-5 mb-2" onClick={this.addLawyerHandler}>Submit</button>
                  <span>        </span>
                  <button class=" rounded form-btn mt-5 mb-2" onClick={this.clearHandler}>Clear</button>
                </div>
                <span className="text-danger mb-3">{validationError.message}</span>
              </form></div>
            <div className="col-2 mt-4 "></div>
          </div>

        </div>
      </>
    )
  }
}
