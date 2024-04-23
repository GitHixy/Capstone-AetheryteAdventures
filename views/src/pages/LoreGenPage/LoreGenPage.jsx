import React, { useState } from "react";
import MyNav from '../../components/Navbar/MyNav';
import MyFooter from '../../components/Footer/MyFooter';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useDispatch, useSelector } from "react-redux";
import { generateLore, resetLore } from "../../redux/loreGenSlice/loreGenSlice";
import styles from "./LoreGenPage.module.css";

const LoreGenPage = () => {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [charClass, setCharClass] = useState("");
  const [gender, setGender] = useState("");
  const dispatch = useDispatch();

  const lore = useSelector((state) => state.lore.lore);
  const status = useSelector((state) => state.lore.status);
  const error = useSelector((state) => state.lore.error);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(generateLore({ name, race, charClass, gender }));
  };

  const handleReset = () => {
    dispatch(resetLore());
    setName("");
    setRace("");
    setCharClass("");
    setGender("");
  };

  return (
    <>
    <MyNav/>
    <Sidebar/>
    <h2 className={styles.genTitle}>- Generate Your Lore -</h2>
    <div className={styles.container}>
    <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
            Name:
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className={styles.input}
            />
        </label>
        <label className={styles.label}>
            Gender:
            <select value={gender} onChange={e => setGender(e.target.value)} required className={styles.select}>
                {['Male', 'Female'].map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                ))}
            </select>
        </label>
        <label className={styles.label}>
            Race:
            <select value={race} onChange={e => setRace(e.target.value)} required className={styles.select}>
                {['Hyur', 'Elezen', 'Lalafell', 'Miqo\'te', 'Roegadyn', 'Au Ra', 'Viera', 'Hrothgar'].map(race => (
                    <option key={race} value={race}>{race}</option>
                ))}
            </select>
        </label>
        <label className={styles.label}>
            Class:
            <select value={charClass} onChange={e => setCharClass(e.target.value)} required className={styles.select}>
                {['Paladin', 'Warrior', 'Dragoon', 'Monk', 'Bard', 'Black Mage', 'Summoner', 'Scholar', 'White Mage', 'Ninja', 'Dark Knight', 'Machinist', 'Astrologian', 'Samurai', 'Red Mage', 'Gunbreaker', 'Dancer', 'Reaper', 'Sage', 'Viper', 'Pictomancer'].map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                ))}
            </select>
        </label>
        <button type="submit" disabled={status === 'loading'} className={styles.button}>
            {status === 'loading' ? 'Generating...' : 'Generate Lore'}
        </button>
        <button type="button" onClick={handleReset} className={styles.button}>
            Reset
        </button>
    </form>
    {status === 'failed' && <p className={styles.error}>Error: {error}</p>}
    {lore && <p className={styles.result}>{lore}</p>}
</div>
<div className={styles.disclaimer}>
            <p>This generator is powered by OpenAI's GPT-3.5 Turbo. <br/> While we strive for accuracy, the generated content may not always reflect current or factual information. Use at your own risk.</p>
        </div>
<MyFooter/>
</>
  );
}

export default LoreGenPage;
