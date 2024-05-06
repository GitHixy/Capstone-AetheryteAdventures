import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages, postMessage } from '../../redux/messageSlice/messageSlice';
import styles from "./MsgBoard.module.css";

const MsgBoard = () => {
  const [newMessage, setNewMessage] = useState('');
  const dispatch = useDispatch();
  const { messages, status, error } = useSelector((state) => state.messages);
  const username = localStorage.getItem('username');
  const displayedMessages = messages.slice(-10);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    dispatch(postMessage({ messageText: newMessage, username: username }));
    setNewMessage('');
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US',{
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className={styles.msgBoardContainer}>
      <h2>- Adventurers Board -</h2>
    <div className={styles.msgBoard}>
    
    <ul className={styles.messagesList}>
      {displayedMessages.map((msg, index) => (
        <li key={index} className={styles.message}>[{formatDate(msg.createdAt)}] <br/> <strong>{msg.username}</strong> : {msg.messageText} </li>
      ))}
    </ul>
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message here..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Send</button>
    </form>
    {status === 'loading' && <p>Loading...</p>}
    {error && <p className={styles.error}>{error}</p>}
   
  </div>
  </div>
  );
}

export default MsgBoard;
