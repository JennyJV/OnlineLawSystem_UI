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
      caseData: [],
      validationError:''
    }

  }

  componentDidMount() {
    if(!localStorage.getItem("isLoggedIn")){
      this.goToHome();
    }else{
    //Replace with current user name 
    const obj = {
      userId: localStorage.getItem("user")
    };
    axios.post("http://localhost:5000/getnewCases", qs.stringify(obj)).then(
      (result) => {
        console.log(result.data.cases)
        this.setState({
          caseData: result.data.cases,
          validationError:''
        });
      }).catch((err) => {
        this.setState({
          validationError: err.response.data,
          caseData:[]
        });
      })
  }
}
  goToHome = () => {
    this.props.history.push('/');
}
  handleChange = (e, field) => {
    const val = e.target.value;
    this.setState({
      validationError:'',
      [field]: val
    });
  }
  verifyHandler = (e) => {
    const { caseToVerify } = this.state;

    const obj = {
      caseId: caseToVerify,
      status: e
    };
    axios.post("http://localhost:5000/updateCaseStatus", qs.stringify(obj)).then(
      (result) => {
        this.setState({
          validationError:'',
          message: "Case status changed successfully!"
        });
      }).catch((err) => {
        this.setState({
          validationError: err.response.data,
          caseData:[]
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
    const { caseToVerify,validationError } = this.state;
    return (
      <>
      <form>
        <link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css">
        </link>
        <div className='container body-container'>
        <div align="center">
          <select className="mb-3" name="caseSelect" id="caseSelect" value={caseToVerify} onChange={(e) => this.handleChange(e, 'caseToVerify')}>
            <option>Select a Case ID</option>
            {this.state.caseData.map((e, key) => {
              return <option key={key} value={e.caseID}>{e.caseID}</option>;
            })}
          </select>
          <div align="center">
          <button class=" rounded form-btn  mb-5" onClick={(e) => this.verifyHandler("Accepted")}>Accept</button>
          <button class=" rounded form-btn mx-3 mb-5" onClick={(e) => this.verifyHandler("Rejected")}>Reject</button>
         </div>
         </div>
         <h3 class="form-header mt-4">New Case Report</h3>
          <BootstrapTable keyField='caseID' data={this.state.caseData} columns={caseColumns} striped hover  pagination={paginationFactory()} />
          <span className="text-danger mb-3">{validationError.message}</span>
        </div>
        </form>
      </>
    );
  }
}