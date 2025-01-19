import React, { useState } from 'react'
import DisplayTimer from './Timer'
import AddProject from './AddProject'
import DisplayListButton from './ProjectsTable'
import DeleteButton from './DeleteProject'
import EditButton from './EditProject'
import Login from './Login'
import Navbar from './NavBar'
import Register from './Register'
import NavAdmin from './NavAdmin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TimerInterval from './TimeIntervals'
import UserSettings from './UserSettings'
import DisplayUsers from './DisplayUsers'
import RegisterAdmin from './RegisterAdmin'
import { register } from './services/AuthService'
import { createAdmin } from './services/AdminService'
import DeleteUserForm from './AdminDeleteUser'

function App() {
  return (
    <>
    <BrowserRouter>
     <Navbar />
      <Routes>
          <Route exact path="/admin" element={<NavAdmin />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/add" element={<AddProject />} />
          <Route exact path="/register" element={<Register registerFunction={register} text={"User"}/>} />
          <Route exact path="/intervals" element={<TimerInterval />} />
          <Route exact path="/" element={<TimerComponents />} />
          <Route exact path="/user" element={<UserSettings />} />
          <Route exact path="/admin/users" element={<DisplayUsers />} />
          <Route exact path="/admin/register-admin" element={<RegisterAdmin registerFunction={createAdmin} text={"Admin"}/>} />
          <Route exact path="/admin/delete" element={<DeleteUserForm />} />
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
