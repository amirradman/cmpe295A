import React from 'react';
import Navbar from './components/Navbar/Navbar';
import GradientCI from './components/GradientCI'
// import GaussianLines from './components/GaussianLines';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Questions from './components/Questions';


function App() {
  return (
    <div>
      <div className="App">
        <Navbar></Navbar>
      </div>
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="row Test" >
              <GradientCI />
            </div>
          </div>

          <div className="col-md-6">
            <Questions />
          </div>

        </div>





        <div className="row">
          <div className="mx-auto">
            {/* <GaussianLines /> */}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
