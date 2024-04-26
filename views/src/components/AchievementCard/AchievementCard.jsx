import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addAchievementToFavourites } from '../../redux/favsSlice/favsSlice';
import { fetchUserById } from '../../redux/userSlice/userSlice';
import styles from './AchievementCard.module.css'; 
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";

const AchievementCard = ({ achievement }) => {
    const [isSaved, setIsSaved] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user.user);
    const token = localStorage.getItem('auth');
    const userId = localStorage.getItem('userId');
    
    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById(userId));
        }
    }, [dispatch]);

    useEffect(() => {
        console.log("User:", user);
    console.log("Achievements in Favourites:", user?.favourites?.achievements);
        
    }, [user, achievement.id]);

    const handleSelection = () => {
        const newIsSaved = !isSaved;
        setIsSaved(newIsSaved);       
        if(token) {
            if(newIsSaved) {
                dispatch(addAchievementToFavourites({userId: userId, achievementId: achievement.id}));
            } else {
                // LA DELETE X ID VA QUI
            }
        } 
    };

    return (
        <div className={styles.card}>   
             {token && isSaved ? <BsBookmarkHeartFill onClick={handleSelection} className={styles.bookmark}/> : <BsBookmarkHeart onClick={handleSelection} className={styles.bookmark}/>}           
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
