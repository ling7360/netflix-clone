import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return {
                isLogged: false,
                email: null,
                token: null,
                expireTime: 0
            }
        }
        return {
            isLogged: true,
            token: token,
            email: localStorage.getItem('email'),
            expireTime: +localStorage.getItem('expireTime')
        }
    },
    reducers: {
        login: (state, action) => {
            state.isLogged = true;
            state.email = action.payload.email;
            state.token = action.payload.token;

            const currentTime = Date.now();
            // const timeout = 1000 * 60 * 60 * 24 * 7;
            const timeout = 7000;

            state.expireTime = currentTime + timeout;
            // state.expireTime = action.payload.expireTime;

            localStorage.setItem('token', state.token);
            localStorage.setItem('email', state.email);
            localStorage.setItem('expireTime', state.expireTime + '');
        },
        logout: (state) => {
            state.isLogged = false;
            state.token = null;

            localStorage.removeItem('token');
            // localStorage.removeItem('user');
            localStorage.removeItem('expireTime');
        }
    },
})

export const { login, logout } = userSlice.actions;
export const selectUser = state => state.user;
export default userSlice.reducer;