import http from "./httpService";

export const getAllUsers = () => {
    return http.get("/user/list");
    // return http.post("/users");
    // let result= http.get("/user/list");
    // console.log(result)
    // return result
};
export const getAllTowns = () => {
    return http.post("/user/add");
};

export const loginUser = (data) => {
    // let result = http.post("/user/checkpass", data);
    // console.log(result)
    // return result
    return http.post("/user/checkpass", data);
    // return http.post("/users/login", data);
};

export const addUser = (data) => {
    // return http.post("/users/store", data);
    // return http.post("/user/save", data);
    let result = http.post("/user/save", data);
    console.log(result);
    return result;
};

export const deleteUser = (id) => {
    // return http.delete(`/user/${id}`);
    // return http.post(`/user/delete/${id}`);
    let result = http.post(`/user/delete/${id}`);
    console.log(result);
    return result;
};

export const getOneUser = (id) => {
    return http.post(`/user/edit/${id}`);
};
export const updateUser = (id, data) => {
    // return http.put(`/users/update/${id}`, data);
    // return http.put(`/user/update/${id}`, data);
    let result = http.post(`/user/update/${id}`, data);
    console.log(result);
    return result;
};
