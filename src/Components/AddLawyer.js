import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

export default class AddLawyer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      regno:'',
      expertise: '',
      expertiseData: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5000/expertise").then(
      (result) => {
        this.setState({
          expertiseData: result.data.expertise
        });
      }).catch((err) => {
        console.log("Something went wrong");
      })
  }


  handleChange = (e, field) => {
    const val = e.target.value;
    this.setState({
        [field]: val
    });
}


addLawyerHandler = () => {
  const { name, regno, email, expertise } = this.state;
  const obj = {
    name:name,
    regno:regno, 
    email:email,
    expertise:expertise
  };

  console.log(name);
  console.log(regno);
  console.log(email);
  console.log(expertise);
  axios.post("http://localhost:5000/addLawyer", qs.stringify(obj)).then(
      (result) => {
        this.setState({
        message:"Lawyer added successfully!"
        });
      }).catch((err) => {
          this.setState({
              error: "Something went wrong"
          });
      })

}

  render() {
    const {name, email, regno, expertise} = this.state;
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
                  <input class="form-control mb-3" id="nameInput" onChange={(e) => this.handleChange(e, 'name')} />
                </div>
                <div class="form-group mx-5">
                  <label for="emailInput">Email address</label>
                  <input type="email" class="form-control mb-3" id="emailInput" placeholder='name@example.com' onChange={(e) => this.handleChange(e, 'email')}/>
                </div>
                <div class="form-group mx-5">
                  <label for="regInput">Registration number</label>
                  <input class="form-control mb-3" id="regInput" onChange={(e) => this.handleChange(e, 'regno')}/>
                </div>
                <div class="form-group mx-5">
                  <label for="expertise">Area of Expertise</label>
                  <select className="form-control mb-3" name="expertise" id="expertise" value={expertise} onChange={(e) => this.handleChange(e, 'expertise')} >
                    <option>Select Area of Expertise</option>
                    {this.state.expertiseData.map((e, key) => {
                      return <option key={key} value={e.expertise}>{e.expertise}</option>;
                    })}
                  </select>
                </div>
                <div class="text-center">
                  <button class=" rounded form-btn mb-5" onClick={this.addLawyerHandler}>Submit</button>
                </div>
              </form></div>
            <div className="col-2  "></div>
          </div>

        </div>
      </>
    )
  }
}
