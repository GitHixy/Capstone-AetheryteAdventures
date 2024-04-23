import React, { useEffect, useState } from "react";
import MyNav from "../../components/Navbar/MyNav";
import MyFooter from "../../components/Footer/MyFooter";
import MinionCard from "../../components/MinionCard/MinionCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSelector, useDispatch } from "react-redux";
import { fetchMinions } from "../../redux/ffxivCollectSlice/ffxivCollectThunks";
import useResponsivePages from "../../customHooks/useResponsivePages";
import usePagination from "../../customHooks/usePagination";
import styles from "./MinionsPage.module.css";

const MinionsPage = () => {
    const dispatch = useDispatch();
    const { data: minions, status, error } = useSelector((state) => state.minions);
    const [searchTerm, setSearchTerm] = useState('');
    const resultsPerPage = useResponsivePages(8);
    const totalResults = minions?.results ?? [];
    const filteredMinions = searchTerm
      ? totalResults.filter(minion =>
          minion.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : totalResults;

    const { currentPage, renderPaginationControls } = usePagination(filteredMinions.length, resultsPerPage);
    
    useEffect(() => {
        dispatch(fetchMinions());
    }, [dispatch]);

    useEffect(() => {
    
    }, [filteredMinions.length]);

    
    

    const indexOfLastMinion = currentPage * resultsPerPage;
    const indexOfFirstMinion = indexOfLastMinion - resultsPerPage;
    const currentMinions = filteredMinions.slice(indexOfFirstMinion, indexOfLastMinion);
    

    return (
        <>
            <MyNav />
            <Sidebar />
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder="Search Minions by name..."
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
                        <div className={styles.minionsGrid}>
                            {currentMinions.map((minion) => (
                                <MinionCard key={minion.id} minion={minion} />
                            ))}
                        </div>
                        <div className={styles.pagination}>
                        {renderPaginationControls()}
                        </div>
                    </>
                )}
                {status === "succeeded" && totalResults.length === 0 && <p>No minions found.</p>}
            </div>
            <MyFooter />
        </>
    );
};

export default MinionsPage;
