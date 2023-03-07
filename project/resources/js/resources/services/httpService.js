import axios from "axios";

axios.defaults.baseURL = "https://refahi.raakcms.ir/api";
axios.defaults.withCredentials = true;

// axios.interceptors.request.use((request)=>{
//     console.log("request :",request);
//     return request;
// },(error)=>{
//     console.log("request error :",error);
//     return error;
// });
// axios.interceptors.response.use((response)=>{
//     console.log("response :",response);
//     return response;
// },(error)=>{
//     console.log("response error :",error);
//     return error;
// });

const http = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
};
export default http;
