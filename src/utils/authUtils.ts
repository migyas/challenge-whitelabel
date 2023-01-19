export function getToken() {
  return (
    sessionStorage.getItem(import.meta.env.REACT_TOKEN_KEY) ||
    localStorage.getItem(import.meta.env.REACT_TOKEN_KEY)
  );
}

export function setToken(token: string, keepSession?: boolean) {
  if (keepSession) {
    localStorage.setItem(import.meta.env.REACT_TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(import.meta.env.REACT_TOKEN_KEY, token);
  }
}

export function removeToken() {
  sessionStorage.removeItem(import.meta.env.REACT_TOKEN_KEY);
  localStorage.removeItem(import.meta.env.REACT_TOKEN_KEY);
}
