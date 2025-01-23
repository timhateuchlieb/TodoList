export function* toggleDarkModeUI(newDarkModeState) {
    document.documentElement.classList.toggle('darkMode', newDarkModeState);
}
