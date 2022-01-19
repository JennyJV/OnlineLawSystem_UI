import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import LawAutoComplete from './LawAutoComplete';

export default class FileACase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      petitionerName: '',
      petitionerEmail: '',
      accusedName: '',
      StateId: '',
      DistrictId: '',
      court: '',
      expertise: [],
      ipc: '',
      StateData: [],
      DistrictData: []
    }
  }


  handleChange = (e, field) => {
    const val = e.target.value;
    alert(val)
    this.setState({
      [field]: val
    });
  }

  render() {
    const { petitionerName, petitionerEmail, accusedName, accusedAddress, StateId, DistrictId, court, ipc, expertise } = this.state;
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

                  <div class="form-group mx-5">
                    <label for="lawInput">Choose Lawyer</label>
                    <div class="mx-5 row">
                      <div class="form-group mx-5 col">
                        <label for="expertise">Area of Expertise</label>
                        <select className="form-control mb-3" name="expertise" id="expertise" value={expertise} onChange={(e) => this.handleChange(e, 'expertise')} >
                          <option>Select Area of Expertise</option>
                          {this.state.expertiseData.map((e, key) => {
                            return <option key={key} value={e.expertise}>{e.expertise}</option>;
                          })}
                        </select>
                      </div>
                      <div class="col">
                        <input class="form-control mb-3" id="lawInput" value={ipc} onChange={(e) => this.handleChange(e, 'ipc')} />
                      </div>
                    </div>
                  </div>

                  <div class="form-group mx-5">
                    <label for="lawInput">Choose Court</label>
                    <select className="form-control mb-3" name="state" id="stateInput" value={StateId} onChange={(e) => this.changeDistrict(e)} >
                      <option>Select State</option>
                      {this.state.StateData.map((e, key) => {
                        return <option key={key} value={e.state}>{e.state}</option>;
                      })}
                    </select>

                    <select className="form-control mb-3" name="district" id="districtInput" value={DistrictId} onChange={(e) => this.handleChange(e, 'DistrictId')}>
                      <option>Select District</option>
                      {this.state.DistrictData.map((e, key) => {
                        return <option key={key} value={e.district}>{e.district}</option>;
                      })}
                    </select>

                    <input class="form-control mb-3" id="CourtInput" value={court} onChange={(e) => this.handleChange(e, 'court')} />
                  </div>
                  <div class="form-group mx-5">
                    <label for="lawInput">Search Law</label>
                    <LawAutoComplete value={ipc} onChange={(e) => this.handleChange(e, 'ipc')} />
                  </div>
                  <div class="text-center">
                    <button class=" rounded form-btn mb-5" onClick={this.addLawHandler}>File</button>
                  </div>
                </div>
              </form></div>
            <div className="col-2  "></div>
          </div>

        </div>
      </>
    )
  }
}
