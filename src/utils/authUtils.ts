import {UserData} from '@/pages/Users';

export function getToken() {
  return sessionStorage.getItem('token') || localStorage.getItem('token');
}

export function setToken(token: string, keepSession?: boolean) {
  if (keepSession) {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
}

export function removeToken() {
  sessionStorage.removeItem('token');
  localStorage.removeItem('token');
  localStorage.clear();
}

export const userLogin = (findUserLogged: UserData) => {
  localStorage.setItem('login', JSON.stringify(findUserLogged));
};
export const getUserLogged = JSON.parse(localStorage.getItem('login')!);
