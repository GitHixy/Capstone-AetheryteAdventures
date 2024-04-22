import React from 'react';
import styles from './AchievementCard.module.css'; 

const AchievementCard = ({ achievement }) => {
    return (
        <div className={styles.card}>
            <img className={styles.icon} src={achievement.icon} alt={achievement.name} />
            <h3>{achievement.name}</h3>
            <p>{achievement.description}</p>
            <div>
            <p><strong>Patch:</strong> <br /> {achievement.patch}</p>
                <p><strong>Category:</strong> <br/> {achievement.category.name}</p>
            </div>
            <p ><strong>Owned by {achievement.owned} of Players</strong></p>
        </div>
    );
};

export default AchievementCard;
