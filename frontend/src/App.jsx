import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CircularForm from './pages/CircularForm';
import ProposalForm from './pages/ProposalForm';
import ReportForm from './pages/ReportForm';
import History from './pages/History';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return <Layout>{children}</Layout>;
};

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/circular"
                element={
                    <ProtectedRoute>
                        <CircularForm />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/proposal"
                element={
                    <ProtectedRoute>
                        <ProposalForm />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/report"
                element={
                    <ProtectedRoute>
                        <ReportForm />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/history"
                element={
                    <ProtectedRoute>
                        <History />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
