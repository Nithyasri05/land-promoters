/**
 * Tab-scoped token store.
 *
 * WHY NOT localStorage?
 * - localStorage is accessible to any JavaScript on the page, making it
 *   vulnerable to XSS attacks. If an attacker injects a script, they can
 *   steal the token and impersonate an admin.
 *
 * THIS APPROACH:
 * - Token is kept in sessionStorage so a browser refresh preserves the admin route.
 * - sessionStorage is cleared automatically when the browser tab is closed.
 * - The in-memory copy is still used for request headers.
 * - For production, the ideal solution is an httpOnly cookie set by the server,
 *   but this approach is significantly better than localStorage for a SPA.
 */

let _token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') : null;

export const tokenStore = {
  get: () => _token,
  set: (token) => {
    _token = token;
    sessionStorage.setItem('admin_token', token);
  },
  clear: () => {
    _token = null;
    sessionStorage.removeItem('admin_token');
  },
};
