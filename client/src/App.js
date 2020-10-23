import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar'
import GradientCI from './components/GradientCI'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  return (
  	<div>
    	<div className="App">
      <AppNavbar></AppNavbar>
    </div>
    <div>
      <GradientCI/>
	</div>
	</div>
  );
}

export default App;
