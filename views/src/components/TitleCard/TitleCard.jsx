import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import styles from './TitleCard.module.css';
import {addTitleToFavourites, removeTitleFromFavourites} from '../../redux/favsTitleSlice/favsTitleSlice';
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";

const TitleCard = ({ title, isFavorited }) => {
    const [isSaved, setIsSaved] = useState(isFavorited);
    const dispatch = useDispatch();
    const token = localStorage.getItem('auth');
    const userId = localStorage.getItem('userId');
    
    const toggleFavorite = () => {
        const newIsSaved = !isSaved;
        setIsSaved(newIsSaved);       
        if(token) {
            if(newIsSaved) {
                dispatch(addTitleToFavourites({userId: userId, titleId: title.id}));
            } else {
                dispatch(removeTitleFromFavourites({userId: userId, titleId: title.id}));
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
            ) : null}
            <img src={title.icon} alt={title.name} className={styles.icon} />
            <h2 className={styles.title}>{title.name}</h2>
            <p>{title.achievement.description}</p>
            <div className={styles.details}>
                <p><strong>Patch:</strong> {title.patch}</p>              
                <p><strong>Owned by: {title.owned} of players</strong></p>
            </div>
        </div>
    );
};

export default TitleCard;
