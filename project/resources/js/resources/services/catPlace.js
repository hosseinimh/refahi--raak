import http from "./httpService";

export const getAllCatPlaces = () => {
    return http.post("/equipment/catlist");
};

// export const addCatPlace = (data) => {
//   return http.post("/place/addplace", data);
// };

// export const updateCatPlace = (id, data) => {
//   return http.put(`/place/editplace/${id}`, data);
// };

// export const deleteCatPlace = (id) => {
//   return http.delete(`/place/deleteplace/${id}`);
// };
