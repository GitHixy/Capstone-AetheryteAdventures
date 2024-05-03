import React, {useEffect, useState} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from "./SuccessPage.module.css";
import MyNav from '../../components/Navbar/MyNav';
import MyFooter from '../../components/Footer/MyFooter';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const SuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
      
    useEffect(() => {
        const getAuth = () => {
            const searchParams = new URLSearchParams(location.search);
            const authToken = searchParams.get("auth");
            const username = searchParams.get("username");
            const id = searchParams.get("id");
            const discordId = searchParams.get("discordId")
            if (authToken && username && id && discordId) {
              localStorage.setItem("auth", authToken);
              localStorage.setItem("userId", id);
              localStorage.setItem("username", username);
              localStorage.setItem("discordId", discordId);
              setTimeout(() => {
                setLoading(false);
                navigate(`/dashboard/${id}`);
              }, 2000);
              toast.success('You Have Logged In!')
            } else {
              console.error("Auth token not found in URL parameters");
              toast.error('Something Went Wrong!');
            }
          };
        getAuth();
      }, [navigate, location.search]);

    return (
        <>
        <MyNav/>
<div className={styles.loadingContainer}>
      {loading ? (
        <div className={styles.loading}>
          <LoadingSpinner/>
        </div>
      ) : (
        <h2 className={styles.successMessage}>Success! Redirecting...</h2>
      )}
    </div>
    <MyFooter/>
    </>
    )
}

export default SuccessPage;