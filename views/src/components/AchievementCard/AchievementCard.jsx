import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { addAchievementToFavourites, removeAchievementFromFavourites } from '../../redux/favsAchiSlice/favsAchiSlice';
import styles from './AchievementCard.module.css'; 
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";

const AchievementCard = ({ achievement, isFavorited}) => {
    const [isSaved, setIsSaved] = useState(isFavorited);
    const dispatch = useDispatch();
    const token = localStorage.getItem('auth');
    const userId = localStorage.getItem('userId');
    
    const toggleFavorite = () => {
        const newIsSaved = !isSaved;
        setIsSaved(newIsSaved);       
        if(token) {
            if(newIsSaved) {
                dispatch(addAchievementToFavourites({userId: userId, achievementId: achievement.id}));
            } else {
                dispatch(removeAchievementFromFavourites({userId: userId, achievementId: achievement.id}));
            }
        } 
    };

    useEffect(() => {
        setIsSaved(isFavorited);
    }, [isFavorited]);

    return (
        <div className={styles.card}>   
             {token && userId ? (
            isSaved ? 
            (<BsBookmarkHeartFill onClick={toggleFavorite} className={styles.bookmark}/>) :
            (<BsBookmarkHeart onClick={toggleFavorite} className={styles.bookmark}/>)
            ) : null }
           
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
