import { select } from "@redux-saga/core/effects";
import { selectState } from "../../../selectors/selectorSelector";
export function* saveTodosToLocalStorageEffects() {
    ;
    const state = yield select(selectState);
    localStorage.setItem('todoState', JSON.stringify(state.todos));
}
//# sourceMappingURL=save-todos-to-local-storage.effects.js.map
