import React from "react";
import { useSelector } from 'react-redux';
import MyNav from "../../components/Navbar/MyNav";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import MyFooter from "../../components/Footer/MyFooter";


const Homepage = () => {
  const userStatus = useSelector((state) => state.user.status);
  return (
  <>
  <MyNav />
  {userStatus === 'loading' && <LoadingSpinner />}
  <MyFooter />
  </>

);
};

export default Homepage;
