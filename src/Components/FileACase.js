import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import LawAutoComplete from './LawAutoComplete';
import reactDom from 'react-dom';

export default class FileACase extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      petitionerName: '',
      petitionerEmail: '',
      accusedName: '',
      accusedAddress:'',
      StateId: '',
      DistrictId: '',
      court: '',
      expertise: '',
      ipc: '',
      StateData: [],
      DistrictData: [],
      CourtData:[],
      LawyerData: [],
      expertiseData: []
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

      axios.get("http://localhost:5000/expertise").then(
      (result) => {
        this.setState({
          expertiseData: result.data.expertise
        });
      }).catch((err) => {
        console.log("Something went wrong");
      })
  }

  loadDistrict = (e) => {
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

  loadCourt = (e) => {
    const val = e.target.value;
    this.setState({
      DistrictId: val
    });
    const obj = {
      district: val
    };
    axios.post("http://localhost:5000/getCourtsByArea", qs.stringify(obj)).then(
      (result) => {
        this.setState({
          CourtData: result.data.courts,
        });
      }).catch((err) => {
        console.log("Something went wrong");
      })
  }

  loadLawyer = (e) => {
    const val = e.target.value;
    this.setState({
      expertise: val
    });
    const obj = {
      expertise: val
    };
    axios.post("http://localhost:5000/getLawyerByExpertise", qs.stringify(obj)).then(
      (result) => {
        this.setState({
          LawyerData: result.data.lawyers,
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

  caseFileHandler = () => {
    const { petitionerName, petitionerEmail, accusedName,accusedAddress,court,lawyer,ipc} = this.state;
    const node = reactDom.findDOMNode(this);
      const obj = {
      petitionerName:petitionerName,
      petitionerEmail:petitionerEmail,
      accusedName:accusedName,
      accusedAddress:accusedAddress,
      court:court,
      lawyer:lawyer,
      ipc:node.querySelector('#law-autocomplete').value,
      casestatus:"New"
    };
    alert(qs.stringify(obj));
    axios.post("http://localhost:5000/fileCase", qs.stringify(obj)).then(
      (result) => {
        this.setState({
        message:"Case added successfully!"
        });
      }).catch((err) => {
          this.setState({
              error: "Something went wrong"
          });
      })
  }

  render() {
    const { petitionerName, petitionerEmail, accusedName, accusedAddress, StateId, DistrictId, court, expertise, lawyer } = this.state;
    return (
      <>
        <div className="container mt-5">
          <div class="mx-5 row">
            <div className="col-1"></div>
            <div className="col-9 shadow m-5 border rounded form-container">
              <h3 class="form-header mt-4">File a Case</h3>
              <form>
                <div class="form-group mx-5">
                  <div class="form-group mx-5">
                    <label for="petitionerNameInput">Petitioner Full Name</label>
                    <input class="form-control mb-3" id="petitionerNameInput" value={petitionerName} onChange={(e) => this.handleChange(e, 'petitionerName')} />
                  </div>
                  <div class="form-group mx-5">
                    <label for="petitionerEmailInput">Petitioner Email</label>
                    <input class="form-control mb-3" id="petitionerEmailInput" type="email" value={petitionerEmail} onChange={(e) => this.handleChange(e, 'petitionerEmail')} />
                  </div>
                  <div class="form-group mx-5">
                    <label for="accusedNameInput">Accused Full Name</label>
                    <input class="form-control mb-3" id="accusedNameInput" value={accusedName} onChange={(e) => this.handleChange(e, 'accusedName')} />
                  </div>
                  <div class="form-group mx-5">
                    <label for="accusedAddressInput">Accused Address</label>
                    <textarea class="form-control mb-3" id="accusedAddressInput" value={accusedAddress} onChange={(e) => this.handleChange(e, 'accusedAddress')} />
                  </div>
                  <span class="form-group mx-5"></span>
                  <div class="form-group mx-5">
                    <label for="courttInput">Choose Court By District</label>
                    <select className="form-control mb-3" name="state" id="stateInput" value={StateId} onChange={(e) => this.loadDistrict(e)} >
                      <option>Select State</option>
                      {this.state.StateData.map((e, key) => {
                        return <option key={key} value={e.state}>{e.state}</option>;
                      })}
                    </select>
                    <select className="form-control mb-3" name="district" id="districtInput" value={DistrictId} onChange={(e) => this.loadCourt(e)}>
                      <option>Select District</option>
                      {this.state.DistrictData.map((e, key) => {
                        return <option key={key} value={e.district}>{e.district}</option>;
                      })}
                    </select>
                    <select className="form-control mb-3" name="court" id="courttInput" value={court} onChange={(e) => this.handleChange(e, 'court')}>
                      <option>Select Court</option>
                      {this.state.CourtData.map((e, key) => {
                        return <option key={key} value={e.court}>{e.court}</option>;
                      })}
                    </select>
                  </div>
                  <span class="form-group mx-5"></span>
                  <div class="form-group mx-5">
                    <label for="lawInput">Choose Lawyer by Expertise</label>
                    <select className="form-control mb-3" name="expertise" id="expertise" value={expertise} onChange={(e) => this.loadLawyer(e)} >
                          <option>Select Area of Expertise</option>
                          {this.state.expertiseData.map((e, key) => {
                            return <option key={key} value={e.expertise}>{e.expertise}</option>;
                          })}
                        </select>
                    <select className="form-control mb-3" name="lawyer" id="lawyerInput" value={lawyer} onChange={(e) => this.handleChange(e, 'lawyer')}>
                      <option>Select Lawyer</option>
                      {this.state.LawyerData.map((e, key) => {
                        return <option key={key} value={e.email}>{e.name}</option>;
                      })}
                    </select>
                  </div>
                  <span class="form-group mx-5"></span>
                  <div class="form-group mx-5">
                    <label for="lawInput">Search Law</label>
                    <LawAutoComplete/>
                  </div>
                  <span class="form-group mx-5"></span>
                  <div class="form-group mx-5 text-center">
                    <button class=" rounded form-btn mx-5 mb-5" onClick={this.caseFileHandler}>File</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-2  "></div>
          </div>
        </div>
      </>
    )
  }
}
