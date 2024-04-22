import React from 'react';
import styles from './TriadCard.module.css';

const TriadCard = ({ triadCard }) => {
    return (
        <>
        <div className={styles.card}>
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