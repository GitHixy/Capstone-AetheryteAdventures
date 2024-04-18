import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, resetUserState } from "../../redux/userSlice/userSlice";
import styles from "./RegModal.module.css";
import { toast } from "react-toastify";


const RegModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleAvatarChange = (event) => setAvatar(event.target.files[0]);

  const handleClose = () => {
    if (userStatus !== "loading") {
        dispatch(resetUserState());
      onClose();
    } else {
      toast.info("Registration in progress, please wait...");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      username,
      email,
      password,
      avatar,
    };

    dispatch(createUser(userData));
    
      onClose();
  
  };

  useEffect(() => {
    if (!isOpen) {
        dispatch(resetUserState());
    }
}, [isOpen, dispatch]);

  React.useEffect(() => {
    if (userStatus === "succeeded") {
      toast.success("Registration successful!");
      setUsername("");
      setEmail("");
      setPassword("");
      setAvatar(null);
    }
    if (userStatus === "failed") {
      toast.error(`Registration failed: ${userError}`);
    }
  }, [userStatus, userError]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={handleClose} className={styles.closeButton}>
          x
        </button>
        <h2>
          Join <br />
          Aetheryte Adventures
        </h2>

        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </label>
          <label>
            Upload Avatar:
            <input type="file" name="avatar" onChange={handleAvatarChange} />
          </label>
          <button type="submit" disabled={userStatus === "loading"}>
            {userStatus === "loading" ? (
    "Registering..."
  ) : (
    "Register"
  )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegModal;
