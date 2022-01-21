import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import BootstrapTable from 'react-bootstrap-table-next';
<script src="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table.min.js" />


export default class CaseReport extends Component {

  constructor(props) {
    super(props)

    this.state = {
      products: [],
      caseData: []
    }
    const { products } = this.state;

  }

  componentDidMount() {
    //Replace with current user name 
    const obj = {
      userId: "Vageesan@gmail.com",
      role: "public"
    };
    axios.post("http://localhost:5000/getCaseByUser", qs.stringify(obj)).then(
      (result) => {
        console.log(result.data.cases)
        this.setState({
          caseData: result.data.cases
        });
      }).catch((err) => {
        console.log("Something went wrong");
      })
  }
  render() {
    const caseColumns = [{
      dataField: '_id',
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
      text: 'IPC Section'
    }, {
      dataField: 'casestatus',
      text: 'Status'
    }];

    var products = [{
      id: 1,
      name: "Product1",
      price: 120
    }, {
      id: 2,
      name: "Product2",
      price: 80
    }];
    return (
      <>
        <link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css">
        </link>
        <div className='container body-container'>
          
          <BootstrapTable keyField='id' data={this.state.caseData} columns={caseColumns} />
        </div>
      </>
    );
  }
}