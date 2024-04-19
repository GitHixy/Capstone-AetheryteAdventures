import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../userSlice/userSlice';
import loginReducer from '../loginSlice/loginSlice';
import lodestoneReducer from '../lodestoneSlice/lodestoneSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        login: loginReducer,
        lodestone: lodestoneReducer,
    },
});