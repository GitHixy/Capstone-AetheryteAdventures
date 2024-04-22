import React, { useEffect, useState } from "react";
import MyNav from "../../components/Navbar/MyNav";
import MyFooter from "../../components/Footer/MyFooter";
import MountCard from "../../components/MountCard/MountCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchMounts } from "../../redux/ffxivCollectSlice/ffxivCollectThunks";
import useResponsivePages from "../../customHooks/useResponsivePages";
import usePagination from "../../customHooks/usePagination";
import styles from "./MountsPage.module.css";

const MountsPage = () => {
    const dispatch = useDispatch();
    const { data: mounts, status, error } = useSelector((state) => state.mounts);
    const [searchTerm, setSearchTerm] = useState('');
    const resultsPerPage = useResponsivePages(8);
    const totalResults = mounts?.results ?? [];
    const filteredMounts = searchTerm
        ? totalResults.filter(mount => mount.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : totalResults;

    const { currentPage, renderPaginationControls } = usePagination(filteredMounts.length, resultsPerPage);

    useEffect(() => {
        dispatch(fetchMounts());
    }, [dispatch]);

    useEffect(() => {
        
    }, [filteredMounts.length]);

    const indexOfLastMount = currentPage * resultsPerPage;
    const indexOfFirstMount = indexOfLastMount - resultsPerPage;
    const currentMounts = filteredMounts.slice(indexOfFirstMount, indexOfLastMount);

    return (
        <>
            <MyNav />
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
                            {currentMounts.map((mount) => <MountCard key={mount.id} mount={mount} />)}
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
