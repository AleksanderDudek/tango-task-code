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

const successfullApiCallsSlice = createSlice({
  name: 'successfullApiCallsData',
  initialState: {
    successfullApiCalls: []
  },
  reducers: {
    putSuccessfullApiCalls: (state, action) => {

      const newState = state.successfullApiCalls.slice();

      newState.push({ apiCall: action.payload.apiCall, characters: action.payload.characters });

      return {
        successfullApiCalls: [...newState ]
      };
    }
  }
});

//reducer which operates on store
export const { fetchData } = housesSlice.actions;
export const { fetchCharactersData } = charactersSlice.actions;
export const { putSuccessfullApiCalls } = successfullApiCallsSlice.actions;


let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

//full store
const store = configureStore({
  reducer: {
    housesData: housesSlice.reducer,
    charactersData: charactersSlice.reducer,
    successfullApiCallsData: successfullApiCallsSlice.reducer,
  },
  middleware
});

sagaMiddleware.run(saga);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch