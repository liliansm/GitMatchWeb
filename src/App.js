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
import CompanyProfilePage from './views/CompanyProfilePage';
import EditCompanyProfilePage from './views/EditCompanyProfilePage';
import CompanyJobsPage from './views/CompanyJobsPage';
import CreateJobsPage from './views/CreateJobsPage.jsx';
import EditJobsPage from './views/EditJobsPage.jsx';
import RHMatchPage from './views/RHMatchPage.jsx';



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
        
        <Route path="/company-profile" element={<CompanyProfilePage />} />
        <Route path="/edit-company-profile" element={<EditCompanyProfilePage />} />
        <Route path="/company-jobs" element={<CompanyJobsPage />} />
        <Route path="/criar-vaga" element={<CreateJobsPage />} />
        <Route path="/editar-vaga" element={<EditJobsPage />} />
        <Route path="/rh-match" element={<RHMatchPage />} />

      </Routes>
    </Router>
  );
}