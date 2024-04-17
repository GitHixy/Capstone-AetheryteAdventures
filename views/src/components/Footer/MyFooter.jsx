import React from 'react';
import styles from './MyFooter.module.css';

const MyFooter = () => {

const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>© {currentYear} Aetheryte Adventures is a Final Fantasy XIV Fan Site. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default MyFooter;
