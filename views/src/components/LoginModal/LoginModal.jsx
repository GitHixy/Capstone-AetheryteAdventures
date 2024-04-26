import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, resetLoginState, resetStatus } from '../../redux/loginSlice/loginSlice';
import styles from './LoginModal.module.css'; 
import { toast } from 'react-toastify';

const LoginModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.login);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleClose = () => {
    if (status !== 'loading') {
      dispatch(resetLoginState());
      onClose();
    } else {
      toast.info('Login in progress, please wait...');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
    onClose();
  };

  React.useEffect(() => {
    if (!isOpen) {
      dispatch(resetLoginState());
    }
  }, [isOpen, dispatch]);

  React.useEffect(() => {
    if (status === 'succeededLogin') {
      setEmail('');
      setPassword('');
      toast.success('Login successful!');
      dispatch(resetStatus());
      
    }
    if (status === 'failed') {
      toast.error(`Login failed: ${error}`);
    }
  }, [status, error]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={handleClose} className={styles.closeButton}>x</button>
        <h2>Login to <br/> Aetheryte Adventures</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} required />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} required />
          </label>
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
