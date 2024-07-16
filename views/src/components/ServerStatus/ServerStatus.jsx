import React, {useEffect, useState} from "react";
import { fetchServerStatus } from '../../services/serverStatusService';
import styles from './ServerStatus.module.css';

const ServerStatus = () => {
    const [regionStatuses, setRegionStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState(60);

    const getServerStatuses = async () => {
        try {
          setLoading(true);
          const statuses = await fetchServerStatus();
          setRegionStatuses(statuses);
        } catch (error) {
          console.error('Error fetching server statuses:', error);
        } finally {
          setLoading(false);
          setCountdown(60); 
        }
      };
    
      useEffect(() => {
        getServerStatuses();
        const interval = setInterval(getServerStatuses, 60000); 
        return () => clearInterval(interval); 
      }, []);
    
      useEffect(() => {
        if (countdown > 0) {
          const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
          return () => clearTimeout(timer); 
        }
      }, [countdown]);

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
                                <span className={datacenter.status === 'Online' ? styles.online : styles.offline}>
                                     {datacenter.status}
                                </span>
                                <span>- {datacenter.latency} ms</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        <div className={styles.countdown}>
        Refreshing in {countdown} Seconds
      </div>
        </div>
        </>
    );
};

export default ServerStatus;
