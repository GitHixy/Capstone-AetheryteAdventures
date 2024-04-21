import React from 'react';
import styles from './AboutPage.module.css'; 
import MyNav from '../../components/Navbar/MyNav';
import MyFooter from '../../components/Footer/MyFooter';
const AboutPage = () => {
    return (
        <>
        <MyNav />
        <div className={styles.container}>
        <h1 className={styles.title}>The Chronicles of Aetheryte Adventures</h1>
            <p className={styles.text}>
                In an age marked by the echo of ancient epochs, where digital realms unfold with the promise of uncharted territories, a lone adventurer—inspired by the grand tales of Eorzea—embarked upon a quest transcending the mere confines of reality. This site, Aetheryte Adventures, emerged from the ether as a scholarly sanctum, meticulously forged in the crucible of the Epicode web development course.
            </p>
            <p className={styles.text}>
                What began as a final project of the course, conceived beneath the starlit skies of learning and innovation, evolved swiftly into a revered gathering place for Eorzean scholars and digital wanderers alike. Herein, travelers from far-flung realms convene to share in the rich tapestry of knowledge, lore, and fellowship. Each page serves not merely as a guide through the perilous dungeons of Eorzea but as a beacon to those navigating the intricate mazes of code and design.
            </p>
            <p className={styles.text}>
                Aetheryte Adventures stands as a testament to the synthesis of fantasy and technology, where the echoes of coding keys mingle with the magical chimes of aetherytes. May this site illuminate your path as brightly as the aetherytes light the landscapes of Eorzea. Join us in weaving together the threads of fantasy and reality into a grand tapestry of adventure, camaraderie, and learning.
            </p>
            <p className={styles.text}>
                As the aetherytes bind the land of Eorzea, so too does this project bind the lessons of a burgeoning web developer with the community of an epic, ever-expanding universe. It is here, at the confluence of pixel and fantasy, that our tales will be told, our battles fought, and our legends born.
            </p>
        </div>
        <MyFooter />
        </>
    );
};

export default AboutPage;
