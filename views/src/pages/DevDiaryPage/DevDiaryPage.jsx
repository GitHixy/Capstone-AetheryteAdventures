import React from 'react';
import MyNav from '../../components/Navbar/MyNav';
import MyFooter from '../../components/Footer/MyFooter';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './DevDiaryPage.module.css';


const DevDiaryPage = () => {
  return (
    <>
    <MyNav/>
    <Sidebar/>
    <div className={styles.pageLayout}>
        <Sidebar />
        <div className={styles.newsFeed}>
          <h1 className={styles.header}>- Development Diary -</h1>
          <div className={styles.newsItem}>
            <h2>Bug Fixes</h2>
            <p>Resolved responsive errors on Codex Pages and Dashboard. <br/>
              Added 'Back to Start' buttons on Book of Knowledge section.            
            </p>
            <p>Date: May 08, 2024</p>
            <hr/>
          </div>
          <div className={styles.newsItem}>
            <h2>New Feature: Search FF XIV Characters</h2>
            <p>Users can now search Characters by writing Name and Server, displayed infos are taken from the Lodestone.            
            </p>
            <p>Date: May 04, 2024</p>
            <hr/>
          </div>
          <div className={styles.newsItem}>
            <h2>New Feature: Login with Discord</h2>
            <p>Users can now register and log using Discord account.</p>
            <p>Date: May 01, 2024</p>
            <hr/>
          </div>
          <div className={styles.newsItem}>
            <h2>'Dev Diary' now available in production</h2>
            <p>Added 'Dev Diary' to keep track of new features and bug fixes.</p>
            <p>Date: April 29, 2024</p>
            <hr/>
          </div>
          <div className={styles.newsItem}>
            <h2>Bug Fixes</h2>
            <p>Resolved issues about server disconnections.</p>
            <p>Date: April 28, 2024</p>
            <hr/>
          </div>
          <div className={styles.newsItem}>
            <h2>'Book of Knowledge' session added</h2>
            <p>Added section with summary of FF XIV story divided by expansion.</p>
            <p>Date: April 27, 2024</p>
            <hr/>
          </div>
          <div className={styles.newsItem}>
            <h2>'Lore Generator' session added</h2>
            <p>Added section with Lore Generator connected to OpenAI's GPT-3.5 Turbo.</p>
            <p>Date: April 26, 2024</p>
            <hr/>
          </div>
          <div className={styles.newsItem}>
            <h2>Website Launch</h2>
            <p>Aetheryte Adventures is deployed and running!</p>
            <p>Date: April 25, 2024</p>
          </div>
        </div>
      </div>


    <MyFooter/>
    </>
  )
}

export default DevDiaryPage