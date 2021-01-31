export const setParamToStorage = (paramName: string, param: string | boolean): void => {
  const getSettings = JSON.parse(localStorage.getItem('settings') || '{}');
  localStorage.removeItem('settings');
  getSettings[paramName] = param;
  return localStorage.setItem('settings', JSON.stringify(getSettings));
};
