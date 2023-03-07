const serverConfig = require("../../../server-config.json");
const { baseUrl } = serverConfig;

export const SERVER_URL = `${baseUrl}/api`;

export const DASHBOARD_API_URLS = {
    FETCH_REVIEW: `${SERVER_URL}/dashboard/review`,
};

export const USERS_API_URLS = {
    LOGIN: `${SERVER_URL}/users/login`,
    LOGOUT: `${SERVER_URL}/users/logout`,
    FETCH_USER: `${SERVER_URL}/users/show`,
    FETCH_USERS: `${SERVER_URL}/users`,
    STORE_USER: `${SERVER_URL}/users/store`,
    UPDATE_USER: `${SERVER_URL}/users/update`,
    DELETE_USER: `${SERVER_URL}/users/delete`,
};

export const SHAREHOLDERS_API_URLS = {
    FETCH_SHAREHOLDER: `${SERVER_URL}/shareholders/show`,
    FETCH_SHAREHOLDERS: `${SERVER_URL}/shareholders`,
    STORE_SHAREHOLDER: `${SERVER_URL}/shareholders/store`,
    UPDATE_SHAREHOLDER: `${SERVER_URL}/shareholders/update`,
    SET_ACTIVE_SHAREHOLDER: `${SERVER_URL}/shareholders/set_active`,
};
