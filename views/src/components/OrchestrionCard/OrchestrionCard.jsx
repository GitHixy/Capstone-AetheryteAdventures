import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {addOrchestrionToFavourites, removeOrchestrionFromFavourites} from '../../redux/favsOrchestrionSlice/favsOrchestrionSlice';
import styles from './OrchestrionCard.module.css'; 
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";

const OrchestrionCard = ({ orchestrion, isFavorited }) => {
    const [isSaved, setIsSaved] = useState(isFavorited);
    const dispatch = useDispatch();
    const token = localStorage.getItem('auth');
    const userId = localStorage.getItem('userId');
    
    const toggleFavorite = () => {
        const newIsSaved = !isSaved;
        setIsSaved(newIsSaved);       
        if(token) {
            if(newIsSaved) {
                dispatch(addOrchestrionToFavourites({userId: userId, orchestrionId: orchestrion.id}));
            } else {
                dispatch(removeOrchestrionFromFavourites({userId: userId, orchestrionId: orchestrion.id}));
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
            <img className={styles.icon} src={orchestrion.icon} alt={orchestrion.name} />
            <h3>{orchestrion.name}</h3>
            <p>{orchestrion.description}</p>
            <div>
            <p><strong>Patch:</strong> <br /> {orchestrion.patch}</p>
                <p><strong>Category:</strong> <br/> {orchestrion.category.name}</p>
            </div>
            <p ><strong>Owned by {orchestrion.owned} of Players</strong></p>
        </div>
    );
};

export default OrchestrionCard;