const serverConfig = require("../../../server-config.json");
const { baseUrl } = serverConfig;

export const SERVER_URL = `${baseUrl}/api`;

export const DASHBOARD_API_URLS = {
    FETCH_USER_REVIEW: `${SERVER_URL}/dashboard/review_user`,
    FETCH_ADMIN_REVIEW: `${SERVER_URL}/dashboard/review_admin`,
};

export const USERS_API_URLS = {
    LOGIN: `${SERVER_URL}/users/login`,
    LOGOUT: `${SERVER_URL}/users/logout`,
    FETCH_USER: `${SERVER_URL}/users/show`,
    FETCH_USERS: `${SERVER_URL}/users`,
    STORE_USER: `${SERVER_URL}/users/store`,
    STORE_ADMIN: `${SERVER_URL}/users/store_admin`,
    UPDATE_USER: `${SERVER_URL}/users/update`,
    CHANGE_PASSWORD: `${SERVER_URL}/users/change_password`,
};

export const ORGANIZATIONS_API_URLS = {
    FETCH_ORGANIZATION: `${SERVER_URL}/organizations/show`,
    FETCH_ORGANIZATIONS: `${SERVER_URL}/organizations`,
    STORE_ORGANIZATION: `${SERVER_URL}/organizations/store`,
    UPDATE_ORGANIZATION: `${SERVER_URL}/organizations/update`,
};

export const DEPARTMENTS_API_URLS = {
    FETCH_DEPARTMENT: `${SERVER_URL}/departments/show`,
    FETCH_DEPARTMENTS: `${SERVER_URL}/departments`,
    STORE_DEPARTMENT: `${SERVER_URL}/departments/store`,
    UPDATE_DEPARTMENT: `${SERVER_URL}/departments/update`,
};

export const UNITS_API_URLS = {
    FETCH_UNIT: `${SERVER_URL}/units/show`,
    FETCH_UNITS: `${SERVER_URL}/units`,
    STORE_UNIT: `${SERVER_URL}/units/store`,
    UPDATE_UNIT: `${SERVER_URL}/units/update`,
};

export const DOCUMENTS_API_URLS = {
    FETCH_DOCUMENT: `${SERVER_URL}/documents/show`,
    FETCH_DOCUMENTS: `${SERVER_URL}/documents`,
    STORE_DOCUMENT: `${SERVER_URL}/documents/store`,
    UPDATE_DOCUMENT: `${SERVER_URL}/documents/update`,
};

export const TICKETS_API_URLS = {
    FETCH_USER_TICKET: `${SERVER_URL}/tickets/show_user`,
    FETCH_ADMIN_TICKET: `${SERVER_URL}/tickets/show_admin`,
    FETCH_TICKETS: `${SERVER_URL}/tickets`,
    STORE_TICKET: `${SERVER_URL}/tickets/store`,
    STORE_TICKET_THREAD_USER: `${SERVER_URL}/tickets/store_thread_user`,
    STORE_TICKET_THREAD_ADMIN: `${SERVER_URL}/tickets/store_thread_admin`,
    SEEN_TICKET: `${SERVER_URL}/tickets/seen`,
    CHANGE_STATUS_TICKET: `${SERVER_URL}/tickets/change_status`,
};
