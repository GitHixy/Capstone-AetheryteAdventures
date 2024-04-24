import React, { useEffect, useState } from "react";
import MyNav from "../../components/Navbar/MyNav";
import MyFooter from "../../components/Footer/MyFooter";
import FashionCard from "../../components/FashionCard/FashionCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSelector, useDispatch } from "react-redux";
import { fetchFashions } from "../../redux/ffxivCollectSlice/ffxivCollectThunks";
import useResponsivePages from "../../customHooks/useResponsivePages";
import usePagination from "../../customHooks/usePagination";
import styles from "./FashionsPage.module.css";

const FashionsPage = () => {
    const dispatch = useDispatch();
    const { data: fashions, status, error } = useSelector((state) => state.fashions);
    const [searchTerm, setSearchTerm] = useState('');
    const resultsPerPage = useResponsivePages(8);
    const totalResults = fashions?.results ?? [];
    const filteredFashions = searchTerm
        ? totalResults.filter(fashion => fashion.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : totalResults;

    const { currentPage, renderPaginationControls } = usePagination(filteredFashions.length, resultsPerPage);

    useEffect(() => {
        dispatch(fetchFashions());
    }, [dispatch]);

    useEffect(() => {
        
    }, [filteredFashions.length]);

    const indexOfLastFashion = currentPage * resultsPerPage;
    const indexOfFirstFashion = indexOfLastFashion - resultsPerPage;
    const currentFashions = filteredFashions.slice(indexOfFirstFashion, indexOfLastFashion);

    return (
        <>
            <MyNav />
            <Sidebar />
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder="Search Fashions by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchBar}
                />
                {status === "loading" && <LoadingSpinner />}
                {status === "failed" && <p>Error: {error}</p>}
                {status === "succeeded" && totalResults.length > 0 && (
                    <>
                        <div className={styles.fashionsGrid}>
                            {currentFashions.map((fashion) => <FashionCard key={fashion.id} fashion={fashion} />)}
                        </div>
                        <div className={styles.pagination}>
                            {renderPaginationControls()}
                        </div>
                    </>
                )}
                {status === "succeeded" && totalResults.length === 0 && <p>No fashions found.</p>}
            </div>
            <MyFooter />
        </>
    );
};

export default FashionsPage;
