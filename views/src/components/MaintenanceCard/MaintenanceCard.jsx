import React from 'react';
import styles from './MaintenanceCard.module.css';

function MaintenanceCard({ url, title, time}) {
  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>
        <p className={styles.date}>Posted: {formatDate(time)}</p>
        <a href={url} className={styles.link}>More Details</a>
      </div>
    </div>
  );
}

export default MaintenanceCard;
