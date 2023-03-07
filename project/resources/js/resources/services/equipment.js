import http from "./httpService";

// export const getAllPlaces = () => {
//     return http.post("/place/list");
// };
export const getEquipment = () => {
    // return http.post("/equipmentPlace/add");
    let result = http.post(`/equipment/add`);
        console.log(result);
        return result;
};
// export const deletePlace = (id) => {
//     return http.post(`/place/delplace/${id}`);
// };

// export const getOnePlace = (id) => {
//   return http.post(`/place/edit/${id}`);
// };

export const addEquipment = (data) => {
    return http.post("/equipment/save", data);
};

// export const updatePlace = (id, data) => {
//     // return http.post(`/place/change/${id}`, data);
//     let result = http.post(`/place/update/${id}`, data);
//     console.log(result);
//     return result;
// };