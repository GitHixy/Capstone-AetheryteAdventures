import React from 'react';
import styles from './MountCard.module.css';

const MountCard = ({ mount }) => {
    return (
        <>
        <div className={styles.card}>
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
