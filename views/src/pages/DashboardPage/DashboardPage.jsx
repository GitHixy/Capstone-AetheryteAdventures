import React from "react";
import MyNav from "../../components/Navbar/MyNav";
import Sidebar from "../../components/Sidebar/Sidebar";
import MyFooter from "../../components/Footer/MyFooter";
import { fetchUserById } from "../../redux/userSlice/userSlice";
import { fetchFavourites } from "../../redux/allFavsSlice/allFavsSlice";
import { fetchCollectibleById } from "../../redux/ffxivCompareSlice/ffxivCompareSlice";
import { fetchDiscordChar } from "../../redux/ffxivCollectSlice/ffxivCollectThunks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const { id } = useParams() || localStorage.getItem('userId');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const favsData = useSelector((state) => state.allFavourites.data);
  const discordId = localStorage.getItem("discordId");
  const discordChar = useSelector((state) => state.discordChar.data);
  const status = useSelector((state) => state.discordChar.status);
  console.log(discordChar);
  const collectibles = useSelector((state) => state.compare.data);

  console.log(discordId);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
      dispatch(fetchFavourites(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (discordId) {
      dispatch(fetchDiscordChar(discordId));
    }
  }, [dispatch, discordId]);

  useEffect(() => {
    if (favsData) {
      Object.keys(favsData).forEach((category) => {
        if (Array.isArray(favsData[category])) {
          favsData[category].forEach((item) => {
            const endpoint =
              category === "triadCards"
                ? "triad/cards"
                : category === "fashionAccessories"
                ? "fashions"
                : category;
            dispatch(fetchCollectibleById({ section: endpoint, id: item }));
          });
        }
      });
    }
  }, [favsData, dispatch]);

  return (
    <>
      <MyNav />
      <Sidebar />
      <div className={styles.dashboardContainer}>
        <h1>- {user.username}'s Dashboard -</h1>
        {user ? (
          <div className={styles.userCard}>
            <img
              src={user.avatar}
              alt="User Avatar"
              className={styles.avatar}
            />
            <div className={styles.userInfo}>
              <h2>{user.username}</h2>
              <p>Email: {user.email}</p>
              <p>Account Created: {formatDate(user.createdAt)}</p>
            </div>
          </div>
        ) : (
          <p>Something Went Wrong</p>
        )}

        <h2>- Your Character on FF XIV -</h2>
        {status === 'loading' ? (<LoadingSpinner/> ) : status === 'succeeded' && discordChar ? (
          <>
            
            
            <div className={styles.discordCharCard}>
              <img
                src={discordChar.portrait}
                alt={`${discordChar.name}'s Portrait`}
                className={styles.portrait}
              />
              <div className={styles.discordCharInfo}>
                <img
                  src={discordChar.avatar}
                  alt={`${discordChar.name}'s Avatar`}
                  className={styles.avatar}
                />
                <h2>{discordChar.name}</h2>
                <p>
                  {discordChar.server} [{discordChar.data_center}]
                </p>
                {discordChar && discordChar.achievements && (
                  <p>
                    Achievements: {discordChar.achievements.count} /{" "}
                    {discordChar.achievements.total}
                  </p>
                )}
                {discordChar && discordChar.mounts && (
                  <p>
                    Mounts: {discordChar.mounts.count} /{" "}
                    {discordChar.mounts.total}
                  </p>
                )}
                {discordChar && discordChar.minions && (
                  <p>
                    Minions: {discordChar.minions.count} /{" "}
                    {discordChar.minions.total}
                  </p>
                )}
              </div>
            </div>
            <p className={styles.advertise}>This data are taken from FF XIV Collect and it may take some time to show updates</p>
          </>
        ) : (
          <p>Connect Your Discord with FF XIV Collect to show your Character here</p>
        )}
        {collectibles && <h2>Items You've Saved on 'Aetheryte Adventures'</h2>}

        <div className={styles.itemsContainer}>
          {Object.keys(collectibles).map(
            (section) =>
              collectibles[section] &&
              Object.values(collectibles[section]).map((item) => (
                <div className={styles.collectibleItem} key={item.id}>
                  <h3 className={styles.collectibleName}>{item.name}</h3>
                  <img
                    className={styles.itemIcon}
                    src={item.icon}
                    alt={item.name}
                  />
                  <p className={styles.collectibleDescription}>
                    Patch: {item.patch}
                  </p>
                </div>
              ))
          )}
        </div>
      </div>
      <MyFooter />
    </>
  );
};

export default DashboardPage;
