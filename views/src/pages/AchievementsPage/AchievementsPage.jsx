import React, { useEffect, useState } from "react";
import MyNav from "../../components/Navbar/MyNav";
import MyFooter from "../../components/Footer/MyFooter";
import AchievementCard from "../../components/AchievementCard/AchievementCard";
import Sidebar from '../../components/Sidebar/Sidebar';
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchAchievements } from "../../redux/ffxivCollectSlice/ffxivCollectThunks";
import { fetchFavourites } from "../../redux/allFavsSlice/allFavsSlice";
import useResponsivePages from "../../customHooks/useResponsivePages";
import usePagination from "../../customHooks/usePagination";
import styles from "./AchievementsPage.module.css";

const AchievementsPage = () => {
    const dispatch = useDispatch();
    const { data: achievements, status, error } = useSelector((state) => state.achievements);
    
    const favouritesData = useSelector(state => state.allFavourites?.data || {});
    const achievementsData = favouritesData.achievements || [];
    

    


    const [searchTerm, setSearchTerm] = useState('');
    const resultsPerPage = useResponsivePages(8);
    const totalResults = achievements?.results ?? [];
    const filteredAchievements = searchTerm
      ? totalResults.filter(achievement =>
          achievement.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : totalResults;
      const { currentPage, renderPaginationControls } = usePagination(filteredAchievements.length, resultsPerPage);
    
      useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            dispatch(fetchFavourites(userId));
            dispatch(fetchAchievements());
        }
    }, [dispatch]);

    useEffect(() => {
        
    }, [filteredAchievements.length]);
    

    const indexOfLastAchievement = currentPage * resultsPerPage;
    const indexOfFirstAchievement = indexOfLastAchievement - resultsPerPage;
    const currentAchievements = filteredAchievements.slice(indexOfFirstAchievement, indexOfLastAchievement);

    

    return (
        <>
            <MyNav />
            <Sidebar />
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder="Search Achievements by name..."
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
                        <div className={styles.achievementsGrid}>
                            {currentAchievements.map((achievement) => (
                                <AchievementCard 
                                key={achievement.id} 
                                achievement={achievement}
                                isFavorited={achievementsData.includes(String(achievement.id))}

                                />
                            ))}
                        </div>
                        <div className={styles.pagination}>
                            {renderPaginationControls()}
                        </div>
                    </>
                )}
                {status === "succeeded" && totalResults.length === 0 && <p>No achievements found.</p>}
            </div>
            <MyFooter />
        </>
    );
};

export default AchievementsPage;