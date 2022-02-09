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
      accusedAddress: '',
      StateId: '',
      DistrictId: '',
      court: '',
      expertise: '',
      lawyer:'',
      caseType: '',
      ipc: '',
      StateData: [],
      DistrictData: [],
      CourtData: [],
      LawyerData: [],
      expertiseData: [],
      validationError: ''
    }
  }

  componentDidMount() {
    if(localStorage.getItem("isLoggedIn")&&(localStorage.getItem("role")=="public")){
      this.setState({
        petitionerName: localStorage.getItem("fullName"),
        petitionerEmail:localStorage.getItem("user"),
        validationError: '',
      });
    axios.get("http://localhost:5000/states").then(
      (result) => {
        this.setState({
          StateData: result.data.states
        });
      }).catch((err) => {
        this.setState({
          validationError: err.response.data
        });
      })

    axios.get("http://localhost:5000/expertise").then(
      (result) => {
        this.setState({
          expertiseData: result.data.expertise
        });
      }).catch((err) => {
        this.setState({
          validationError: err.response.data
        });
      })
  }else{
    this.goToHome();
  }
}

clearHandler=(e)=>{
 
  this.setState({
    accusedName: '',
    accusedAddress: '',
    StateId: '',
    DistrictId: '',
    court: '',
    expertise: '',
    lawyer:'',
    caseType: '',
    ipc: '',
    validationError: ''
  })
  const node = reactDom.findDOMNode(this);
  node.querySelector('#law-autocomplete').value="";
}
goToHome = () => {
  this.props.history.push('/');
}

  loadDistrict = (e) => {
    const val = e.target.value;
    this.setState({
      StateId: val,
      validationError:''
    });
    if(val.trim()==""){
      this.setState({
        DistrictData: [],
        CourtData:[],
        StateId:'',
        DistrictId:'',
        court:''
      });}else{
    const obj = {
      state: val
    };
    axios.post("http://localhost:5000/districts", qs.stringify(obj)).then(
      (result) => {
        this.setState({
          DistrictData: result.data.districts,
        });
      }).catch((err) => {
        this.setState({
          validationError: err.response.data
        });
      })
    }
  }

  loadCourt = (e) => {
    const val = e.target.value;
    this.setState({
      DistrictId: val,
      validationError:''
    });
    if(val.trim()==""){
      this.setState({
        CourtData: [],
        DistrictId:'',
        court:''
      });    }
      else{
    const obj = {
      district: val
    };
    axios.post("http://localhost:5000/getCourtsByArea", qs.stringify(obj)).then(
      (result) => {
        this.setState({
          CourtData: result.data.courts,
        });
      }).catch((err) => {
        this.setState({
          validationError: err.response.data
        });
      })
    }
  }

  loadLawyer = (e) => {
    const val = e.target.value;
    alert(val);
    this.setState({
      expertise: val,
      validationError:''
    });
    if(val.trim()==""){
      this.setState({
        LawyerData: [],
        expertise:'',
        lawyer:''
      });    }else{    
    const obj = {
      expertise: val
    };
    axios.post("http://localhost:5000/getLawyerByExpertise", qs.stringify(obj)).then(
      (result) => {
        this.setState({
          LawyerData: result.data.lawyers,
        });
      }).catch((err) => {
        this.setState({
          validationError: err.response.data
        });
      })
    }
  }

  handleChange = (e, field) => {
    const val = e.target.value;
    this.setState({
      [field]: val,
      validationError:''
    });
  }

  caseFileHandler = (e) => {
e.preventDefault();
    const { petitionerName, petitionerEmail, accusedName, accusedAddress, caseType, court, lawyer, ipc } = this.state;
    const node = reactDom.findDOMNode(this);
    const obj = {
      petitionerName: petitionerName,
      petitionerEmail: petitionerEmail,
      accusedName: accusedName,
      accusedAddress: accusedAddress,
      court: court,
      lawyer: lawyer,
      caseType: caseType,
      ipc: node.querySelector('#law-autocomplete').value
    };
    alert(qs.stringify(obj));
    axios.post("http://localhost:5000/fileCase", qs.stringify(obj)).then(
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
    const { petitionerName, petitionerEmail, accusedName, accusedAddress, StateId, DistrictId, court, expertise, lawyer, caseType, validationError } = this.state;
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
                    <input class="form-control mb-2" id="petitionerNameInput" value={petitionerName} readOnly />
                  </div>
                  <div class="form-group mx-5">
                    <label for="petitionerEmailInput">Petitioner Email</label>
                    <input class="form-control mb-2" id="petitionerEmailInput" type="email" value={petitionerEmail} readOnly />
                  </div>
                  <div class="form-group mx-5">
                    <label for="accusedNameInput">Accused Full Name</label>
                    <input class="form-control mb-2" id="accusedNameInput" value={accusedName} onChange={(e) => this.handleChange(e, 'accusedName')} />
                    <span className="text-danger mb-2">{validationError.accusedName}</span>
                  </div>
                  <div class="form-group mx-5">
                    <label for="accusedAddressInput">Accused Address</label>
                    <textarea class="form-control mb-2" id="accusedAddressInput" value={accusedAddress} onChange={(e) => this.handleChange(e, 'accusedAddress')} />
                    <span className="text-danger mb-2">{validationError.accusedAddress}</span>
                  </div>
                  <div class="form-group mx-5">
                    <label for="caseTypeInput">Case Type</label>
                    <select class="form-select mb-2" id="caseTypeInput" value={caseType} onChange={(e) => this.handleChange(e, 'caseType')}>
                      <option value="">Select Case Type</option>
                      <option value="Civil">Civil</option>
                      <option value="Criminal">Criminal</option>
                    </select>
                    <span className="text-danger mb-2">{validationError.caseType}</span>
                  </div>
                  <span class="form-group mx-5"></span>
                  <div class="form-group mx-5">
                    <label for="courttInput">Choose Court By District</label>
                    <select className="form-control mb-2" name="state" id="stateInput" value={StateId} onChange={(e) => this.loadDistrict(e)} >
                      <option value="">Select State</option>
                      {this.state.StateData.map((e, key) => {
                        return <option key={key} value={e.state}>{e.state}</option>;
                      })}
                    </select>
                    <select className="form-control mb-2" name="district" id="districtInput" value={DistrictId} onChange={(e) => this.loadCourt(e)}>
                      <option value="">Select District</option>
                      {this.state.DistrictData.map((e, key) => {
                        return <option key={key} value={e.district}>{e.district}</option>;
                      })}
                    </select>
                    <select className="form-control mb-2" name="court" id="courttInput" value={court} onChange={(e) => this.handleChange(e, 'court')}>
                      <option value="">Select Court</option>
                      {this.state.CourtData.map((e, key) => {
                        return <option key={key} value={e.court}>{e.court}</option>;
                      })}
                    </select>
                    <span className="text-danger mb-2">{validationError.court}</span>
                  </div>
                  <span class="form-group mx-5"></span>
                  <div class="form-group mx-5">
                    <label for="lawInput">Choose Lawyer by Expertise</label>
                    <select className="form-control mb-2" name="expertise" id="expertise" value={expertise} onChange={(e) => this.loadLawyer(e)} >
                      <option value="">Select Area of Expertise</option>
                      {this.state.expertiseData.map((e, key) => {
                        return <option key={key} value={e.expertise}>{e.expertise}</option>;
                      })}
                    </select>
                    <select className="form-control mb-2" name="lawyer" id="lawyerInput" value={lawyer} onChange={(e) => this.handleChange(e, 'lawyer')}>
                      <option value="">Select Lawyer</option>
                      {this.state.LawyerData.map((e, key) => {
                        return <option key={key} value={e.email}>{e.name}</option>;
                      })}
                    </select>
                    <span className="text-danger mb-2">{validationError.lawyer}</span>
                  </div>
                  <span class="form-group mx-5"></span>
                  <div class="form-group mx-5">
                    <label for="lawInput">Search Law</label>
                    <LawAutoComplete />
                    <span className="text-danger mb-2">{validationError.ipc}</span>
                  </div>
                  <span class="form-group mx-5"></span>
                  <div class="form-group mx-5 text-center">
                  <button class=" rounded form-btn mx-3 mb-5 " onClick={this.caseFileHandler}>File</button>
                  <button class=" rounded form-btn mt-5 mb-2" onClick={this.clearHandler}>Clear</button>
                  </div>
                  <span className="text-danger mb-4">{validationError.message}</span>
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
