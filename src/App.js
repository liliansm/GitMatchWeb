import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import ForgotPasswordPage from './views/ForgotPasswordPage';
import ResetCodePage from './views/ResetCodePage';
import NewPasswordPage from './views/NewPasswordPage'; 
import UpdatePasswordPage from './views/UpdatePasswordPage';
import HomePage from './views/HomePage';
import ProfilePage from './views/ProfilePage';
import NotificationPage from './views/NotificationPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-code" element={<ResetCodePage />} />
        <Route path="/new-password" element={<NewPasswordPage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />


        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notification" element={<NotificationPage />} />
        
      </Routes>
    </Router>
  );
}