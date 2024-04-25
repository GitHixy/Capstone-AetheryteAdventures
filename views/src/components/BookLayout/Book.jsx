import React from "react";
import HTMLFlipBook from "react-pageflip";
import styles from "./Book.module.css";

const Book = ({ lorePages }) => {
  return (
    <HTMLFlipBook width={300} 
    height={500} 
    showCover={true} 
    usePortrait={true} 
    size="stretch"
    minWidth={280}
    maxWidth={500}
    minHeight={480}
    maxHeight={700}>
      {lorePages.map((page, index) => (
        <div className={styles.page} key={index}>
          <img
            className={styles.pageImg}
            src={page.content}
            alt={`Page ${index + 1}`}
          />
        </div>
      ))}
    </HTMLFlipBook>
  );
};

export default Book;
