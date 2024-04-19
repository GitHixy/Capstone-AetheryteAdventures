import React from "react";
import styles from './NewsCard.module.css';

const NewsCard = ({ id, url, title, time, image, description, category }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {title}
          </a>
        </h2>
        <p className={styles.date}>{new Date(time).toLocaleDateString()}</p>
        <span className={styles.category}>{category}</span>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;