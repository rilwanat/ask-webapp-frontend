// authUtils.js
import { jwtDecode } from 'jwt-decode';

export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; Secure; SameSite=None";
};

export const deleteCookie = (name) => {
  document.cookie = name + '=; Max-Age=-99999999;';
};

// Example function to check if the user is authenticated
export const isAdminAuthenticated = () => {
  const token = getCookie('ask-admin-token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        return true;
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
  return false;
};

