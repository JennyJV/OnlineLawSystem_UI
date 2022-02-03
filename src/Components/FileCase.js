import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
<script src="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table.min.js" />


export default class FileCase extends Component {

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
    axios.post("http://localhost:5000/getAcceptedCases", qs.stringify(obj)).then(
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

  fileHandler = (e) => {
    const { caseToFile } = this.state;
    alert(caseToFile);
    alert(e);
    const obj = {
      caseId: caseToFile,
      status: e
    };
    axios.post("http://localhost:5000/updateCaseStatus", qs.stringify(obj)).then(
      (result) => {
        this.setState({
          message: "Case filed successfully!"
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
    const { caseToFile } = this.state;
    return (
      <>
      <form>
        <link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css">
        </link>
        <div className='container body-container'>
        <div align="center">
          <select className="mb-3" name="caseSelect" id="caseSelect" value={caseToFile} onChange={(e) => this.handleChange(e, 'caseToFile')}>
            <option>Select a Case ID</option>
            {this.state.caseData.map((e, key) => {
              return <option key={key} value={e.caseID}>{e.caseID}</option>;
            })}
          </select>
          <div align="center">
          <button class=" rounded form-btn  mb-5" onClick={(e) => this.fileHandler("Filed")}>File</button>
         </div>
         </div>
         <h3 class="form-header mt-4">Accepted Case Report</h3>
          <BootstrapTable keyField='caseID' data={this.state.caseData} columns={caseColumns} striped hover  pagination={paginationFactory()} />
        </div>
        </form>
      </>
    );
  }
}