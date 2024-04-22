import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';
import achiIcon from '../../assets/icons/achievements.png';
import charIcon from '../../assets/icons/character.png';
import emotesIcon from '../../assets/icons/emotes.png';
import minionsIcon from '../../assets/icons/minion_guide.png';
import mountsIcon from '../../assets/icons/mount_guide.png';
import orchestrionIcon from '../../assets/icons/orchestrion_list.png';
import cardsIcon from '../../assets/icons/gold_saucer.png';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    const handleAchievements = () => navigate('/achievements');
    const handleTitles = () => navigate('/titles');
    const handleMounts = () => navigate('/mounts');
    const handleMinions = () => navigate('/minions');
    const handleOrchestrions = () => navigate('/orchestrions');
    const handleTriadCards = () => navigate('/triad/cards');
    const handleEmotes = () => navigate('/emotes');

    return (
        <div className={isOpen ? styles.sidebarOpen : styles.sidebarClosed}>
            <button onClick={toggleSidebar} className={styles.toggleButton}>
                {isOpen ? '<' : '>'}
            </button>
            <div className={styles.title}><h3>Menu</h3><hr/></div>
            
            <ul>
                <li><a onClick={handleAchievements}><img src={achiIcon} alt="Achievements Icon" />{isOpen && <span>Achievements</span>}</a></li>
                <li><a onClick={handleTitles}><img src={charIcon} alt="Titles Icon" />{isOpen && <span>Titles</span>}</a></li>
                <li><a onClick={handleMounts}><img src={mountsIcon} alt="Mounts Icon" />{isOpen && <span>Mounts</span>}</a></li>
                <li><a onClick={handleMinions}><img src={minionsIcon} alt="Minions Icon" />{isOpen && <span>Minions</span>}</a></li>
                <li><a onClick={handleOrchestrions}><img src={orchestrionIcon} alt="Orchestrions Icon" />{isOpen && <span>Orchestrions</span>}</a></li>
                <li><a onClick={handleTriadCards}><img src={cardsIcon} alt="Triad Cards Icon" />{isOpen && <span>Triad Cards</span>}</a></li>
                <li><a onClick={handleEmotes}><img src={emotesIcon} alt="Emotes Icon" />{isOpen && <span>Emotes</span>}</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;

