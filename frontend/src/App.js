import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Graph from './components/Graph/Graph';
import About from './components/About/About';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={(
            <Graph
              initialNodes={[{ x: 400, y: 300 }]}
              initialLinks={[]}
              width={1500}
              height={800}
            />
          )}
        />
        <Route
          path="/about"
          element={(
            <About />
          )}
        />
        <Route
          path="/login"
          element={(
            <Login />
          )}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
