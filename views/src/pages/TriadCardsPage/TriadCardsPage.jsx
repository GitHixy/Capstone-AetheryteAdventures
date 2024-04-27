import React, { useEffect, useState } from "react";
import MyNav from "../../components/Navbar/MyNav";
import MyFooter from "../../components/Footer/MyFooter";
import TriadCard from "../../components/TriadCardsCard/TriadCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSelector, useDispatch } from "react-redux";
import { fetchTriadCards } from "../../redux/ffxivCollectSlice/ffxivCollectThunks";
import { fetchFavourites } from "../../redux/allFavsSlice/allFavsSlice";
import useResponsivePages from "../../customHooks/useResponsivePages";
import usePagination from "../../customHooks/usePagination";
import styles from "./TriadCardsPage.module.css";


const TriadCardsPage = () => {
    const dispatch = useDispatch();
    const { data: triadCards, status, error } = useSelector((state) => state.triadCards);

    const favouritesData = useSelector(state => state.allFavourites?.data || {});
    const cardsData = favouritesData.triadCards || [];

    const [searchTerm, setSearchTerm] = useState('');
    const resultsPerPage = useResponsivePages(8);
    const totalResults = triadCards?.results ?? [];
    const filteredTriadCards = searchTerm
      ? totalResults.filter(triadCards =>
          triadCards.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : totalResults;

      const { currentPage, renderPaginationControls } = usePagination(filteredTriadCards.length, resultsPerPage);

      useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            dispatch(fetchFavourites(userId));
            dispatch(fetchTriadCards());
        }
    }, [dispatch]);


    useEffect(() => {
        
    }, [filteredTriadCards.length]);



    const indexOfLastTriadCards = currentPage * resultsPerPage;
    const indexOfFirstTriadCards = indexOfLastTriadCards - resultsPerPage;
    const currentTriadCards = filteredTriadCards.slice(indexOfFirstTriadCards, indexOfLastTriadCards);



    return (
        <>
            <MyNav />
            <Sidebar />
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder="Search Triad Cards by name..."
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
                        <div className={styles.triadCardsGrid}>
                            {currentTriadCards.map((triadCard) => (
                                <TriadCard key={triadCard.id} triadCard={triadCard}
                                isFavorited={cardsData.includes(String(triadCard.id))} />
                            ))}
                        </div>
                        <div className={styles.pagination}>
                            {renderPaginationControls()}
                        </div>
                    </>
                )}
                {status === "succeeded" && totalResults.length === 0 && <p>No triad cards found.</p>}
            </div>
            <MyFooter />
        </>
    );
};

export default TriadCardsPage;
