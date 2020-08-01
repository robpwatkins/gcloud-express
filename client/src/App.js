import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Yooooo <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={async () => {
          const response = await fetch('/pups');
          const body = await response.json();
          console.log(body);
          }}>click ME!</button>
      </header>
    </div>
  );
}

export default App;
