import http from "./httpService";

export const getAllPlaces = () => {
    return http.post("/place/list");
};
export const getAllTowns = () => {
    return http.post("/place/add");
};
export const deletePlace = (id) => {
    return http.post(`/place/delplace/${id}`);
};


export const addPlace = (data) => {
    return http.post("/place/save", data);
};
export const getAllRentPlace = () => {
    return http.post(`/place/listrent`);
};
export const rentAddPlace = (id) => {
    return http.post(`/place/rentadd/${id}`);
};
export const rentSavePlace = (data) => {
    return http.post("/place/rentsave", data);
};

export const getOnePlace = (id) => {
  return http.post(`/place/edit/${id}`);
};

export const updatePlace = (id, data) => {
    // return http.put(`/users/update/${id}`, data);
    // return http.put(`/user/update/${id}`, data);
    let result = http.post(`/place/update/${id}`, data);
    console.log(result);
    return result;
};



