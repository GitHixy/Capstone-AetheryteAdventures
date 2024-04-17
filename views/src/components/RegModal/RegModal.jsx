import React, { useState } from 'react';
import styles from './RegModal.module.css';

const RegModal = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleAvatarChange = (event) => setAvatar(event.target.files[0]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ username, email, password, avatar });
        onClose(); 
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
            <button onClick={onClose} className={styles.closeButton}>x</button>
                <h2>Register</h2>
                
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={handleUsernameChange} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={handleEmailChange} required />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={handlePasswordChange} required />
                    </label>
                    <label>
                        Upload Avatar:
                        <input type="file" onChange={handleAvatarChange} />
                    </label>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegModal;
