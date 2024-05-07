import React from 'react';
import { lorePagesVol1, lorePagesVol2, lorePagesVol3, lorePagesVol4, lorePagesVol5 } from '../../localData/lorePages';
import Book from '../../components/BookLayout/Book';
import MyNav from '../../components/Navbar/MyNav';
import MyFooter from '../../components/Footer/MyFooter';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './BooksPage.module.css';


const BooksPage = () => {

    return(
<>
<MyNav/>
<Sidebar/>

<div className={styles.bookContainer} id={styles.arr}>
    <h2>FF XIV - A Realm Reborn</h2>
    <p>The Story Summary - Texts by Vrykerion <br/> The following is a crash course for the plot of Final Fantasy XIV: A Realm Reborn. <span>IT CONTAINS SPOILERS</span> , it does not have any sort of personal insight, <br/>and is mainly meant as a tool for those who have skipped, forgotten, or want a refresher on the major plot points of the Realm Reborn narrative.</p>
<Book className={styles.singleBook} lorePages={lorePagesVol1}/>
</div>
<div className={styles.bookContainer} id={styles.heavensward}>
    <h2>FF XIV - Heavensward</h2>
    <p>The Story Summary - Texts by Vrykerion <br/> The following is a crash course for the plot of Final Fantasy XIV: Heavensward. <span>IT CONTAINS SPOILERS</span> , it does not have any sort of personal insight, <br/>and is mainly meant as a tool for those who have skipped, forgotten, or want a refresher on the major plot points of the Heavensward narrative.</p>
<Book className={styles.singleBook} lorePages={lorePagesVol2}/>
</div>
<div className={styles.bookContainer} id={styles.stormblood}>
    <h2>FF XIV - Stormblood</h2>
    <p>The Story Summary - Texts by Vrykerion <br/> The following is a crash course for the plot of Final Fantasy XIV: Stormblood. <span>IT CONTAINS SPOILERS</span> , it does not have any sort of personal insight, <br/>and is mainly meant as a tool for those who have skipped, forgotten, or want a refresher on the major plot points of the Stormblood narrative.</p>
<Book className={styles.singleBook} lorePages={lorePagesVol3}/>
</div>
<div className={styles.bookContainer} id={styles.shadowbringers}>
    <h2>FF XIV - Shadowbringers</h2>
    <p>The Story Summary - Texts by Vrykerion <br/> The following is a crash course for the plot of Final Fantasy XIV: Shadowbringers. <span>IT CONTAINS SPOILERS</span> , it does not have any sort of personal insight, <br/>and is mainly meant as a tool for those who have skipped, forgotten, or want a refresher on the major plot points of the Shadowbringers narrative.</p>
<Book className={styles.singleBook} lorePages={lorePagesVol4}/>
</div>
<div className={styles.bookContainer} id={styles.endwalker}>
    <h2>FF XIV - Endwalker</h2>
    <p>The Story Summary - Texts by Vrykerion and ChatGPT <br/> The following is a crash course for the plot of Final Fantasy XIV: Endwalker. <span>IT CONTAINS SPOILERS</span> , it does not have any sort of personal insight, <br/>and is mainly meant as a tool for those who have skipped, forgotten, or want a refresher on the major plot points of the Endwalker narrative.</p>
<Book className={styles.singleBook} lorePages={lorePagesVol5}/>
</div>

<MyFooter/>

</>
    )
}

export default BooksPage