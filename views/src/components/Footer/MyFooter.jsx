import React from 'react';
import styles from './MyFooter.module.css';
import FooterLogo from '../../assets/footerImg.jpg';

const MyFooter = () => {

const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        
        <img src={FooterLogo} alt="Footer Logo" />
        <p>© {currentYear} Aetheryte Adventures is a Final Fantasy XIV Fan Site. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default MyFooter;
