import React, { useEffect } from "react";
import MyNav from "../../components/Navbar/MyNav";
import MyFooter from "../../components/Footer/MyFooter";
import NewsCard from "../../components/NewsCard/NewsCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {useSelector, useDispatch} from 'react-redux';
import { fetchNews } from "../../redux/lodestoneSlice/lodestoneSlice";


const Homepage = () => {
  const dispatch = useDispatch();
  const {news, status, error} = useSelector(state => state.lodestone);

  useEffect(() => {
    //dispatch(fetchNews())
  }, [dispatch]);

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://na.lodestonenews.com/news/feed", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  if (status === 'loading') return <LoadingSpinner />
  if (error) return <div>Error: {error}</div>

  return (
  <>
  <MyNav />
  {news.map(item => (
    <NewsCard />
  ))}
  <MyFooter />
  </>

);
};

export default Homepage;
