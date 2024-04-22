import React from 'react';
import styles from './MinionCard.module.css';

const MinionCard = ({ minion }) => {
    return (
        <>
        <div className={styles.card}>
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