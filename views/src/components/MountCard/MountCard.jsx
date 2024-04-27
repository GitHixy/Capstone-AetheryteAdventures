import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import styles from './MountCard.module.css';
import {addMountToFavourites, removeMountFromFavourites} from '../../redux/favsMountSlice/favsMountSlice';
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";


const MountCard = ({ mount, isFavorited }) => {
    const [isSaved, setIsSaved] = useState(isFavorited);
    const dispatch = useDispatch();
    const token = localStorage.getItem('auth');
    const userId = localStorage.getItem('userId');
    
    const toggleFavorite = () => {
        const newIsSaved = !isSaved;
        setIsSaved(newIsSaved);       
        if(token) {
            if(newIsSaved) {
                dispatch(addMountToFavourites({userId: userId, mountId: mount.id}));
            } else {
                dispatch(removeMountFromFavourites({userId: userId, mountId: mount.id}));
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
            <img src={mount.image} alt={mount.name} className={styles.image} />
            <div className={styles.details}>
                <h3>{mount.name}</h3>
                <img src={mount.icon} alt={mount.name} />
                
                <p><strong>Seats:</strong> {mount.seats}</p>
                <p><strong>Movement:</strong> {mount.movement}</p>
                <div className={styles.sources}>
                    <span><strong>Obtainable From:</strong><br/></span>
                    {mount.sources.map((source, index) => (
                        <span key={index}><strong>{source.type}</strong><br/>{'<'}{source.text}{'>'}<br/></span>
                    ))}
                </div>
                
                
            </div>   
            <p className={styles.lastPar}><strong>Owned by {mount.owned} of Players</strong></p>   
        </div>
        
        </>
    );
}

export default MountCard;
