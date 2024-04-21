import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.css';
import MyNav from '../../components/Navbar/MyNav';
import MyFooter from '../../components/Footer/MyFooter';
import Sidebar from '../../components/Sidebar/Sidebar';

const ErrorPage = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);

    
    const handleRedirect = () => {
        navigate('/');
    };

    useEffect(() => {
        if (countdown === 0) {
            handleRedirect(); 
            return;
        }
        const timer = setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);

        
        return () => clearTimeout(timer);
    }, [countdown]);

    return (
        <>
        <MyNav/>
        <Sidebar/>
        <div className={styles.container}>
            <h1 className={styles.title}>Aetheric Disturbance Detected - Error 404</h1>
            <p className={styles.message}>
            Alas, the page you sought to reach has been swallowed by the void. <br/> Fear not, for the energies will realign in {countdown} seconds, returning you safely to known lands.
            </p>
            <a href="/" className={styles.link} onClick={handleRedirect}
            >Return to Home</a>
        </div>
        <MyFooter/>
        </>
    );
};

export default ErrorPage;
