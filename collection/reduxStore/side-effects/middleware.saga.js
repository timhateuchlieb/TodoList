import { ADD_TODO, TOGGLE_TODO, TOGGLE_DARK_MODE, UPDATE_ACCORDING_TO_LOCAL_STORAGE } from "../actions/actionTypes";
import { takeLatest, call } from "@redux-saga/core/effects";
import { saveTodosToLocalStorageEffects } from "./effects/save-todos-to-local-storage.effects";
import { changeLocalStorageDarkModeLightModeEffects as changeLocalStorageDarkmodeLightmodeEffects } from "./effects/cange-localstorage-darkmode-lightmode.effects";
import { changeUiFromDarkmodeLightmodeEffects } from "./effects/change-ui-from-darkmode-lightmode.effects";
import { readFromLocalStorageEffects } from "./effects/read-from-local-storage.effects";
export function* rootSaga() {
    yield takeLatest([ADD_TODO, TOGGLE_TODO], syncLocalStorage);
    yield takeLatest(TOGGLE_DARK_MODE, toggleDarkModeSaga);
    yield takeLatest(UPDATE_ACCORDING_TO_LOCAL_STORAGE, readFromLocalStorage);
}
function* syncLocalStorage() {
    yield call(saveTodosToLocalStorageEffects);
}
function* toggleDarkModeSaga(newDarkmodeState) {
    const payload = newDarkmodeState.payload;
    yield call(changeUiFromDarkmodeLightmodeEffects, payload);
    yield call(changeLocalStorageDarkmodeLightmodeEffects, payload);
}
function* readFromLocalStorage() {
    yield call(readFromLocalStorageEffects);
}
//# sourceMappingURL=middleware.saga.js.map
