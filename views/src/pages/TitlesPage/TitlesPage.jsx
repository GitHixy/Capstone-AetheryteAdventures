import React, { useEffect, useState } from "react";
import MyNav from "../../components/Navbar/MyNav";
import MyFooter from "../../components/Footer/MyFooter";
import TitleCard from "../../components/TitleCard/TitleCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchTitles } from "../../redux/ffxivCollectSlice/ffxivCollectThunks";
import useResponsivePages from "../../customHooks/useResponsivePages";
import usePagination from "../../customHooks/usePagination";
import styles from "./TitlesPage.module.css";

const TitlesPage = () => {
    const dispatch = useDispatch();
    const { data: titles, status, error } = useSelector((state) => state.titles);
    const [searchTerm, setSearchTerm] = useState('');
    const resultsPerPage = useResponsivePages(8);
    const totalResults = titles?.results ?? [];
    const filteredTitles = searchTerm
      ? totalResults.filter(title =>
          title.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : totalResults;

    const { currentPage, renderPaginationControls } = usePagination(filteredTitles.length, resultsPerPage);

    useEffect(() => {
        dispatch(fetchTitles());
    }, [dispatch]);

    useEffect(() => {
    
    }, [filteredTitles.length]);

    const indexOfLastTitle = currentPage * resultsPerPage;
    const indexOfFirstTitle = indexOfLastTitle - resultsPerPage;
    const currentTitles = filteredTitles.slice(indexOfFirstTitle, indexOfLastTitle);

    return (
        <>
            <MyNav />
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
                                <TitleCard key={title.id} title={title} />
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
