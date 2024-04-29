import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Graph from './components/Graph/Graph';
import About from './components/About/About';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={(
              <Graph />
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
      </UserProvider>

    </BrowserRouter>
  );
}

export default App;
