import React, { useState, useEffect } from 'react';
import useSound from "use-sound";
import { TbPlayerPlayFilled, TbPlayerPauseFilled, TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { IconContext } from 'react-icons/lib';
import song1 from "../../assets/Beyond The Final Days.mp3"
import styles from './MusicPlayer.module.css'; 


const MusicPlayer = (coverImg, songTitle, songArtist) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [play, {pause, duration, sound}] = useSound(song1)
    const [currTime, setCurrTime] = useState({
        min: "",
        sec: "",
      });
    const [seconds, setSeconds] = useState();
    const sec = duration / 1000;
        const min = Math.floor(sec / 60);
        const secRemain = Math.floor(sec % 60);
        const time = {
          min: min,
          sec: secRemain
        };

    const playingButton = () => {
    if (isPlaying) {
        pause();
        setIsPlaying(false);
    } else {
        play();
        setIsPlaying(true);
    }
    };

    useEffect(() => {
        const interval = setInterval(() => {
          if (sound) {
            setSeconds(sound.seek([])); 
            const min = Math.floor(sound.seek([]) / 60);
            const sec = Math.floor(sound.seek([]) % 60);
            setCurrTime({
              min,
              sec,
            });
          }
        }, 1000);
        return () => clearInterval(interval);
      }, [sound]);
    
    return (
        <div className={styles.component}>
      <h2>Playing Now</h2>
      <img
        className={styles.musicCover}
        src={coverImg}
      />
      <div>
        <h3 className={styles.title}>{songTitle}</h3>
        <p className={styles.subtitle}>{songArtist}</p>
      </div>
      <div className={styles.timeContainer}>
        <div className={styles.time}>
          <p>
            {currTime.min}:{currTime.sec}
          </p>
          <p>
            {time.min}:{time.sec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className={styles.timeline}
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.playButton}>
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
          <TbPlayerTrackPrevFilled />
          </IconContext.Provider>
        </button>
        {!isPlaying ? (
          <button className={styles.playButton} onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <TbPlayerPlayFilled />
            </IconContext.Provider>
          </button>
        ) : (
          <button className={styles.playButton} onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
            <TbPlayerPauseFilled />
            </IconContext.Provider>
          </button>
        )}
        <button className={styles.playButton}>
          <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
          <TbPlayerTrackNextFilled />
          </IconContext.Provider>
        </button>
      </div>
    </div>
        
    )
};

export default MusicPlayer;
