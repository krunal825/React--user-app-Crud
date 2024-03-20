import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                email,
                password
            });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.email);
            
            setSuccessMessage(response.data.message);
            setErrorMessage('');

          
            window.location.href = '/changepassword';
        } catch (error) {
          
            if (error.response) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h2>User Login</h2>
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
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
    );
};

export default UserLogin;
