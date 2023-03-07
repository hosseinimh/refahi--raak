import { USERS_API_URLS as API_URLS } from "../../constants";
import utils from "../../utils/Utils";
import Entity from "./Entity";

export class User extends Entity {
    constructor() {
        super();
    }

    async getAll(username, name, family) {
        return await this.handlePost(API_URLS.FETCH_USERS, {
            username: username,
            name: name,
            family: family,
        });
    }

    async get(id) {
        return await this.handlePost(API_URLS.FETCH_USER + "/" + id);
    }

    async store(name, family, username, password) {
        return await this.handlePost(API_URLS.STORE_USER, {
            name: name,
            family: family,
            username: username,
            password: password,
        });
    }

    async update(id, name, family, password) {
        return await this.handlePost(API_URLS.UPDATE_USER + "/" + id, {
            name: name,
            family: family,
            password: password,
        });
    }

    async delete(id) {
        return await this.handlePost(API_URLS.DELETE_USER + "/" + id);
    }

    logOut() {
        utils.clearLS();
    }
}
