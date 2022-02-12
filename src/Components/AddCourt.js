import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

export default class AddCourt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      StateId: '',
      DistrictId: '',
      CourtId: '',
      StateData: [],
      DistrictData: [],
      validationError: ''
    }
  }

  componentDidMount() {
    if (localStorage.getItem("isLoggedIn") && (localStorage.getItem("role") == "admin")) {
      axios.get("http://localhost:5000/states").then(
        (result) => {
          this.setState({
            validationError: '',
            StateData: result.data.states
          });
        }).catch((err) => {
          this.setState({
            validationError: err.response.data
          });
        })
    }
    else {
      this.goToHome();
    }
  }

  loadDistrict = (e) => {
    const val = e.target.value;
    this.setState({
      validationError: '',
      DistrictData:[],
      DistrictId:'',
      CourtId:'',
      StateId: val
    });
    if(val.trim()==""){
      this.setState({
        DistrictData: [],
        DistrictId:'',
        CourtId:''
      });
    }else{
      const obj = {
      state: val
    };
    axios.post("http://localhost:5000/districts", qs.stringify(obj)).then(
      (result) => {
        this.setState({
          DistrictData: result.data.districts,
        });
      }).catch((err) => {
        console.log("Something went wrong");
      })
    }
  }
  goToHome = () => {
    this.props.history.push('/');
  }

  districtHandler = (e) => {
    const val = e.target.value;
    this.setState({
      validationError: '',
      DistrictId:val,
      CourtId:'',
    });
    if(val.trim()==""){
      this.setState({
        CourtId:''
      });
    }
    
  }

  handleChange = (e, field) => {
    const val = e.target.value;
    this.setState({
      validationError: '',
      [field]: val
    });
  }

  clearHandler=(e)=>{
    e.preventDefault();
    this.setState({
      StateId: '',
      DistrictId: '',
      CourtId: '',
      validationError: ''
    })
  }
  addCourtHandler = (e) => {
    e.preventDefault();
    const { StateId, DistrictId, CourtId } = this.state;
    const obj = {
      state: StateId,
      district: DistrictId,
      court: CourtId
    };
    axios.post("http://localhost:5000/addCourt", qs.stringify(obj)).then(
      (result) => {
        this.setState({
          validationError: ''
        });
      }).catch((err) => {
        this.setState({
          validationError: err.response.data,
        });
      })
  }

  render() {
    const { StateId, DistrictId, CourtId, validationError } = this.state;
    return (
      <React.Fragment>
        <div className="container mt-5">
          <div class="mx-5 row">
            <div className="col-1"></div>
            <div className="col-9 shadow m-5 border rounded form-container">
              <h3 class="form-header mt-4">Add Court</h3>
              <form>
                <div class="form-group mx-5 mt-2">
                  <label for="stateInput">State</label>
                  <select className="form-control mb-2" name="state" id="stateInput" value={StateId} onChange={(e) => this.loadDistrict(e)} >
                    <option value="">Select State</option>
                    {this.state.StateData.map((e, key) => {
                      return <option key={key} value={e.state}>{e.state}</option>;
                    })}
                  </select>
                  <span className="text-danger mb-2">{validationError.state}</span>
                </div>

                <div class="form-group mx-5 mt-2">
                  <label for="districtInput">District</label>
                  <select className="form-control mb-2" name="district" id="districtInput" value={DistrictId} onChange={(e) => this.districtHandler(e)}>
                    <option value="">Select District</option>
                    {this.state.DistrictData.map((e, key) => {
                      return <option key={key} value={e.district}>{e.district}</option>;
                    })}
                  </select>
                  <span className="text-danger mb-2">{validationError.district}</span>
                </div>

                <div class="form-group mx-5 mt-2">
                  <label for="courtInput">Court</label>
                  <input class="form-control mb-2" id="courtInput" value={CourtId} onChange={(e) => this.handleChange(e, 'CourtId')} />
                  <span className="text-danger mb-4">{validationError.court}</span>
                </div>
                <div align="center">
                  <button class=" rounded form-btn mt-5 mb-2" onClick={this.addCourtHandler}>Submit</button>
                  <span>        </span>
                  <button class=" rounded form-btn mt-5 mb-2" onClick={this.clearHandler}>Clear</button>
                </div>
                <span className="text-danger">{validationError.message}</span>
              </form></div>
            <div className="col-2  mt-4 "></div>
          </div>

        </div>
      </React.Fragment>
    )
  }
}
