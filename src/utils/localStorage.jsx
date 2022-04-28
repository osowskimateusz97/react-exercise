const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('userroo', user);
  return user;
};

export const getUserFromLocalStorage = () => getUser() || null;
export const removeUserFromLocalStorage = () => {
  getUser() && localStorage.removeItem('user');
};
export const saveUserToLocalStorage = (data) => {
  localStorage.setItem('user', JSON.stringify(data));
};
