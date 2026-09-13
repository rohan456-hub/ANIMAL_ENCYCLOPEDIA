export const PUBLIC_API_URL = (process.env.REACT_APP_PUBLIC_API_URL || 'http://localhost:4000').replace(/\/$/, '');

export const apiUrl = (path) => `${PUBLIC_API_URL}${path}`;
export const mediaUrl = (path) => `${PUBLIC_API_URL}/${String(path || '').replace(/^\/+/, '')}`;
