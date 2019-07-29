const currentUser = localStorage.getItem('currentUser');

export const authenticationService = {
  logout,
  currentUser,
};

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUser.next(null);
}
