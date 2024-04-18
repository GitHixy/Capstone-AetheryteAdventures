import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../userSlice/userSlice';
import loginReducer from '../loginSlice/loginSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        login: loginReducer,
    },
});