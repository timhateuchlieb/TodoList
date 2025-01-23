export function* changeLocalStorageDarkModeLightModeEffects(newDarkModeState: boolean) {
  localStorage.setItem('darkMode', String(newDarkModeState));
}
