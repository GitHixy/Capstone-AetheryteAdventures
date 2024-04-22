import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    const handleTitles = () => {
        navigate('/titles');
    };
    const handleMounts = () => {
    navigate('/mounts');
    };



    return (
        <div className={isOpen ? styles.sidebarOpen : styles.sidebarClosed}>
            <button onClick={toggleSidebar} className={styles.toggleButton}>
                {isOpen ? '<' : '>'}
            </button>
            {isOpen && (
                <div>
                    <div className={styles.title}>Menu</div>
                    <ul>
                        <li><a href="#">Achievements</a></li>
                        <li><a href="#" onClick={handleTitles} >Titles</a></li>
                        <li><a href="#" onClick={handleMounts}>Mounts</a></li>
                        <li><a href="#">Minions</a></li>
                        <li><a href="#">Orchestrions</a></li>
                        <li><a href="#">TriadCards</a></li>
                        <li><a href="#">Emotes</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
