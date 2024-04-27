import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {addCardToFavourites, removeCardFromFavourites} from '../../redux/favsCardSlice/favsCardSlice';
import styles from './TriadCard.module.css';
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";

const TriadCard = ({ triadCard, isFavorited }) => {
    const [isSaved, setIsSaved] = useState(isFavorited);
    const dispatch = useDispatch();
    const token = localStorage.getItem('auth');
    const userId = localStorage.getItem('userId');
    
    const toggleFavorite = () => {
        const newIsSaved = !isSaved;
        setIsSaved(newIsSaved);       
        if(token) {
            if(newIsSaved) {
                dispatch(addCardToFavourites({userId: userId, cardId: triadCard.id}));
            } else {
                dispatch(removeCardFromFavourites({userId: userId, cardId: triadCard.id}));
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
            <img src={triadCard.image} alt={triadCard.name} className={styles.image} />
            <div className={styles.details}>
                <h3>{triadCard.name}</h3>
                <img src={triadCard.icon} alt={triadCard.name} />
                
                
                <p><strong>Patch:</strong> {triadCard.patch}</p>
                <div className={styles.sources}>
                    <span><strong>Obtainable From:</strong><br/></span>
                    {triadCard.sources.map((source, index) => (
                        <span key={index}><strong>{source.type}</strong><br/>{'<'}{source.text}{'>'}<br/></span>
                    ))}
                </div>
                
                
            </div>   
            <p className={styles.lastPar}><strong>Owned by {triadCard.owned} of Players</strong></p>   
        </div>
        
        </>
    );
}

export default TriadCard;