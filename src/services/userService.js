import axios from "axios";

const getAllUsers = (inputId) => {
    return axios.get(`http://localhost:8069/api/admin/get-all-user?id=${inputId}`);
};

export { getAllUsers }