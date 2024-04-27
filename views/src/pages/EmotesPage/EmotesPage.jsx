import React, { useEffect, useState } from "react";
import MyNav from "../../components/Navbar/MyNav";
import MyFooter from "../../components/Footer/MyFooter";
import EmoteCard from "../../components/EmoteCard/EmoteCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSelector, useDispatch } from "react-redux";
import { fetchEmotes } from "../../redux/ffxivCollectSlice/ffxivCollectThunks";
import { fetchFavourites } from "../../redux/allFavsSlice/allFavsSlice";
import useResponsivePages from "../../customHooks/useResponsivePages";
import usePagination from "../../customHooks/usePagination";
import styles from "./EmotesPage.module.css";

const EmotesPage = () => {
    const dispatch = useDispatch();
    const { data: emotes, status, error } = useSelector((state) => state.emotes);

    const favouritesData = useSelector(state => state.allFavourites?.data || {});
    const emotesData = favouritesData.emotes || [];

    const [searchTerm, setSearchTerm] = useState('');
    const resultsPerPage = useResponsivePages(8);
    const totalResults = emotes?.results ?? [];
    const filteredEmotes = searchTerm
      ? totalResults.filter(emote =>
          emote.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : totalResults;

      const { currentPage, renderPaginationControls } = usePagination(filteredEmotes.length, resultsPerPage);

      useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            dispatch(fetchFavourites(userId));
            dispatch(fetchEmotes());
        }
    }, [dispatch]);

    useEffect(() => {
        
    }, [filteredEmotes.length]);



    const indexOfLastEmotes = currentPage * resultsPerPage;
    const indexOfFirstEmotes = indexOfLastEmotes - resultsPerPage;
    const currentEmotes = filteredEmotes.slice(indexOfFirstEmotes, indexOfLastEmotes);



    return (
        <>
            <MyNav />
            <Sidebar/>
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder="Search Emotes by name..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                          
                    }}
                    className={styles.searchBar}
                />
                {status === "loading" && <LoadingSpinner />}
                {status === "failed" && <p>Error: {error}</p>}
                {status === "succeeded" && totalResults.length > 0 && (
                    <>
                        <div className={styles.emotesGrid}>
                            {currentEmotes.map((emote) => (
                                <EmoteCard 
                                key={emote.id} 
                                emote={emote} 
                                isFavorited={emotesData.includes(String(emote.id))}/>
                            ))}
                        </div>
                        <div className={styles.pagination}>
                            {renderPaginationControls()}
                        </div>
                    </>
                )}
                {status === "succeeded" && totalResults.length === 0 && <p>No emotes found.</p>}
            </div>
            <MyFooter />
        </>
    );
};

export default EmotesPage;