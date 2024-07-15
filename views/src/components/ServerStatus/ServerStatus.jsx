import React, {useEffect, useState} from "react";
import { fetchServerStatus } from '../../services/serverStatusService';
import styles from './ServerStatus.module.css';

const ServerStatus = () => {
    const [regionStatuses, setRegionStatuses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const getServerStatuses = async () => {
        try {
            const statuses = await fetchServerStatus();
            setRegionStatuses(statuses);
        } catch (error) {
            console.error('Errore fetching server statuses:', error);
        } finally {
            setLoading(false);
        }
    }

    getServerStatuses();
    }, []);

    if (loading) {
        return <><div className={styles.bg}>
            <h2 className={styles.serverTitle}>- Server Status -</h2>
            <div className={styles.loading}>- - - Checking Servers Status - - -</div>
            </div></>;
    }

    return (
        <>
        <div className={styles.bg}>
        <h2 className={styles.serverTitle}>- Server Status -</h2>
        <div className={styles.serverStatusContainer}>
            
            {regionStatuses.map((region) => (
                <div key={region.name} className={styles.region}>
                    <h3>- {region.name} -</h3>
                    <ul>
                        {region.datacenters.map((datacenter) => (
                            <li key={datacenter.ip} className={styles.datacenter}>
                                <span>{datacenter.name}</span>:
                                <span className={datacenter.status === 'online' ? styles.online : styles.offline}>
                                     {datacenter.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        </div>
        </>
    );
};

export default ServerStatus;
