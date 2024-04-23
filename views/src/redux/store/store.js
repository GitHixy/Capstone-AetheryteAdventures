import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../userSlice/userSlice";
import loginReducer from "../loginSlice/loginSlice";
import lodestoneReducer from "../lodestoneSlice/lodestoneSlice";
import loreReducer from "../loreGenSlice/loreGenSlice";
import {
  achievementsSlice,
  minionsSlice,
  orchestrionsSlice,
  titlesSlice,
  triadCardsSlice,
  emotesSlice,
  mountsSlice,
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
    lore: loreReducer,
  },
});
