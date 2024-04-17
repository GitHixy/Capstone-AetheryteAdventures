import React, {useState} from 'react';
import styles from './MyNav.module.css';
import logo from '../../assets/Aetheryte Adventures.png'; 
import RegModal from '../RegModal/RegModal';

const MyNav = () => {

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);


  return (
    <nav className={styles.navbar}>
    <div className={styles.logoContainer}>
      <a href="/">
        <img src={logo} alt="Final Fantasy Logo" className={styles.logo} />
      </a>
    </div>
    <div className={styles.navLinks}>
      <ul className={styles.navList}>
        <li className={styles.navItem}><a href="/">Home</a></li>
        <li className={styles.navItem}><a href="/about">About</a></li>
        <li className={styles.navItem}><a href="/contact">Contact</a></li>
        <li className={styles.navItem}><a href="/login">Login</a></li>
        <li className={styles.navItem}><a href='#' onClick={handleOpenModal} role="button">Register</a></li>
      </ul>
    </div>
    <RegModal isOpen={isModalOpen} onClose={handleCloseModal} />
  </nav>
  );
}

export default MyNav;