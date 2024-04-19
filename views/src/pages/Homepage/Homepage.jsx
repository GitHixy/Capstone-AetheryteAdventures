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
    dispatch(fetchNews())
  }, [dispatch]);


  if (status === 'loading') return <LoadingSpinner />
  if (error) return <div>Error: {error}</div>
console.log(news)
  return (
  <>
  <MyNav />
  {news.filter(item => item.image)
     .slice(0, 10)
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
  <MyFooter />
  </>

);
};

export default Homepage;
