export function* changeUiFromDarkmodeLightmodeEffects(newDarkModeState) {
    document.documentElement.classList.toggle('darkMode', newDarkModeState);
}
