import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import AppNavbar from './components/AppNavbar'
import GradientCI from './components/GradientCI'
import GaussianLines from './components/GaussianLines'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import ReactTooltip from 'react-tooltip'

function App() {
  return (
  	<div>
    	<div className="App">
      <AppNavbar></AppNavbar>
    </div>
    <div>
      <GradientCI/>
      < ReactTooltip id="tip">
      </ReactTooltip>
	</div>
  <div>
    <GaussianLines/>
  </div>
	</div>
  );
}

export default App;
