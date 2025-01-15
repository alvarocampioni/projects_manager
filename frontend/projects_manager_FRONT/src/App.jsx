import React, { useState } from 'react'
import DisplayTimer from './Timer'
import AddProject from './AddProject'
import DisplayListButton from './ProjectsTable'
import DeleteButton from './DeleteProject'
import EditButton from './EditProject'
import Login from './Login'
import Navbar from './NavBar'
import Register from './Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TimerInterval from './TimeIntervals'

function App() {
  return (
    <>
    <BrowserRouter>
     <Navbar />
      <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/add" element={<AddProject />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/intervals" element={<TimerInterval />} />
          <Route exact path="/" element={<TimerComponents />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

function TimerComponents() {
  return <div>
    <DisplayTimer workDuration={5} restDuration={11} />
    <DeleteButton />
    <EditButton />
    <DisplayListButton />
  </div>
}

export default App;
