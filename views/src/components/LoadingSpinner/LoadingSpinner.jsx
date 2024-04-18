import React from 'react';
import loadingChocobo from '../../assets/LoadingChocobo.gif'
import styles from './LoadingSpinner.module.css'

const LoadingSpinner = () => {
    return (
        <div className={styles.spinnerContainer}>
            <img className={styles.spinnerImg} src={loadingChocobo} alt="Loading..." />
        </div>
    );
};

export default LoadingSpinner;
