import React, {useRef} from "react";
import HTMLFlipBook from "react-pageflip";
import styles from "./Book.module.css";

const Book = ({ lorePages }) => {
  const bookReset = useRef();
  return (
    <>
    <HTMLFlipBook 
    ref={bookReset}
    width={300} 
    height={500} 
    showCover={true} 
    usePortrait={false} 
    size="stretch"
    minWidth={280}
    maxWidth={500}
    minHeight={480}
    maxHeight={700}>
      {lorePages.map((page, index) => (
       
       <img   
       key={index}
       className={styles.pageImg}        
         src={page.content}
         alt={`Page ${index + 1}`}      
       />
     
      ))}
    </HTMLFlipBook>
    <button className={styles.resetBtn} onClick={()=>bookReset.current.pageFlip().flip(0)}>Back to Start</button>
    </>
  );
};

export default Book;
