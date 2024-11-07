import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Employee from './components/Employee';
import Navbar from './components/Navbar';
import Project from './components/Project';
import Equipment from './components/Equipment';
import WorkerSchedule from './components/WorkerSchedule';
import './App.css';

function App() {
  return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/employee" element={<Employee/>} />
        <Route path="/projects" element={<Project/>} />
        <Route path="/equipment" element={<Equipment/>}/>
        <Route path="/workerschedule" element={<WorkerSchedule/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
