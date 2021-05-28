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

function getCultureFromSearchParams (url: string) {

  const tempUrl = new URL(url);
  const culture = (String)(tempUrl.searchParams.get("culture"));

  return culture;
}

function strCmp ( str1: string, str2: string ) {

  return ( ( str1.toLowerCase() == str2.toLowerCase() ) ? true : false );
}

function checkIfApiCallShouldBeAddedToCache(apiCalls: any[], newApiCall: string) {

  const newCulture = getCultureFromSearchParams(newApiCall)

  //edge case for no culture added
  if(newCulture.length == 0) return false; 

  //we check if culture exists
  for(let i = 0; i<apiCalls.length; i++) {
    let tempCulture = getCultureFromSearchParams(apiCalls[i].apiCall);
    //return false if already exists
    if((Boolean)(strCmp(newCulture, tempCulture))) return false;
  }

  return true;
}

//in future this could support caching policy for non-sensitive data
const successfullApiCallsSlice = createSlice({
  name: 'successfullApiCallsData',
  initialState: {
    successfullApiCalls: []
  },
  reducers: {
    putSuccessfullApiCalls: (state, action) => {

      //copy
      const newState = state.successfullApiCalls.slice();

      //check if already exists
      const shouldBeAdded = checkIfApiCallShouldBeAddedToCache([...newState ], action.payload.apiCall);

      if(shouldBeAdded) newState.push({ apiCall: action.payload.apiCall, characters: action.payload.characters });
      

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