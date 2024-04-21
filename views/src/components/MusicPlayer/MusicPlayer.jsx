import React, { useState, useRef, useEffect } from 'react';
import styles from './MusicPlayer.module.css'; 
import Song1 from '../../assets/Beyond The Final Days.mp3';
import Song2 from '../../assets/Echoes of Dawn.mp3'
import Song3 from '../../assets/Hymn of the Rejoining.mp3'

const MusicPlayer = () => {
    const songs = [
        { title: "Beyond The Final Days", src: Song1 },
        { title: "Echoes of Dawn", src: Song2 },
        { title: "Hymn of the Rejoining", src: Song3 }
    ];

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.50);
    const [isOpen, setIsOpen] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        }
    }, [currentSongIndex, isPlaying]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleStop = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
    };

    const handlePrevSong = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex(currentSongIndex - 1);
        } else {
            setCurrentSongIndex(songs.length - 1);
        }
    };

    const handleNextSong = () => {
        if (currentSongIndex < songs.length - 1) {
            setCurrentSongIndex(currentSongIndex + 1);
        } else {
            setCurrentSongIndex(0);
        }
    };

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.container}>
            <button onClick={toggleDropdown} className={styles.dropdownToggle}>
                Music Player
            </button>
            {isOpen && (
                <div className={styles.dropdownContent}>
                    <div className={styles.title}>Now Playing: {songs[currentSongIndex].title}</div>
                    <audio ref={audioRef} src={songs[currentSongIndex].src} preload="auto" />
                    <div className={styles.controls}>
                        <button className={styles.button} onClick={handlePlayPause}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        <button className={styles.button} onClick={handleStop}>Stop</button>
                        <button className={styles.button} onClick={handlePrevSong}>Prev</button>
                        <button className={styles.button} onClick={handleNextSong}>Next</button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={e => setVolume(e.target.value)}
                            className={styles.volumeSlider}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MusicPlayer;
