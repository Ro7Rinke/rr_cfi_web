import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Home from './screens/Home';
import AddEntry from './screens/AddEntry';
import EntryDetails from './screens/EntryDetails';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRouter';
import Register from './screens/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path='/add-entry' element={<ProtectedRoute><AddEntry/></ProtectedRoute>} />
          <Route path='/entry-details' element={<ProtectedRoute><EntryDetails /></ProtectedRoute>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 