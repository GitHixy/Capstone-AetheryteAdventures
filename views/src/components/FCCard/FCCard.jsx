import React from 'react';
import styles from './FCCard.module.css';

const FCCard = ({ fc, onClick }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{fc.name}</h2>
      <img className={styles.fcLogo} src={fc.image}/>
      <h3 className={styles.description}>{fc.server}</h3>
      <button onClick={onClick} className={styles.recruitButton}>Details</button>
    </div>
  );
}

export default FCCard;
