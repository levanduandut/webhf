import axios from "axios";
const URL_BE = process.env.REACT_APP_URL_BE;

const handleLoginApi = (useremail, userpassword) => {
    return axios.post(`${URL_BE}/api/admin/login`, {
        email: useremail,
        password: userpassword,
    });
};
const getAllUsers = (inputId) => {
    return axios.get(
        `${URL_BE}/api/admin/get-all-user?id=${inputId}`
    );
};
const createNewUserService = (data) => {
    return axios.post(`${URL_BE}/api/admin/create-new-user`, data);
};
const deleteUserService = (id) => {
    return axios.post(`${URL_BE}/api/admin/delete-user`, { id: id });
};
const editUserService = (data) => {
    return axios.put(`${URL_BE}/api/admin/edit-user`, data);
};

//Ingre
const newIngreService = (data) => {
    return axios.post(
        `${URL_BE}/api/admin/create-new-ingredient`,
        data
    );
};
const deleteIngreService = () => {
    return axios.post(
        `${URL_BE}/api/admin/delete-all-ingredient`,
        { Delete: 1 }
    );
};
const deleteOneIngreService = (id) => {
    return axios.post(
        `${URL_BE}/api/admin/delete-ingredient`,
        { id: id }
    );
};
const getIngreService = (inputId) => {
    return axios.get(
        `${URL_BE}/api/user/get-all-ingredient?id=${inputId}`

    );
};
const editIngreService = (data) => {
    return axios.put(`${URL_BE}/api/admin/edit-ingredient`, data);
};


//Blog
const getBlogService = (inputId) => {
    return axios.post(
        `${URL_BE}/api/user/get-all-blog?categoryId=${inputId}`
    );
};
const newBlogService = (data) => {
    return axios.post(
        `${URL_BE}/api/admin/create-new-blog`, data
    );
};
const deleteOneBlogService = (id) => {
    return axios.post(
        `${URL_BE}/api/admin/delete-blog`,
        { id: id }
    );
};
const deleteBlogService = () => {
    return axios.post(
        `${URL_BE}/api/admin/delete-all-blog`,
        { Delete: 1 }
    );
};
const editBlogService = (data) => {
    return axios.put(`${URL_BE}/api/admin/edit-blog`, data);
};
const newBlogExcelService = (data) => {
    return axios.post(
        `${URL_BE}/api/admin/create-excel-blog`, data
    );
};

//Sick
const getSickService = (inputId) => {
    return axios.post(
        `${URL_BE}/api/user/get-all-sick?categoryId=${inputId}`
    );
};
const newSickService = (data) => {
    return axios.post(
        `${URL_BE}/api/admin/create-new-sick`, data
    );
};
const newSickExcelService = (data) => {
    return axios.post(
        `${URL_BE}/api/admin/create-excel-sick`, data
    );
};
const deleteOneSickService = (id) => {
    return axios.post(
        `${URL_BE}/api/admin/delete-sick`,
        { id: id }
    );
};
const editSickService = (data) => {
    return axios.put(`${URL_BE}/api/admin/edit-sick`, data);
};
const deleteSickService = () => {
    return axios.post(
        `${URL_BE}/api/admin/delete-all-sick`,
        { Delete: 1 }
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
    newSickExcelService,
    deleteOneSickService,
    editSickService,
    deleteSickService
};
