// import React from 'react';
import React, { Component } from 'react'
import Navbar from './components/Navbar/Navbar'
import GradientCI from './components/GradientCI'
import GaussianLines from './components/GaussianLines';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Questions from './components/Questions';
import HOP from './components/HOP';
//Add comment to test
class App extends Component {
  render() {
    const id = sessionStorage.getItem('id');
    console.log(id);

    return (
      <div id="container1">
        <div className="App container2">
          <Navbar></Navbar>
        </div>
        {/* <div> */}
          <div className="row">
            {/* graph */}
            <div class="boxSize1">
              <br /><br /><br /><br />
              <GradientCI></GradientCI>
              <div class="gapDiv"></div>
              <GaussianLines></GaussianLines>
              <div class="gapDiv"></div>
              <HOP></HOP>
            </div>

            {/* questions  */}
            <div class="boxSize2">
              <Questions />
            </div>

          </div>
        {/* </div> */}
      </div>


    );
  }
}
export default App;
