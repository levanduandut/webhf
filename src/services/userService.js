import axios from "axios";

const getAllUsers = (inputId) => {
    return axios.get(`http://localhost:8069/api/admin/get-all-user?id=${inputId}`);
};
const createNewUserService = (data) => {
    return axios.post(`http://localhost:8069/api/admin/create-new-user`, data);
};

export { getAllUsers , createNewUserService}