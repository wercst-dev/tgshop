const ADMIN_PASSWORD = 'admin123'; // Пароль для входа в админку

export function verifyAdminPassword(password) {
  return password === ADMIN_PASSWORD;
}

export function isAdminSession() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_logged_in') === 'true';
  }
  return false;
}

export function loginAdmin(password) {
  if (verifyAdminPassword(password)) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_logged_in', 'true');
    }
    return true;
  }
  return false;
}

export function logoutAdmin() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_logged_in');
  }
}
