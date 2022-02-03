import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
<script src="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table.min.js" />


export default class CaseReport extends Component {

  constructor(props) {
    super(props)

    this.state = {
      caseByYear:'',
      caseByType:'',
      caseData: [],
      noData: false,
      years: []
    }

  }

  componentDidMount() {
    //Replace with current user name 
    const obj = {
      userId: "V@gmail.com",
      role: "admin"
    };
    axios.post("http://localhost:5000/getCaseByUser", qs.stringify(obj)).then(
      (result) => {
        alert(result.data.cases.length);
        this.setState({
          caseData: result.data.cases,
          years: result.data.years
        });
        if(this.state.caseData.length<1){
          this.setState({noData: true});
        }
      }).catch((result) => {
        alert("catch");
        this.setState({
          caseData: []
        });
           console.log("Something went wrong");
      })
  }
  handleChange = (e, field) => {
    const val = e.target.value;
    this.setState({
        [field]: val
    });
}

filterHandler = (e) => {
  e.preventDefault();
  const { caseByType, caseByYear } = this.state;
  const obj = {
    caseByType:caseByType,
    caseByYear:caseByYear
  };
  alert(caseByType);
  alert(caseByYear);
    axios.post("http://localhost:5000/FilterCase", qs.stringify(obj)).then(
      (result) => {
        this.setState({
          caseData: result.data.cases
        });
      }).catch((err) => {
        
          this.setState({
            caseData:[],
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
      dataField: 'lawyer',
      text: 'Lawyer'
    }, {
      dataField: 'ipc',
      text: 'IPC Section',
      sort: true
    }, {
      dataField: 'caseType',
      text: 'Case Type',
      sort: true
    } ,{
      dataField: 'year',
      text: 'Year',
      sort: true
    }, {
      dataField: 'casestatus',
      text: 'Status',
      sort: true
    }];
    const {caseByYear, caseByType} = this.state;
    
    return (
      <>
        <link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css">
        </link>
        <div className='container body-container'>
          <h3 class="form-header mt-4">Case Report</h3>
          <form>
          <div align="right">
            <select class="mb-3" id="caseTypeInput" value={caseByType} onChange={(e) => this.handleChange(e, 'caseByType')}>
              <option>Select Case Type</option>
              <option value="Civil">Civil</option>
              <option value="Criminal">Criminal</option>
            </select>
            <select class=" mx-3" id="caseYearInput" value={caseByYear} onChange={(e) => this.handleChange(e, 'caseByYear')}>
              <option>Select Year</option>
              {this.state.years.map(filedYear => {
                return <option key={filedYear} value={filedYear}>{filedYear}</option>;
              })}
            </select>
            <button class=" rounded form-btn mb-5"  onClick={this.filterHandler}>Filter</button>
          </div>
          </form>
          
          <BootstrapTable keyField='caseID' data={this.state.caseData} columns={caseColumns} striped hover condensed pagination={paginationFactory()} />
          
        </div>
      </>
    );
  }
}