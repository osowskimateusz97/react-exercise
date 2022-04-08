const user = JSON.parse(localStorage.getItem('user'));

export const getUserFromLocalStorage = () => user || null;
export const removeUserFromLocalStorage = () => {
	user && localStorage.removeItem('user');
};
