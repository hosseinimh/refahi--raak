import http from "./httpService";

// export const getAllPlaces = () => {
//     return http.post("/place/list");
// };
export const getEquipmentPlace = (id) => {
    // return http.post("/equipmentPlace/add");
    let result = http.post(`/equipmentplace/add/${id}`);
        console.log(result);
        return result;
};
export const getOneEquipmentPlace = (id) => {
    // return http.post("/equipmentPlace/add");
    let result = http.post(`/equipmentplace/addserial/${id}`);
        console.log(result);
        return result;
};

export const deleteEquipmentPlace = (id) => {
    return http.post(`/equipmentplace/delcat/${id}`);
};

export const getOneEquipmentEdit = (id) => {
  return http.post(`/equipmentplace/edit/${id}`);
};
export const updateEquipment = (id,data) => {
  return http.post(`/equipmentplace/updatecat/${id}`,data);
};

export const addEquipment = (data) => {
    return http.post("/equipmentplace/save", data);
};
export const saveCodePlace = (data) => {
  
    let result = http.post(`/equipmentplace/saveserial`,data);
        console.log(result);
        return result;
};

// export const updatePlace = (id, data) => {
//     // return http.post(`/place/change/${id}`, data);
//     let result = http.post(`/place/update/${id}`, data);
//     console.log(result);
//     return result;
// };