import React, { useEffect, useState } from "react";
import MyNav from "../../components/Navbar/MyNav";
import MyFooter from "../../components/Footer/MyFooter";
import TitleCard from "../../components/TitleCard/TitleCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSelector, useDispatch } from "react-redux";
import { fetchFavourites } from "../../redux/allFavsSlice/allFavsSlice";
import { fetchTitles } from "../../redux/ffxivCollectSlice/ffxivCollectThunks";
import useResponsivePages from "../../customHooks/useResponsivePages";
import usePagination from "../../customHooks/usePagination";
import styles from "./TitlesPage.module.css";

const TitlesPage = () => {
    const dispatch = useDispatch();
    const { data: titles, status, error } = useSelector((state) => state.titles);

    const favouritesData = useSelector(state => state.allFavourites?.data || {});
    const titlesData = favouritesData.titles || [];

    const [searchTerm, setSearchTerm] = useState('');
    const resultsPerPage = useResponsivePages(8);
    const totalResults = titles?.results ?? [];
    const filteredTitles = searchTerm
      ? totalResults.filter(title =>
          title.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : totalResults;

    const { currentPage, renderPaginationControls } = usePagination(filteredTitles.length, resultsPerPage);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            dispatch(fetchFavourites(userId));  
            dispatch(fetchTitles());         
        }else {
            dispatch(fetchTitles());
        }
    }, [dispatch]);

    useEffect(() => {
    
    }, [filteredTitles.length]);

    const indexOfLastTitle = currentPage * resultsPerPage;
    const indexOfFirstTitle = indexOfLastTitle - resultsPerPage;
    const currentTitles = filteredTitles.slice(indexOfFirstTitle, indexOfLastTitle);

    return (
        <>
            <MyNav />
            <Sidebar />
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder="Search Titles by name..."
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
                        <div className={styles.titlesGrid}>
                            {currentTitles.map((title) => (
                                <TitleCard key={title.id} title={title}  isFavorited={titlesData.includes(String(title.id))}/>
                            ))}
                        </div>
                        <div className={styles.pagination}>
                            {renderPaginationControls()}
                        </div>
                    </>
                )}
                {status === "succeeded" && totalResults.length === 0 && <p>No titles found.</p>}
            </div>
            <MyFooter />
        </>
    );
};

export default TitlesPage;
