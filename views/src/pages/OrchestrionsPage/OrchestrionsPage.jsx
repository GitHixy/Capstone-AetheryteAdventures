import React, { useEffect, useState } from "react";
import MyNav from "../../components/Navbar/MyNav";
import MyFooter from "../../components/Footer/MyFooter";
import OrchestrionCard from "../../components/OrchestrionCard/OrchestrionCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSelector, useDispatch } from "react-redux";
import { fetchOrchestrions } from "../../redux/ffxivCollectSlice/ffxivCollectThunks";
import { fetchFavourites } from "../../redux/allFavsSlice/allFavsSlice";
import useResponsivePages from "../../customHooks/useResponsivePages";
import usePagination from "../../customHooks/usePagination";
import styles from "./OrchestrionsPage.module.css";

const OrchestrionsPage = () => {
    const dispatch = useDispatch();
    const { data: orchestrions, status, error } = useSelector((state) => state.orchestrions);

    const favouritesData = useSelector(state => state.allFavourites?.data || {});
    const orchestrionsData = favouritesData.orchestrions || [];

    const [searchTerm, setSearchTerm] = useState('');
    const resultsPerPage = useResponsivePages(8);
    const totalResults = orchestrions?.results ?? [];
    const filteredOrchestrions = searchTerm
      ? totalResults.filter(orchestrion =>
          orchestrion.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : totalResults;

      const { currentPage, renderPaginationControls } = usePagination(filteredOrchestrions.length, resultsPerPage);

      useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            dispatch(fetchFavourites(userId));    
            dispatch(fetchOrchestrions());       
        }else {
            dispatch(fetchOrchestrions());
        }
    }, [dispatch]);
    
    useEffect(() => {
        
    }, [filteredOrchestrions.length]);



    const indexOfLastOrchestrion = currentPage * resultsPerPage;
    const indexOfFirstOrchestrion = indexOfLastOrchestrion - resultsPerPage;
    const currentOrchestrions = filteredOrchestrions.slice(indexOfFirstOrchestrion, indexOfLastOrchestrion);



    return (
        <>
            <MyNav />
            <Sidebar />
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder="Search Orchestrions by name..."
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
                        <div className={styles.orchestrionsGrid}>
                            {currentOrchestrions.map((orchestrion) => (
                                <OrchestrionCard key={orchestrion.id} orchestrion={orchestrion} 
                                isFavorited={orchestrionsData.includes(String(orchestrion.id))}/>
                            ))}
                        </div>
                        <div className={styles.pagination}>
                            {renderPaginationControls()}
                        </div>
                    </>
                )}
                {status === "succeeded" && totalResults.length === 0 && <p>No orchestrions found.</p>}
            </div>
            <MyFooter />
        </>
    );
};

export default OrchestrionsPage;
