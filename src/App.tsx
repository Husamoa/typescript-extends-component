import React from 'react';
import './App.css';
import BaseComponent from "./components/BaseComponent";
import ComponentA from "./components/ComponentA";
import ComponentB from "./components/ComponentB";

function App() {
  return (
    <div className="App">
      <BaseComponent />
      <ComponentA />
      <ComponentB />
    </div>
  );
}

export default App;
