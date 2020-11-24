// import React from 'react';
import React, { Component } from 'react'
import Navbar from './components/Navbar/Navbar'
import GradientCI from './components/GradientCI'
import GaussianLines from './components/GaussianLines';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Questions from './components/Questions';
import Questions2 from './components/Questions-2';
// import Navbar from 'reactstrap/lib/Navbar';


class App extends Component {
  render() {
    const id = sessionStorage.getItem('id');
    console.log(id);
    return (
      <div id="container1">
        <div className="App container2">
          <Navbar></Navbar>
        </div>
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
            <br/><br/><br/><br/>
            <GradientCI></GradientCI>
            <div class="gapDiv"></div>
              <GaussianLines></GaussianLines>
              <div class="gapDiv"></div>
              <GradientCI></GradientCI>
            </div>

            <div className=" col-lg-6 col-md-12 col-sm-12">
              <Questions />
            </div>

          </div>
          {/* className={"an-existing-class " + (conditionIsSomething ? 'aClassIsAdded' : ' ')}> */}
          {/* <div className={"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden')}></div> */}
          {/* className={"row hide" + (id ? 'show' : 'hide')} */}
          {/* <div >
            <div className="col-md-6">
              <GaussianLines />
            </div>

            <div className="col-md-6">
              {/* <Questions2 /> */}
            {/* </div>
          </div> */}

        </div>
      </div>


    );
  }
}
export default App;
