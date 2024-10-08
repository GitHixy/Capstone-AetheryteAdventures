import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AchievementsPage from "./pages/AchievementsPage/AchievementsPage";
import TitlesPage from "./pages/TitlesPage/TitlesPage";
import MountsPage from "./pages/MountsPage/MountsPage";
import MinionsPage from "./pages/MinionsPage/MinionsPage";
import OrchestrionsPage from "./pages/OrchestrionsPage/OrchestrionsPage";
import TriadCardsPage from "./pages/TriadCardsPage/TriadCardsPage";
import EmotesPage from "./pages/EmotesPage/EmotesPage";
import LoreGenPage from "./pages/LoreGenPage/LoreGenPage";
import FashionsPage from "./pages/FashionsPage/FashionsPage";
import BooksPage from "./pages/BookPage/BooksPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import DevDiaryPage from "./pages/DevDiaryPage/DevDiaryPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import RecruitmentHomePage from "./pages/RecruitmentHomePage/RecruitmentHomePage";
import FCPage from "./pages/FCPage/FCPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./customCSS/toastsMod.css";



function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/titles" element={<TitlesPage />} />
        <Route path="/mounts" element={<MountsPage />} />
        <Route path="/minions" element={<MinionsPage />} />
        <Route path="/orchestrions" element={<OrchestrionsPage />} />
        <Route path="/triad/cards" element={<TriadCardsPage />} />
        <Route path="/emotes" element={<EmotesPage />} />
        <Route path="/loreGenerator" element={<LoreGenPage/>} />
        <Route path="/FCRecruitment" element={<RecruitmentHomePage/>} />
        <Route path="/aeterna-rebellio" element={<FCPage/>} />
        <Route path="/fashions" element={<FashionsPage/>} />
        <Route path="/books" element={<BooksPage/>} />
        <Route path="/dashboard/:id" element={<DashboardPage/>} />
        <Route path="/devDiary" element={<DevDiaryPage/>} />
        <Route path="/success" element={<SuccessPage/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
