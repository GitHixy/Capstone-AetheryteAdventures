import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {addEmoteToFavourites, removeEmoteFromFavourites} from '../../redux/favsEmoteSlice/favsEmoteSlice';
import styles from './EmoteCard.module.css'; 
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";

const EmoteCard = ({ emote, isFavorited }) => {
    const [isSaved, setIsSaved] = useState(isFavorited);
    const dispatch = useDispatch();
    const token = localStorage.getItem('auth');
    const userId = localStorage.getItem('userId');
    
    const toggleFavorite = () => {
        const newIsSaved = !isSaved;
        setIsSaved(newIsSaved);       
        if(token) {
            if(newIsSaved) {
                dispatch(addEmoteToFavourites({userId: userId, emoteId: emote.id}));
            } else {
                dispatch(removeEmoteFromFavourites({userId: userId, emoteId: emote.id}));
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
            <img className={styles.icon} src={emote.icon} alt={emote.name} />
            <h3>{emote.name}</h3>
            <p><strong>Command:</strong><br/> {emote.command}</p>
            <div>
            <p><strong>Patch:</strong> <br /> {emote.patch}</p>
                <p><strong>Category:</strong> <br/> {emote.category.name}</p>
            </div>
            <div className={styles.sources}>
                    <span><strong>Obtainable From:</strong><br/></span>
                    {emote.sources.map((source, index) => (
                        <span key={index}><strong>{source.type}</strong><br/>{'<'}{source.text}{'>'}<br/></span>
                    ))}
                </div>
            <p ><strong>Owned by {emote.owned} of Players</strong></p>
        </div>
    );
};

export default EmoteCard;