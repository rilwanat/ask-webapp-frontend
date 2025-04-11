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
  switch(name) {
    case ("user"):
      document.cookie = "ask-user-token" + '=; Max-Age=-99999999;';
      document.cookie = "ask-user-details" + '=; Max-Age=-99999999;';
      break;
    case ("admin"):
      document.cookie = "ask-admin-token" + '=; Max-Age=-99999999;';
      document.cookie = "ask-admin-details" + '=; Max-Age=-99999999;';
    break;
  }

};

// Updated function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = getCookie('ask-user-token');
  const userDetails = getCookie('ask-user-details');

  if (token && userDetails) {
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

// Updated function to check if the admin is authenticated
export const isAdminAuthenticated = () => {
  const token = getCookie('ask-admin-token');
  const userDetails = getCookie('ask-admin-details');

  if (token && userDetails) {
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

