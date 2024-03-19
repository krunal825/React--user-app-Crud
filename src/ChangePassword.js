import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        try {
            const response = await axios.put('http://localhost:3000/api/user/password', {
                currentPassword,
                newPassword,
                confirmNewPassword,
                email
            },
            {
                headers: {
                    Authorization: `${token}`,
                }
            });
    
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
    
            setSuccessMessage(response.data.message);
            setErrorMessage("");
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');

        window.location.href = '/login';
    };

    return (
        <div>
            <h2>Change Password</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleChangePassword}>
                <div>
                    <label>Current Password:</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm New Password:</label>
                    <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ChangePassword;
