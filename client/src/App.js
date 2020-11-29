import React from 'react';
import AppNavbar from './components/AppNavbar'
import GradientCI from './components/GradientCI'
// import GaussianLines from './components/GaussianLines';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Questions from './components/Questions';


function App() {
  return (
    <div>
      <div className="App">
        <AppNavbar></AppNavbar>
      </div>
      <div>
        <div class="row">
          <div class="col-md-6">
            <div class="row Test" >
              <GradientCI />
            </div>
          </div>

          <div class="col-md-6">
            <Questions />
          </div>

        </div>





        <div class="row">
          <div class="mx-auto">
            {/* <GaussianLines /> */}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
