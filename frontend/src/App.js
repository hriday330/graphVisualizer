import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Graph from './components/Graph/Graph';
import './App.css';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Graph initialNodes={[{ x: 400, y: 300 }]} initialLinks={[]} width={1500} height={800} />
  );
}

export default App;
