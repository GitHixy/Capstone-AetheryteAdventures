import React, { useEffect, useState } from "react";
import styles from './Homepage.module.css';
import MyNav from "../../components/Navbar/MyNav";
import Sidebar from "../../components/Sidebar/Sidebar";
import MyFooter from "../../components/Footer/MyFooter";
import NewsCard from "../../components/NewsCard/NewsCard";
import MaintenanceCard from "../../components/MaintenanceCard/MaintenanceCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import MsgBoard from "../../components/MsgBoard/MsgBoard";
import { fetchLodestoneChar } from "../../redux/ffxivCollectSlice/ffxivCollectThunks";
import {useSelector, useDispatch} from 'react-redux';
import { useAuth } from '../../customHooks/useAuth';
import { fetchNews, fetchMaintenance } from "../../redux/lodestoneSlice/lodestoneSlice";


const Homepage = () => {
  const dispatch = useDispatch();
  const {maintenance, news, status, error} = useSelector(state => state.lodestone);
  const {token} = useAuth();
  const [name, setName] = useState('');
  const [server, setServer] = useState('');
  const userId = useSelector((state)=> state.login.id)
  const searchData = useSelector((state) => state.lodestoneChar.data.lodestoneChar)
  const searchStatus = useSelector((state) => state.lodestoneChar.status)
  console.log(searchData)

  const handleSearch = () => {
    const data = {name: name, server: server};
  dispatch(fetchLodestoneChar(data));
  }

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
  {userId && token ? (<MsgBoard />) : (null)}

  <div className={styles.searchContainer}>
      <h2>Search Lodestone Character</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Character Name"
      />
      <input
        type="text"
        value={server}
        onChange={(e) => setServer(e.target.value)}
        placeholder="Server"
      />
     
      <button onClick={handleSearch}>Search</button>
     
      
    </div>

    {searchStatus === 'loading' ? (<LoadingSpinner/>) : searchStatus === 'succeeded' && searchData ? (
          <>
          <div className={styles.searchResultsContainer}>

            
            <div className={styles.lodestoneCharCard}>
              <img
                src={searchData.portrait}
                alt={`${searchData.name}'s Portrait`}
                className={styles.portrait}
              />
              <div className={styles.lodestoneCharInfo}>
                <img
                  src={searchData.avatar}
                  alt={`${searchData.name}'s Avatar`}
                  className={styles.avatar}
                />
                <h2>{searchData.name}</h2>
                <p>
                  {searchData.server} [{searchData.data_center}]
                </p>
                
                {searchData && searchData.mounts && (
                  <p>
                    Mounts: {searchData.mounts.count} /{" "}
                    {searchData.mounts.total}
                  </p>
                )}
                {searchData && searchData.minions && (
                  <p>
                    Minions: {searchData.minions.count} /{" "}
                    {searchData.minions.total}
                  </p>
                )}
                {searchData && searchData.achievements && (
                  <>
                  
                  <p>
                    Achievements: {searchData.achievements.count} /{" "}
                    {searchData.achievements.total}
                  </p>
                  <div className={styles.sectionContainer}>
                  <p>Server Rank: {searchData.rankings.achievements.server || 'Not provided'}</p>
                  <p>Data Center Rank: {searchData.rankings.achievements.data_center || 'Not provided'}</p>
                  <p>Global Rank: {searchData.rankings.achievements.global || 'Not provided'}</p>
                  </div>
                  </>
                )}
                <p id={styles.disclaimer}>Please note that some information may not be visible due to privacy settings configured in Lodestone.</p>

              </div>
            </div>
            </div>
           
          </>
        ) : (null)}

  

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
