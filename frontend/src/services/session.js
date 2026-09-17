const USER_KEY = "vatsalya_user";

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function saveUser(user) {
  setCurrentUser(user);
}

export function clearSession() {
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated() {
  return Boolean(getCurrentUser());
}

export function getRole() {
  return getCurrentUser()?.role?.toUpperCase() || null;
}
