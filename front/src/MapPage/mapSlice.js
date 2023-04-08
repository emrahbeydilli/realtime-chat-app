import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myLocation: null,
    onlineUsers: [],
    cardChosenOption: null
};

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMyLocation: (state, action) => {
            console.log("mapslice",action.payload);
            state.myLocation = action.payload;
        },
    }
});

export const {
    setMyLocation
} = mapSlice.actions;

export default mapSlice.reducer;