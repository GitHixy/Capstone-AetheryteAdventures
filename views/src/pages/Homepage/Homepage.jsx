import React, { useEffect } from "react";
import styles from './Homepage.module.css';
import MyNav from "../../components/Navbar/MyNav";
import Sidebar from "../../components/Sidebar/Sidebar";
import MyFooter from "../../components/Footer/MyFooter";
import NewsCard from "../../components/NewsCard/NewsCard";
import MaintenanceCard from "../../components/MaintenanceCard/MaintenanceCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {useSelector, useDispatch} from 'react-redux';
import { fetchNews, fetchMaintenance } from "../../redux/lodestoneSlice/lodestoneSlice";


const Homepage = () => {
  const dispatch = useDispatch();
  const {maintenance, news, status, error} = useSelector(state => state.lodestone);

  useEffect(() => {
    dispatch(fetchNews());
    dispatch(fetchMaintenance());
  }, [dispatch]);


  if (status === 'loading') return <LoadingSpinner />
  if (error) return <div>Error: {error}</div>

  return (
  <>
  <MyNav />
  <Sidebar />
  
  <div className={styles.container}>
    <div className={styles.newsContainer}>
  <h2 className={styles.headTitle}>- Latest News from The Lodestone -</h2>
  {news.filter(item => item.image)
     .slice(0, 3)
     .map(item => (
       <NewsCard key={item.id}
                 title={item.title}
                 description={item.description}
                 category={item.category}
                 image={item.image}
                 time={item.time}
                 url={item.url}
       />
))}
</div>
<div className={styles.maintenanceContainer}>
<h2 className={styles.headTitle}>- Latest Maintenance -</h2>
{maintenance.slice(0, 6)
     .map(item => (
       <MaintenanceCard key={item.id}
                        title={item.title}
                        url={item.url}
                        time={item.time}
                        start={item.start}
                        end={item.end}
        />
))}
</div>
</div>
  <MyFooter />
  </>

);
};

export default Homepage;
