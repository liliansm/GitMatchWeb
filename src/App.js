import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import ForgotPasswordPage from './views/ForgotPasswordPage';
import ResetCodePage from './views/ResetCodePage';
import NewPasswordPage from './views/NewPasswordPage'; 
import UpdatePasswordPage from './views/UpdatePasswordPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-code" element={<ResetCodePage />} />
        <Route path="/new-password" element={<NewPasswordPage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
        
        {/* Exemplo de rotas futuras:
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/company-profile" element={<CompanyProfilePage />} />
        */}
      </Routes>
    </Router>
  );
}