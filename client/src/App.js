import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './components/BarChart'

function getData() {
  return fetch("http://localhost:5000/api/todos")
    .then(res => res.json());
}

function App() {
  // Declare a new state variable
  const [chartData, setData] = useState([]);

  async function updateBarData() {
    let data = await getData()
    setData(data);
  }

  useEffect(() => { updateBarData(); }, []);

  return (
    <div className="App" style={{padding: 10}}>
      {/* <header className="App-header"> */}
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      {/* </header> */}
      <div>
        <button onClick={updateBarData}>Data</button>
        <BarChart data={chartData} size={[500, 100]} barpadding={1}/>
      </div>
    </div>
  );
}

export default App;
