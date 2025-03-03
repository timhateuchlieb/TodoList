import { put } from "@redux-saga/core/effects";
import { updateAccordingToLocalStorageError } from "../../actions/actions";
import { updateAccordingToLocalStorageSuccess } from "../../actions/actions";
export function* readFromLocalStorageEffects() {
    if (localStorage.getItem('todoState') && localStorage.getItem('darkMode')) {
        const todoState = localStorage.getItem('todoState');
        const darkMode = localStorage.getItem('darkMode') === 'true';
        yield put(updateAccordingToLocalStorageSuccess({ todos: JSON.parse(todoState), darkMode: darkMode }));
    }
    else {
        yield put(updateAccordingToLocalStorageError());
    }
}
//# sourceMappingURL=read-from-local-storage.effects.js.map
