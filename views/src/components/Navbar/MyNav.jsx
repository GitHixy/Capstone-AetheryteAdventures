import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout as logoutAction } from '../../redux/loginSlice/loginSlice';
import { fetchUserById } from "../../redux/userSlice/userSlice";
import { FaDiscord } from "react-icons/fa";
import { useAuth } from '../../customHooks/useAuth';
import { toast } from 'react-toastify';
import styles from './MyNav.module.css';
import logo from '../../assets/Aetheryte Adventures.png'; 
import RegModal from '../RegModal/RegModal';
import LoginModal from '../LoginModal/LoginModal';

const MyNav = () => {
  const {token, username} = useAuth();
  const dispatch = useDispatch();
  const userId = useSelector((state)=> state.login.id)
  const [isRegModalOpen, setRegModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegOpenModal = (e) => {
    e.preventDefault();
    setRegModalOpen(true);
  };
  const handleRegCloseModal = () => setRegModalOpen(false);

  const handleLoginOpenModal = (e) => {
    e.preventDefault();
    setLoginModalOpen(true);
  };
  const handleLoginCloseModal = () => setLoginModalOpen(false);

  const handleLogout = () => {
    dispatch(logoutAction());
    toast.success('You Have Logged Out!');
    navigate('/')
  };

  const handleLoginWithDiscord = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/discord`;

  }
  
  const aboutRedirect = () => {
    navigate('/about');
  }
  const devDiaryRedirect = () => {
    navigate('/devDiary');
  }
  const dashboardRedirect = () => {
    console.log('Redirecting to dashboard for user ID:', userId);
    dispatch(fetchUserById(userId))
      .unwrap()
      .then((user) => {
        navigate(`/dashboard/${userId}`);
      })
      .catch(error => {
        console.error('Failed to fetch user:', error);
        navigate('/*'); 
      });
  };

  useEffect(() => {
    
  }, [token]);

  return (
    <nav className={styles.navbar}>
    <div className={styles.logoContainer}>
      <a href="/">
        <img src={logo} alt="Final Fantasy Logo" className={styles.logo} />
      </a>
    </div>
    {username && <>
    <h2 className={styles.h2Title}>Welcome, {username}!</h2>
    <p className={styles.introPar}>Salutations, Warrior of Light! <br/> As you step forth into this sanctuary, ready your heart for adventures anew <br/> and let the echoes of Eorzea's song inspire every step of your journey. <br/> May you ever walk in the light of the Crystal, {username}, and may your tales be as boundless as the starlit sky.</p>
    </>}
    <div className={styles.navLinks}>
      <ul className={styles.navList}>
        <li className={styles.navItem}><a href="/">Home</a></li>
        <li className={styles.navItem}><a href="#" onClick={devDiaryRedirect} >Dev Diary</a></li>
        <li className={styles.navItem}><a href="#" onClick={aboutRedirect} >About</a></li>
        
        {!token ? (
              <> 
              
                <li className={styles.navItem} ><a href="#" id={styles.specialBtn} onClick={handleLoginOpenModal} role="button">Login</a></li>
                <li className={styles.navItem} ><a href="#" id={styles.specialBtn} onClick={handleRegOpenModal} role="button">Register</a></li>
                <li className={styles.navItem} ><a href="#" id={styles.specialBtnDiscord} onClick={handleLoginWithDiscord} role="button"> <FaDiscord /> Login</a></li>              
              </>
            ) : (
              <>
              <li className={styles.navItem} ><a href="#" id={styles.specialBtn} onClick={dashboardRedirect} >Dashboard</a></li>
              <li className={styles.navItem} ><a href="#" id={styles.specialBtn} onClick={handleLogout}>Logout</a></li>
              </>
            )}
      </ul>
    </div>
    <RegModal isOpen={isRegModalOpen} onClose={handleRegCloseModal} />
    <LoginModal isOpen={isLoginModalOpen} onClose={handleLoginCloseModal} />
  </nav>
  );
}

export default MyNav;