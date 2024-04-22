import React from 'react';
import styles from './TitleCard.module.css';

const TitleCard = ({ title }) => {

    console.log("Title data:", title);
    return (
        <div className={styles.card}>
            <img src={title.icon} alt={title.name} className={styles.icon} />
            <h2 className={styles.title}>{title.name}</h2>
            <p>{title.achievement.description}</p>
            <div className={styles.details}>
                <p><strong>Patch:</strong> {title.patch}</p>              
                <p><strong>Owned by:</strong> {title.owned} of players</p>
            </div>
        </div>
    );
};

export default TitleCard;
