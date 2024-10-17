import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Home from './screens/Home';
import AddEntry from './screens/AddEntry';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path='/addEntry' element={<AddEntry/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 