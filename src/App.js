// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserRegistration from './UserRegistration';
import UserLogin from './UserLogin';
import ChangePassword from './ChangePassword';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/register" element={<UserRegistration />} />
                    <Route path="/changepassword" element={<PrivateRoute />} />
                </Routes>
            </div>
        </Router>
    );
};

const PrivateRoute = () => {
    const token = localStorage.getItem('token');

    return (
        token ? <ChangePassword /> : <Navigate to="/login" />
    );
};

export default App;
