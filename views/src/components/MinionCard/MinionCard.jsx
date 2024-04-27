import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {addMinionToFavourites, removeMinionFromFavourites} from '../../redux/favsMinionSlice/favsMinionSlice';
import styles from './MinionCard.module.css';
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";

const MinionCard = ({ minion, isFavorited }) => {
    const [isSaved, setIsSaved] = useState(isFavorited);
    const dispatch = useDispatch();
    const token = localStorage.getItem('auth');
    const userId = localStorage.getItem('userId');
    
    const toggleFavorite = () => {
        const newIsSaved = !isSaved;
        setIsSaved(newIsSaved);       
        if(token) {
            if(newIsSaved) {
                dispatch(addMinionToFavourites({userId: userId, minionId: minion.id}));
            } else {
                dispatch(removeMinionFromFavourites({userId: userId, minionId: minion.id}));
            }
        } 
    };

    useEffect(() => {
        setIsSaved(isFavorited);
    }, [isFavorited]);
    return (
        <>
        <div className={styles.card}>
        {token && userId ? (
            isSaved ? 
            (<BsBookmarkHeartFill onClick={toggleFavorite} className={styles.bookmark}/>) :
            (<BsBookmarkHeart onClick={toggleFavorite} className={styles.bookmark}/>)
            ) : null}
            <img src={minion.image} alt={minion.name} className={styles.image} />
            <div className={styles.details}>
                <h3>{minion.name}</h3>
                <img src={minion.icon} alt={minion.name} />
                
                <p><strong>Patch:</strong> {minion.patch}</p>
                <p><strong>Movement:</strong> {minion.movement}</p>
                <div className={styles.sources}>
                    <span><strong>Obtainable From:</strong><br/></span>
                    {minion.sources.map((source, index) => (
                        <span key={index}><strong>{source.type}</strong><br/>{'<'}{source.text}{'>'}<br/></span>
                    ))}
                </div>
                
                
            </div>   
            <p className={styles.lastPar}><strong>Owned by {minion.owned} of Players</strong></p>   
        </div>
        
        </>
    );
}

export default MinionCard;