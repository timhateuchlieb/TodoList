export function* toggleDarkModeSagaEffects() {
  const currentState = localStorage.getItem('darkMode');
  const isDarkModeEnabled = stringToBoolean(currentState);

  const newDarkModeState = !isDarkModeEnabled;

  localStorage.setItem('darkMode', String(newDarkModeState));
  document.documentElement.classList.toggle('dark-mode', newDarkModeState);

  console.log(`Dark mode toggled to: ${newDarkModeState}`);
}

function stringToBoolean(value: string | null): boolean {
  return value === 'true';
}
