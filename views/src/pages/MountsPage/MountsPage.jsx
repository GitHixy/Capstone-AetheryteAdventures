import React, { useEffect, useState } from "react";
import MyNav from "../../components/Navbar/MyNav";
import MyFooter from "../../components/Footer/MyFooter";
import MountCard from "../../components/MountCard/MountCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchMounts } from "../../redux/ffxivCollectSlice/ffxivCollectThunks";
import styles from "./MountsPage.module.css";

const MountsPage = () => {
    const dispatch = useDispatch();
    const { data: mounts, status, error } = useSelector((state) => state.mounts);
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
      dispatch(fetchMounts());
    }, [dispatch]);
  
    const totalResults = mounts?.results ?? [];
    const pageCount = Math.ceil(totalResults.length / resultsPerPage);
  
    const filteredMounts = searchTerm
      ? totalResults.filter(mount =>
          mount.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : totalResults;
  
    const indexOfLastMount = currentPage * resultsPerPage;
    const indexOfFirstMount = indexOfLastMount - resultsPerPage;
    const currentMounts = filteredMounts.slice(indexOfFirstMount, indexOfLastMount);
  
    const renderPagination = () => {
      if (filteredMounts.length === 0) return null;
  
      const pages = [];
      let leftSide = currentPage - 2;
      if (leftSide <= 1) leftSide = 1;
      let rightSide = currentPage + 2;
      if (rightSide > Math.ceil(filteredMounts.length / resultsPerPage)) rightSide = Math.ceil(filteredMounts.length / resultsPerPage);
  
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
  
      if (rightSide < Math.ceil(filteredMounts.length / resultsPerPage)) {
        pages.push(
          <span key="ellipsis2">...</span>,
          <button key={Math.ceil(filteredMounts.length / resultsPerPage)} onClick={() => setCurrentPage(Math.ceil(filteredMounts.length / resultsPerPage))}>
            {Math.ceil(filteredMounts.length / resultsPerPage)}
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
          placeholder="Search Mounts by name..."
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
            <div className={styles.mountsGrid}>
              {currentMounts.map((mount) => (
                <MountCard key={mount.id} mount={mount} />
              ))}
            </div>
            <div className={styles.pagination}>
              {renderPagination()}
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
