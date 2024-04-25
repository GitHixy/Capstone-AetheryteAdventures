import React from 'react';
import { lorePagesVol1, lorePagesVol2 } from '../../localData/lorePages';
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

<div className={styles.bookContainer}>
    <h2>FF XIV - A Realm Reborn</h2>
    <p>The Story Summary - Texts by Vrykerion <br/> The following is a crash course for the plot of Final Fantasy XIV: A Realm Reborn. <span>IT CONTAINS SPOILERS</span> , it does not have any sort of personal insight, <br/>and is mainly meant as a tool for those who have skipped, forgotten, or want a refresher on the major plot points of the Realm Reborn narrative.</p>
<Book className={styles.singleBook} lorePages={lorePagesVol1}/>
</div>
<div className={styles.bookContainer}>
    <h2>FF XIV - Heavensward</h2>
    <p>The Story Summary - Texts by Vrykerion <br/> The following is a crash course for the plot of Final Fantasy XIV: Heavensward. <span>IT CONTAINS SPOILERS</span> , it does not have any sort of personal insight, <br/>and is mainly meant as a tool for those who have skipped, forgotten, or want a refresher on the major plot points of the Heavensward narrative.</p>
<Book className={styles.singleBook} lorePages={lorePagesVol2}/>
</div>

<MyFooter/>

</>
    )
}

export default BooksPage