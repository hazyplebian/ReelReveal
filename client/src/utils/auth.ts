
class AuthService {
 
  loggedIn() {
    const token = this.getToken();
    return token;
  }

  // Retrieve the JWT token from localStorage
  getToken(): string {
    const loggedUser = localStorage.getItem('token') || '';
    return loggedUser;
  }

  // Store the JWT token in localStorage and redirect to the home page
  login(idToken: string) {
    localStorage.setItem('token', idToken);
    window.location.assign('/');
  }

  // Remove the JWT token from localStorage and redirect to the home page
  logout() {
    localStorage.removeItem('token');
    window.location.assign('/');
  }
}

export default new AuthService();