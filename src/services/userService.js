import axios from "axios";
const handleLoginApi = (useremail, userpassword) => {
    return axios.post("http://localhost:8069/api/admin/login", {
        email: useremail,
        password: userpassword,
    });
};
const getAllUsers = (inputId) => {
    return axios.get(
        `http://localhost:8069/api/admin/get-all-user?id=${inputId}`
    );
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
const newIngreService = (data) => {
    return axios.post(
        "http://localhost:8069/api/admin/create-new-ingredient",
        data
    );
};
const deleteIngreService = () => {
    return axios.post(
        "http://localhost:8069/api/admin/delete-all-ingredient",
        { Delete: 1 }
    );
};
const deleteOneIngreService = (id) => {
    return axios.post(
        "http://localhost:8069/api/admin/delete-ingredient",
        { id: id }
    );
};
const getIngreService = (inputId) => {
    return axios.get(
        `http://localhost:8069/api/user/get-all-ingredient?id=${inputId}`

    );
};
const editIngreService = (data) => {
    return axios.put("http://localhost:8069/api/admin/edit-ingredient", data);
};

const getBlogService = (inputId) => {
    return axios.post(
        `http://localhost:8069/api/user/get-all-blog?categoryId=${inputId}`
    );
};
const newBlogService = (data) => {
    return axios.post(
        "http://localhost:8069/api/admin/create-new-blog", data
    );
};
const deleteOneBlogService = (id) => {
    return axios.post(
        "http://localhost:8069/api/admin/delete-blog",
        { id: id }
    );
};
const deleteBlogService = () => {
    return axios.post(
        "http://localhost:8069/api/admin/delete-all-blog",
        { Delete: 1 }
    );
};
const editBlogService = (data) => {
    return axios.put("http://localhost:8069/api/admin/edit-blog", data);
};
const newBlogExcelService = (data) => {
    return axios.post(
        "http://localhost:8069/api/admin/create-excel-blog", data
    );
};

//SIck
const getSickService = (inputId) => {
    return axios.post(
        `http://localhost:8069/api/user/get-all-sick?categoryId=${inputId}`
    );
};
const newSickService = (data) => {
    return axios.post(
        "http://localhost:8069/api/admin/create-new-sick", data
    );
};

export {
    deleteIngreService,
    newIngreService,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    handleLoginApi,
    getIngreService,
    deleteOneIngreService,
    editIngreService,
    getBlogService,
    newBlogService,
    deleteOneBlogService,
    deleteBlogService,
    editBlogService,
    newBlogExcelService,
    getSickService,
    newSickService,
};
