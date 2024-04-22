import React from 'react';
import styles from './OrchestrionCard.module.css'; 

const OrchestrionCard = ({ orchestrion }) => {
    return (
        <div className={styles.card}>
            <img className={styles.icon} src={orchestrion.icon} alt={orchestrion.name} />
            <h3>{orchestrion.name}</h3>
            <p>{orchestrion.description}</p>
            <div>
            <p><strong>Patch:</strong> <br /> {orchestrion.patch}</p>
                <p><strong>Category:</strong> <br/> {orchestrion.category.name}</p>
            </div>
            <p ><strong>Owned by {orchestrion.owned} of Players</strong></p>
        </div>
    );
};

export default OrchestrionCard;