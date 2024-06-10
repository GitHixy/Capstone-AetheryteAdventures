import React from 'react'
import styles from './FCPage.module.css';
import { useNavigate } from 'react-router-dom';
import headImg from '../../assets/Header.png';


const FCPage = () => {
  const navigate = useNavigate();

  const backToWebsite = () => navigate('/');

  return (
    <>
<div className={styles.fcPageContainer}>
      <header className={styles.header}>
        <img src={headImg} alt="Header"/>
      </header>
      <section className={styles.section}>
        <h2> Aeterna Rebellio [AR] <br/>[Chaos] - [Ragnarok]</h2>
        <p>After over a decade immersed in the realms of World of Warcraft, we have embarked upon a quest, wandering through diverse games in search of a new sanctuary. <br/>
        We are a fellowship of kindred spirits, aged between 25 and 35, hailing from the fair lands of Italy. </p>
         <p>We delight in evening gatherings post our daily toils.

Though the era of sleepless nights and relentless progression lies behind us, 
we remain fervent in our pursuit of all the wonders a game may unveil. <br/> At present, our endeavors are directed towards the forging of a new Free Company wich is "Aeterna Rebellio", a bastion for our adventures, and the preparation of our chosen vocations with great zeal for the forthcoming Dawntrail early access.</p>
         
      </section>
      <section className={styles.section}>
        <h2>What Are We Seeking?</h2>
        <p>In truth, we seek all manner of adventurers! Be ye new to the realm of Eorzea, eager to grow alongside us, or an expert well-versed in its secrets, ready to guide us on our path. <br/>We welcome those who seek merriment and those who, when the time calls for it, are willing to be punctual and committed.</p>
        <p>Though Discord is not a mandate beyond the call of raiding, when we gather to play, it is within the voice chat that we spend our time, sharing tales and forging bonds.</p>
        <p>Come, say hello in our Discord, or peruse our recruitment page! Your presence shall be most welcome.</p>
        <div className={styles.links}>
          
            <a href="https://eu.finalfantasyxiv.com/lodestone/community_finder/cdb728aeddbebffb1b3e07aa78de49ce9bfd7375/" target="_blank" rel="noopener noreferrer">- Lodestone Recruitment Page -</a>
            <a href="https://discord.gg/aU3SUv6MyF" target="_blank" rel="noopener noreferrer">- Discord Channel -</a>
          
        </div>
        <p>Alternatively, you may also reach out to Giggle Storm or Hixyllian Sin'light for further inquiries directly in game.</p>
      </section>
      <button onClick={backToWebsite} className={styles.btnBack}>Back to ''Aetheryte Adventures''</button>
    </div>

    </>
  )
}

export default FCPage;