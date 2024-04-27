import React, { useEffect, useState } from "react";
import MyNav from "../../components/Navbar/MyNav";
import MyFooter from "../../components/Footer/MyFooter";
import MountCard from "../../components/MountCard/MountCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSelector, useDispatch } from "react-redux";
import { fetchFavourites } from "../../redux/allFavsSlice/allFavsSlice";
import { fetchMounts } from "../../redux/ffxivCollectSlice/ffxivCollectThunks";
import useResponsivePages from "../../customHooks/useResponsivePages";
import usePagination from "../../customHooks/usePagination";
import styles from "./MountsPage.module.css";

const MountsPage = () => {
    const dispatch = useDispatch();
    const { data: mounts, status, error } = useSelector((state) => state.mounts);

    const favouritesData = useSelector(state => state.allFavourites?.data || {});
    const mountsData = favouritesData.mounts || [];

    const [searchTerm, setSearchTerm] = useState('');
    const resultsPerPage = useResponsivePages(8);
    const totalResults = mounts?.results ?? [];
    const filteredMounts = searchTerm
        ? totalResults.filter(mount => mount.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : totalResults;

    const { currentPage, renderPaginationControls } = usePagination(filteredMounts.length, resultsPerPage);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            dispatch(fetchFavourites(userId));    
            dispatch(fetchMounts());       
        }else {
            dispatch(fetchMounts());
        }
    }, [dispatch]);
    
    useEffect(() => {
       
    }, [filteredMounts.length, dispatch]);

    const indexOfLastMount = currentPage * resultsPerPage;
    const indexOfFirstMount = indexOfLastMount - resultsPerPage;
    const currentMounts = filteredMounts.slice(indexOfFirstMount, indexOfLastMount);

    return (
        <>
            <MyNav />
            <Sidebar />
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder="Search Mounts by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchBar}
                />
                {status === "loading" && <LoadingSpinner />}
                {status === "failed" && <p>Error: {error}</p>}
                {status === "succeeded" && totalResults.length > 0 && (
                    <>
                        <div className={styles.mountsGrid}>
                            {currentMounts.map((mount) => <MountCard key={mount.id} mount={mount} isFavorited={mountsData.includes(String(mount.id))} />)}
                        </div>
                        <div className={styles.pagination}>
                            {renderPaginationControls()}
                        </div>
                    </>
                )}
                {status === "succeeded" && totalResults.length === 0 && <p>No mounts found.</p>}
            </div>
            <MyFooter />
        </>
    );
};

export default MountsPage;
