import React from 'react';
import { useNavigate } from 'react-router-dom';
import FCCard from '../../components/FCCard/FCCard';
import Navbar from '../../components/Navbar/MyNav';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/MyFooter';
import styles from './RecruitmentHomePage.module.css';
import AeternaRebellioLogo from '../../assets/FCLogos/Aeterna Rebellio Logo.png';

const RecruitmentHomePage = () => {
  const navigate = useNavigate();

  const AeternaRebellio = {
    name: 'Aeterna Rebellio',
    image: AeternaRebellioLogo,
    server: '[CHAOS] - [RAGNAROK]',
  };

  const handleAR = () => navigate('/aeterna-rebellio');

  return (
    <>
    <Navbar/>
    <Sidebar/>
    
    <div className={styles.pageContainer}>
    <h1 className={styles.headTitle}>- FC Recruitment -</h1>
    <div className={styles.cardContainer}>  
      <FCCard onClick={handleAR} fc={AeternaRebellio} />
      </div>
      </div>
      <Footer/>
    </>
  );
}

export default RecruitmentHomePage;

