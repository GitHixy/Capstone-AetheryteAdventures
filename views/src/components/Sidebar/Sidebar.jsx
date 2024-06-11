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
import loreIcon from '../../assets/icons/loregen.png';
import FashionsIcon from '../../assets/icons/fashion.png';
import loreBooksIcon from '../../assets/icons/lorebooks.png';
import logo from '../../assets/Aetheryte Adventures.png';
import fcIcon from '../../assets/icons/free_company.png';

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
    const handleLoreGen = () => navigate('/loreGenerator');
    const handleFashions = () => navigate('/fashions');
    const handleLoreBooks = () => navigate('/books');
    const handleFC = () => navigate('/aeterna-rebellio');
    const handleHome = () => navigate('/');

    const toggleButtonStyle = {
        left: isOpen ? '180px' : '0px', 
    };

    return (
        <>
        <button onClick={toggleSidebar} className={styles.toggleButton} style={toggleButtonStyle}>
        {isOpen ? '<' : 'Open Menu >'}
    </button>
        <div className={isOpen ? styles.sidebarOpen : styles.sidebarClosed}>
            <img className={styles.sideImg} src={logo} alt="LogoAA" />
            <div className={styles.titleHome}><hr/><h4  onClick={handleHome}>Return Home</h4></div>
            <div className={styles.title}><hr/><h4>Codex</h4><hr/></div>
            <ul>
                <li><a onClick={handleAchievements}><img src={achiIcon} alt="Achievements Icon" />{isOpen && <span>Achievements</span>}</a></li>
                <li><a onClick={handleTitles}><img src={charIcon} alt="Titles Icon" />{isOpen && <span>Titles</span>}</a></li>
                <li><a onClick={handleMounts}><img src={mountsIcon} alt="Mounts Icon" />{isOpen && <span>Mounts</span>}</a></li>
                <li><a onClick={handleMinions}><img src={minionsIcon} alt="Minions Icon" />{isOpen && <span>Minions</span>}</a></li>
                <li><a onClick={handleOrchestrions}><img src={orchestrionIcon} alt="Orchestrions Icon" />{isOpen && <span>Orchestrions</span>}</a></li>
                <li><a onClick={handleTriadCards}><img src={cardsIcon} alt="Triad Cards Icon" />{isOpen && <span>Triad Cards</span>}</a></li>
                <li><a onClick={handleEmotes}><img src={emotesIcon} alt="Emotes Icon" />{isOpen && <span>Emotes</span>}</a></li> 
                <li><a onClick={handleFashions}><img src={FashionsIcon} alt="Fashions Icon" />{isOpen && <span>Fashion Accessories</span>}</a></li>              
            </ul>
            <div className={styles.title}><hr/><h4>Features</h4><hr/></div>
            <ul>
            <li><a onClick={handleLoreBooks}><img src={loreBooksIcon} alt="Books Icon" />{isOpen && <span>Books of Knowledge</span>}</a></li>
            <li><a onClick={handleLoreGen}><img src={loreIcon} alt="Lore Icon" />{isOpen && <span>Lore Generator</span>}</a></li>
            <li><a onClick={handleFC}><img src={fcIcon} alt="FC Icon" />{isOpen && <span>Aeterna Rebellio [FC]</span>}</a></li>
            </ul>
        </div>
        </>
    );
}

export default Sidebar;

