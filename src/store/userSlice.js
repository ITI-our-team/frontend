import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    fname: null,
    lname:null,
    email: null,
    role:null,
    userToken: null,
    user_id:null,
    isLoggedIn: false,
    phone_number: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userToken = action.payload.token;
            state.user_id = action.payload.user_id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.fname = action.payload.fname;
            state.lname = action.payload.lname;
            state.role = action.payload.role;
            state.phone_number = action.payload.phone_number;
            console.log(action.payload)
            console.log(state.isLoggedIn)
        },
        logout: (state) => {
            state.email = null;
            state.username = null;
            state.userToken = null;
            state.user_id = null;
            state.isLoggedIn = false;
            state.fname = null;
            state.lname = null;
            state.role = null;
            state.phone_number = null;
        },
        update:(state,action)=>{
            if (action.payload.username) state.username = action.payload.username;
            if (action.payload.first_name) state.fname = action.payload.first_name;
            if (action.payload.last_name) state.lname = action.payload.last_name;
        }
    },
});

export const { login, logout,update } = userSlice.actions;
export default userSlice.reducer;
