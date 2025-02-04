export function* changeUiFromDarkmodeLightmodeEffects(newDarkModeState : boolean) {

    let darkMode = newDarkModeState;
    document.documentElement.classList.toggle('darkMode', darkMode);
}
