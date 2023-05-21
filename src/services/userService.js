import axios from "axios";
const handleLoginApi = (useremail, userpassword) => {
    return axios.post("http://localhost:8069/api/admin/login", { email: useremail, password: userpassword });
};
const getAllUsers = (inputId) => {
    return axios.get(`http://localhost:8069/api/admin/get-all-user?id=${inputId}`);
};
const createNewUserService = (data) => {
    return axios.post(`http://localhost:8069/api/admin/create-new-user`, data);
};
const deleteUserService = (id) => {
    return axios.post(`http://localhost:8069/api/admin/delete-user`, { id: id });
};
const editUserService = (data) => {
    return axios.put("http://localhost:8069/api/admin/edit-user", data);
};

export { getAllUsers, createNewUserService, deleteUserService, editUserService, handleLoginApi }