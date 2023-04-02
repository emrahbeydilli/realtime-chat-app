import { configureStore } from '@reduxjs/toolkit';
import mapReducer from "../MapPage/MapPage";


const store = configureStore({
    reducer:{
        map:mapReducer
    }
});

export default store;