import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../userSlice/userSlice";
import loginReducer from "../loginSlice/loginSlice";
import lodestoneReducer from "../lodestoneSlice/lodestoneSlice";
import loreReducer from "../loreGenSlice/loreGenSlice";
import allFavsReducer from "../allFavsSlice/allFavsSlice";
import favsAchiReducer from "../favsAchiSlice/favsAchiSlice";
import favsTitlesReducer from "../favsTitleSlice/favsTitleSlice";
import favsCardsReducer from "../favsCardSlice/favsCardSlice";
import favsEmotesReducer from "../favsEmoteSlice/favsEmoteSlice";
import favsFashionsReducer from "../favsFashionSlice/favsFashionSlice";
import favsMinionsReducer from "../favsMinionSlice/favsMinionSlice";
import favsMountsReducer from "../favsMountSlice/favsMountSlice";
import favsOrchestrionsReducer from "../favsOrchestrionSlice/favsOrchestrionSlice";
import compareReducer from "../ffxivCompareSlice/ffxivCompareSlice";
import {
  achievementsSlice,
  minionsSlice,
  orchestrionsSlice,
  titlesSlice,
  triadCardsSlice,
  emotesSlice,
  mountsSlice,
  fashionsSlice
} from "../ffxivCollectSlice/ffxivCollectSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    lodestone: lodestoneReducer,
    achievements: achievementsSlice.reducer,
    minions: minionsSlice.reducer,
    orchestrions: orchestrionsSlice.reducer,
    titles: titlesSlice.reducer,
    triadCards: triadCardsSlice.reducer,
    emotes: emotesSlice.reducer,
    mounts: mountsSlice.reducer,
    fashions: fashionsSlice.reducer,
    lore: loreReducer,
    allFavourites: allFavsReducer,
    achiFavourites: favsAchiReducer,
    titleFavourites: favsTitlesReducer,  
    cardsFavourites: favsCardsReducer,
    emotesFavourites: favsEmotesReducer,
    fashionsFavourites: favsFashionsReducer,
    minionsFavourites: favsMinionsReducer,
    mountsFavourites: favsMountsReducer,
    orchestrionsFavourites: favsOrchestrionsReducer,
    compare: compareReducer,
  },
});
