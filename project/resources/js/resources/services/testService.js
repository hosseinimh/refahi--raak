import http from "./httpService";

export const getAllTest = () => {
    return http.get("/user/list");
    // return http.post("/users");
    // let result= http.get("/user/list");
    // console.log(result)
    // return result
};