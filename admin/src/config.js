export const ADMIN_API_URL = (process.env.REACT_APP_ADMIN_API_URL || 'http://localhost:5000').replace(/\/$/, '');
export const PUBLIC_API_URL = (process.env.REACT_APP_PUBLIC_API_URL || 'http://localhost:4000').replace(/\/$/, '');

export const adminApiUrl = (path) => `${ADMIN_API_URL}${path}`;
export const mediaUrl = (path) => `${PUBLIC_API_URL}/${String(path || '').replace(/^\/+/, '')}`;
