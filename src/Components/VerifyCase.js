import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
<script src="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table.min.js" />


export default class VerifyCase extends Component {

  constructor(props) {
    super(props)

    this.state = {
      caseData: []
    }

  }

  componentDidMount() {
    //Replace with current user name 
    const obj = {
      userId: "Latha@gmail.com"
    };
    axios.post("http://localhost:5000/getnewCases", qs.stringify(obj)).then(
      (result) => {
        console.log(result.data.cases)
        this.setState({
          caseData: result.data.cases
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
  verifyHandler = (e) => {
    const { caseToVerify } = this.state;
    alert(caseToVerify);
    alert(e);
    const obj = {
      caseId: caseToVerify,
      status: e
    };
    axios.post("http://localhost:5000/verifyCase", qs.stringify(obj)).then(
      (result) => {
        this.setState({
          message: "Case status changed successfully!"
        });
      }).catch((err) => {
        this.setState({
          error: "Something went wrong"
        });
      })
  }
  render() {
    const caseColumns = [{
      dataField: 'caseID',
      text: 'Case ID'
    }, {
      dataField: 'petitionerName',
      text: 'Petitioner Name'
    },
    {
      dataField: 'petitionerEmail',
      text: 'Petitioner Email'
    },
    {
      dataField: 'accusedName',
      text: 'Accused Name'
    },
    {
      dataField: 'accusedAddress',
      text: 'Accused Address'
    }, {
      dataField: 'court',
      text: 'Court'
    }, {
      dataField: 'ipc',
      text: 'IPC Section'
    }, {
      dataField: 'casestatus',
      text: 'Status'
    }];
    const { caseToVerify } = this.state;
    return (
      <>
      <form>
        <link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css">
        </link>
        <div className='container body-container'>
          <select className="form-control mb-3" name="caseSelect" id="caseSelect" value={caseToVerify} onChange={(e) => this.handleChange(e, 'caseToVerify')}>
            <option>Select a CaseId</option>
            {this.state.caseData.map((e, key) => {
              return <option key={key} value={e.caseID}>{e.caseID}</option>;
            })}
          </select>
          <button class=" rounded form-btn mx-5 mb-5" onClick={(e) => this.verifyHandler("Accepted")}>Accept</button>
          <button class=" rounded form-btn mx-5 mb-5" onClick={(e) => this.verifyHandler("Rejected")}>Reject</button>
          <BootstrapTable keyField='caseID' data={this.state.caseData} columns={caseColumns} striped hover condensed pagination={paginationFactory()} />
        </div>
        </form>
      </>
    );
  }
}