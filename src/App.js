
import './App.css';
import { Routes, Route } from 'react-router-dom';


import React from 'react'
import AdminRegistration from './pages/admin/AdminRegistration';
import AdminLogin from './pages/admin/AdminLogin';

import EmailVerify from './pages/admin/EmailVerify';
import CustomerRegistration from './pages/customer/CustomerRegistration';
import Dashboard from './pages/admin/Dashboard';




const App = () => {
  return (

    <Routes>
      <Route path='/' element={<AdminRegistration />} />
      <Route path='/admin-registration' element={<AdminRegistration />} />

      <Route path='/admin-login' element={<AdminLogin />} />

      <Route path='/dashboard' element={<Dashboard />} />


      <Route path='/verify-email/:id' element={<EmailVerify />} />

      <Route path='/customer-registration' element={<CustomerRegistration />} />


    </Routes>

  )
}

export default App;
