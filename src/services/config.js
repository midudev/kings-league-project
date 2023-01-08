export const isDevelopment = import.meta.env.MODE !== 'production'
export const apiURL = isDevelopment ? 'http://127.0.0.1:8787' : 'https://api.kingsleague.dev'
