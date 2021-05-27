import {
    createSlice,
    configureStore,
    getDefaultMiddleware
  } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";

import saga from "./saga";

//slice of the store
const housesSlice = createSlice({
    name: 'housesData',
    initialState: {
      houses: []
    },
    reducers: {
      fetchData: (state, action) => {
        return {
          houses: action.payload
        };
      }
    }
});

const charactersSlice = createSlice({
  name: 'charactersData',
  initialState: {
    characters: []
  },
  reducers: {
    fetchCharactersData: (state, action) => {
      return {
        characters: action.payload
      };
    }
  }
});
  
//reducer which operates on store
export const { fetchData } = housesSlice.actions;
export const { fetchCharactersData } = charactersSlice.actions;

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

//full store
const store = configureStore({
  reducer: {
    housesData: housesSlice.reducer,
    charactersData: charactersSlice.reducer
  },
  middleware
});

sagaMiddleware.run(saga);

export default store;