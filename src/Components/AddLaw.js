import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

export default class AddLaw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chapter: '',
      ipc: ''
    }
  }

  addLawHandler = () => {
    const { chapter, ipc } = this.state;
    const obj = {
      chapter:chapter,
      ipc:ipc
    };
    console.log(chapter);
    console.log(ipc);
      axios.post("http://localhost:5000/addLaw", qs.stringify(obj)).then(
        (result) => {
          this.setState({
          message:"Law added successfully!"
          });
        }).catch((err) => {
            this.setState({
                error: "Something went wrong"
            });
        })
  
  }

  handleChange = (e, field) => {
    const val = e.target.value;
    this.setState({
        [field]: val
    });
}

  render() {
    const {chapter, ipc} = this.state;
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
                  <input class="form-control mb-3" id="chapterInput" value={chapter} onChange={(e) => this.handleChange(e, 'chapter')} />
                </div>
                <div class="form-group mx-5">
                  <label for="lawInput">IPC Section</label>
                  <textarea class="form-control mb-3" id="lawInput" value={ipc} onChange={(e) => this.handleChange(e, 'ipc')}/>
                </div>
                <div class="text-center">
                  <button class=" rounded form-btn mb-5" onClick={this.addLawHandler}>Submit</button>
                </div>
              </form></div>
            <div className="col-2  "></div>
          </div>

        </div>
      </>
    )
  }
}
