export function* changeLocalStorageDarkModeLightModeEffects(newDarkModeState) {
  localStorage.setItem('darkMode', newDarkModeState.toString());
}

