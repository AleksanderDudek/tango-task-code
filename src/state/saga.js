import { call, takeEvery, put, all, fork } from "redux-saga/effects";
import Axios from "axios";
import { fetchData, fetchCharactersData } from "./store";
import { sagaActions } from "./sagaActions";

let callAPI = async ({ url, method, data }) => {
  return await Axios({
    url,
    method,
    data
  });
};

export function* fetchHousesDataSaga() {
  try {
    let result = yield call(() =>
      callAPI({ url: "https://anapioficeandfire.com/api/houses" })
    );
    yield put(fetchData(result.data));
  } catch (e) {
    yield put({ type: "HOUSES_FETCH_FAILED" });
  }
}

export function* fetchCharactersDataSaga() {
    try {
      let result = yield call(() =>
        callAPI({ url: "https://anapioficeandfire.com/api/characters" })
      );
      yield put(fetchCharactersData(result.data));
    } catch (e) {
      yield put({ type: "CHARACTERS_FETCH_FAILED" });
    }
  }

export default function* rootSaga() {

yield all([
    yield takeEvery(sagaActions.FETCH_HOUSES_DATA_SAGA, fetchHousesDataSaga),
    yield takeEvery(sagaActions.FETCH_CHARACTERS_DATA_SAGA, fetchCharactersDataSaga),
  ]);
}
