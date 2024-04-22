import React, { useEffect, useState } from "react";
import MyNav from "../../components/Navbar/MyNav";
import MyFooter from "../../components/Footer/MyFooter";
import TitleCard from "../../components/TitleCard/TitleCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchTitles } from "../../redux/ffxivCollectSlice/ffxivCollectThunks";
import styles from "./TitlesPage.module.css";

const TitlesPage = () => {
    const dispatch = useDispatch();
    const { data: titles, status, error } = useSelector((state) => state.titles);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [resultsPerPage, setResultsPerPage] = useState(8);

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            if (width < 500) {
                setResultsPerPage(4);
            } else if (width < 1120) {
                setResultsPerPage(6);
            } else if (width >= 1390 && width < 1660) {
                setResultsPerPage(10);
            } else if (width >= 1660 && width < 1930) {
                setResultsPerPage(12);
            } else if (width >= 1930 && width < 2200) {
                setResultsPerPage(14);
            } else if (width >= 2200 && width < 2470) {
                setResultsPerPage(16);
            } else if (width >= 2470 && width < 2740) {
                setResultsPerPage(18);
            } else if (width >= 2740) {
                setResultsPerPage(20);
            } else {
                setResultsPerPage(8);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(fetchTitles());
    }, [dispatch]);

    const totalResults = titles?.results ?? [];
    const filteredTitles = searchTerm
      ? totalResults.filter(title =>
          title.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : totalResults;

    const indexOfLastTitle = currentPage * resultsPerPage;
    const indexOfFirstTitle = indexOfLastTitle - resultsPerPage;
    const currentTitles = filteredTitles.slice(indexOfFirstTitle, indexOfLastTitle);
    const pageCount = Math.ceil(filteredTitles.length / resultsPerPage);

    const renderPagination = () => {
        if (filteredTitles.length === 0) return null;

        const pages = [];
        let leftSide = currentPage - 2;
        if (leftSide <= 1) leftSide = 1;
        let rightSide = currentPage + 2;
        if (rightSide > pageCount) rightSide = pageCount;

        for (let number = leftSide; number <= rightSide; number++) {
            pages.push(
                <button key={number} onClick={() => setCurrentPage(number)}
                    className={currentPage === number ? styles.active : null}>
                    {number}
                </button>
            );
        }

        if (leftSide > 1) {
            pages.unshift(
                <button key="1" onClick={() => setCurrentPage(1)}>1</button>,
                <span key="ellipsis1">...</span>
            );
        }

        if (rightSide < pageCount) {
            pages.push(
                <span key="ellipsis2">...</span>,
                <button key={pageCount} onClick={() => setCurrentPage(pageCount)}>
                    {pageCount}
                </button>
            );
        }

        return pages;
    };

    return (
        <>
            <MyNav />
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder="Search titles by name..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
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
                            {renderPagination()}
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
