import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

export default class AddLaw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chapter: '',
      ipc: '',
      validationError:''
    }
  }
componentDidMount() {
    if((!localStorage.getItem("isLoggedIn"))||(localStorage.getItem("role")!="admin")){
      this.goToHome();
    }
  }

  addLawHandler = (e) => {
    e.preventDefault();
    const { chapter, ipc } = this.state;
    const obj = {
      chapter:chapter,
      ipc:ipc
    };
      axios.post("http://localhost:5000/addLaw", qs.stringify(obj)).then(
        (result) => {
          this.setState({
            validationError: '',
            chapter:'',
            ipc:''
        });
        }).catch((err) => {
          this.setState({
            validationError: err.response.data
          
        });
        })
  
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

clearHandler=(e)=>{
  e.preventDefault();
  this.setState({
    chapter: '',
      ipc: '',
    validationError: ''
  })
}

  render() {
    const {chapter, ipc,validationError} = this.state;
    return (
      <>
        <div className="container mt-5">
          <div class="mx-5 row">
            <div className="col-1"></div>
            <div className="col-9 shadow m-5 border rounded form-container">
              <h3 class="form-header mt-4">Add Law</h3>
              <form>
                <div class="form-group mx-5">
                  <label for="chapterInput">Chapter</label>
                  <input class="form-control mb-2" id="chapterInput" value={chapter} onChange={(e) => this.handleChange(e, 'chapter')} />
                  <span className="text-danger mb-3">{validationError.chapter}</span>
                </div>
                <div class="form-group mx-5 mt-2">
                  <label for="lawInput">IPC Section</label>
                  <textarea class="form-control mb-2" id="lawInput" value={ipc} onChange={(e) => this.handleChange(e, 'ipc')}/>
                  <span className="text-danger mb-3">{validationError.ipc}</span>
                </div>
                <div class="text-center" mb-3>
                  <button class=" rounded form-btn mt-5 mb-2" onClick={this.addLawHandler}>Submit</button>
                  <span>        </span>
                  <button class=" rounded form-btn mt-5 mb-2" onClick={this.clearHandler}>Clear</button>
                </div>
                <span className="text-danger mb-3">{validationError.message}</span>

              </form></div>
            <div className="col-2  mt-4"></div>
          </div>

        </div>
      </>
    )
  }
}
