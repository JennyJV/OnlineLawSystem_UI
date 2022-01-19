import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

export default class AddCourt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      StateId: '',
      DistrictId: '',
      CourtId:'',
      StateData: [],
      DistrictData: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5000/states").then(
      (result) => {
        this.setState({
          StateData: result.data.states
        });
      }).catch((err) => {
        console.log("Something went wrong");
      })
  }

  changeDistrict = (e) => {
    const val = e.target.value;
    this.setState({
      StateId: val
    });
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


  handleChange = (e, field) => {
    const val = e.target.value;
    this.setState({
        [field]: val
    });
}

addCourtHandler = () => {
  const { StateId, DistrictId, CourtId } = this.state;
  const obj = {
    state:StateId,
    district:DistrictId, 
    court:CourtId
  };
  console.log(StateId);
  console.log(DistrictId);
  console.log(CourtId);
  axios.post("http://localhost:5000/addCourt", qs.stringify(obj)).then(
      (result) => {
        this.setState({
        message:"Court added successfully!"
        });
      }).catch((err) => {
          this.setState({
              error: "Something went wrong"
          });
      })

}

  render() {
    const {StateId, DistrictId, CourtId} = this.state;
    return (
      <React.Fragment>
        <div className="container mt-5">
          <div class="mx-5 row">
            <div className="col-1"></div>
            <div className="col-9 shadow m-5 border rounded form-container">
              <h3 class="form-header mt-4">Add Court</h3>
              <form>
                <div class="form-group mx-5">
                  <label for="stateInput">State</label>
                  <select className="form-control mb-3" name="state" id="stateInput" value={StateId} onChange={(e) => this.changeDistrict(e)} >
                    <option>Select State</option>
                    {this.state.StateData.map((e, key) => {
                      return <option key={key} value={e.state}>{e.state}</option>;
                    })}
                  </select>
                </div>

                <div class="form-group mx-5">
                  <label for="districtInput">District</label>
                  <select className="form-control mb-3" name="district" id="districtInput" value={DistrictId} onChange={(e) => this.handleChange(e, 'DistrictId')}>
                    <option>Select District</option>
                    {this.state.DistrictData.map((e, key) => {
                      return <option key={key} value={e.district}>{e.district}</option>;
                    })}
                  </select>
                </div>

                <div class="form-group mx-5">
                  <label for="courtInput">Court</label>
                  <input class="form-control mb-3" id="courtInput" value={CourtId} onChange={(e) => this.handleChange(e, 'CourtId')}/>
                </div>
                <div class="text-center">
                  <button class=" rounded form-btn mb-5" onClick={this.addCourtHandler}>Submit</button>
                </div>
              </form></div>
            <div className="col-2  "></div>
          </div>

        </div>
      </React.Fragment>
    )
  }
}
