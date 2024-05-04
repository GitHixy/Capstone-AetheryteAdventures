import React from "react";
import MyNav from "../../components/Navbar/MyNav";
import Sidebar from "../../components/Sidebar/Sidebar";
import MyFooter from "../../components/Footer/MyFooter";
import { fetchUserById } from "../../redux/userSlice/userSlice";
import { fetchFavourites } from "../../redux/allFavsSlice/allFavsSlice";
import { fetchCollectibleById } from "../../redux/ffxivCompareSlice/ffxivCompareSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const { id } = useParams() || localStorage.getItem('userId');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const favsData = useSelector((state) => state.allFavourites.data);

  const collectibles = useSelector((state) => state.compare.data);

  

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
        {collectibles && <h2>Items You've Saved</h2>}

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
