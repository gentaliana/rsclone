export const setNameUserToStorage = (userId: number, userName: string): void => {
  const getSettings = JSON.parse(localStorage.getItem('settings') || '{}');
  localStorage.removeItem('settings');
  getSettings.gamerNames[userId] = userName;
  return localStorage.setItem('settings', JSON.stringify(getSettings));
};
