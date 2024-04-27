import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {addFashionToFavourites, removeFashionFromFavourites} from '../../redux/favsFashionSlice/favsFashionSlice';
import styles from './FashionCard.module.css';
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";

const FashionCard = ({ fashion, isFavorited }) => {
    const [isSaved, setIsSaved] = useState(isFavorited);
    const dispatch = useDispatch();
    const token = localStorage.getItem('auth');
    const userId = localStorage.getItem('userId');
    
    const toggleFavorite = () => {
        const newIsSaved = !isSaved;
        setIsSaved(newIsSaved);       
        if(token) {
            if(newIsSaved) {
                dispatch(addFashionToFavourites({userId: userId, fashionId: fashion.id}));
            } else {
                dispatch(removeFashionFromFavourites({userId: userId, fashionId: fashion.id}));
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
            <img src={fashion.image} alt={fashion.name} className={styles.image} />
            <div className={styles.details}>
                <h3>{fashion.name}</h3>
                <img src={fashion.icon} alt={fashion.name} />
                <div className={styles.sources}>
                    <span><strong>Obtainable From:</strong><br/></span>
                    {fashion.sources.map((source, index) => (
                        <span key={index}><strong>{source.type}</strong><br/>{'<'}{source.text}{'>'}<br/></span>
                    ))}
                </div>
                
                
            </div>   
            <p className={styles.lastPar}><strong>Owned by {fashion.owned} of Players</strong></p>   
        </div>
        
        </>
    );
}

export default FashionCard;