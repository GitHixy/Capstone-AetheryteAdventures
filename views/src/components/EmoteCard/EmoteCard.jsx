import React from 'react';
import styles from './EmoteCard.module.css'; 

const EmoteCard = ({ emote }) => {
    return (
        <div className={styles.card}>
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