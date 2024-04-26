import React from 'react'
import MyNav from '../../components/Navbar/MyNav'
import Sidebar from '../../components/Sidebar/Sidebar'
import MyFooter from '../../components/Footer/MyFooter'
import { fetchUserById } from '../../redux/userSlice/userSlice'
import { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    console.log(user, id);
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US',{
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    useEffect(() => {
      if (id) {
          dispatch(fetchUserById(id));
      }
  }, [id, dispatch]);

  return (
    <>
    <MyNav />
            <Sidebar />
            <div className={styles.dashboardContainer}>
                <h1>- {user.username}'s Dashboard -</h1>
                {user ? (
                    <div className={styles.userCard}>
                        <img src={user.avatar} alt="User Avatar" className={styles.avatar} />
                        <div className={styles.userInfo}>
                            <h2>{user.username}</h2>
                            <p>Email: {user.email}</p>  
                            <p>Account Created: {formatDate(user.createdAt)}</p>                         
                        </div>
                    </div>
                ) : (
                    <p>Something Went Wrong</p>
                )}
            </div>
            <MyFooter />
    </>
  )
}

export default DashboardPage