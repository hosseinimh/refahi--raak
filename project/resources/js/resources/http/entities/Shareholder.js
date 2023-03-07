import { SHAREHOLDERS_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class Shareholder extends Entity {
    constructor() {
        super();
    }

    async getAll() {
        return await this.handlePost(API_URLS.FETCH_SHAREHOLDERS, {});
    }

    async get(id) {
        return await this.handlePost(API_URLS.FETCH_SHAREHOLDER + "/" + id);
    }

    async store(
        name,
        family,
        father_name,
        issue_place,
        identity_no,
        national_code,
        birth_date,
        mobile,
        phone,
        address,
        postal_code,
        email,
        sheba_no,
        physical_condition,
        degree,
        native,
        native_file,
        bank,
        account_no
    ) {
        let data = new FormData();

        data.append("name", name);
        data.append("family", family);
        data.append("father_name", father_name);
        data.append("issue_place", issue_place);
        data.append("identity_no", identity_no);
        data.append("national_code", national_code);
        data.append("birth_date", birth_date);
        data.append("mobile", mobile);
        data.append("phone", phone);
        data.append("address", address);
        data.append("postal_code", postal_code);
        data.append("email", email);
        data.append("sheba_no", sheba_no);
        data.append("physical_condition", physical_condition);
        data.append("degree", degree);
        data.append("native", native);
        data.append("native_file", native_file);
        data.append("bank", bank);
        data.append("account_no", account_no);

        return await this.handlePost(API_URLS.STORE_SHAREHOLDER, data);
    }

    async setActive(id) {
        return await this.handlePost(
            API_URLS.SET_ACTIVE_SHAREHOLDER + "/" + id
        );
    }
}
