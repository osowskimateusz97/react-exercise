const getUser = () => {
  const user = localStorage.getItem('user');
  return JSON.parse(user);
};

export const getUserFromLocalStorage = () => getUser() || null;
export const removeUserFromLocalStorage = () => {
  getUser() && localStorage.removeItem('user');
};
export const saveUserToLocalStorage = (data) => {
  localStorage.setItem('user', JSON.stringify(data));
};
