import React from 'react';
import styles from './FashionCard.module.css';

const FashionCard = ({ fashion }) => {
    return (
        <>
        <div className={styles.card}>
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