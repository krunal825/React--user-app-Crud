// UserRegistration.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const UserRegistration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/api/user', {
                email,
                password,
                confirmPassword
            });

            setSuccessMessage(response.data.message);
            setErrorMessage('');
            window.location.href = '/login';
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>User Registration</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>All ready have an account? <Link to="/login">Please Login</Link></p>

        </div>
    );
};

export default UserRegistration;
