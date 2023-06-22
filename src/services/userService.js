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

//Exercise
const newExerciseCa = (data) => {
    return axios.post(
        `${URL_BE}/api/admin/create-new-exercise-category`, data
    );
};
const getExerciseCa = (inputId) => {
    return axios.post(
        `${URL_BE}/api/user/get-exercise-category?categoryId=${inputId}`
    );
};
const deleteOneExeCaService = (id) => {
    return axios.post(
        `${URL_BE}/api/admin/delete-exercise-category`,
        { id: id }
    );
};
const editExeCaService = (data) => {
    return axios.put(`${URL_BE}/api/admin/edit-exercise-category`, data);
};
const newExeService = (data) => {
    return axios.post(
        `${URL_BE}/api/admin/create-new-exercise`, data
    );
};
const getExercise = (inputId) => {
    return axios.post(
        `${URL_BE}/api/user/get-exercise`, { categoryId: inputId }
    );
};
const deleteOneExeService = (id) => {
    return axios.post(
        `${URL_BE}/api/admin/delete-exercise`,
        { id: id }
    );
};
const newExeExcelService = (data) => {
    return axios.post(
        `${URL_BE}/api/admin/create-excel-exercise`, data
    );
};
const deleteExeService = () => {
    return axios.post(
        `${URL_BE}/api/admin/delete-all-exercise`,
        { Delete: 1 }
    );
};
const editExeService = (data) => {
    return axios.put(`${URL_BE}/api/admin/edit-exercise`, data);
};

//Food
const newFoodCa = (data) => {
    return axios.post(
        `${URL_BE}/api/admin/create-new-food-category`, data
    );
};
const getFoodCa = (inputId) => {
    return axios.post(
        `${URL_BE}/api/user/get-food-category?categoryId=${inputId}`
    );
};
const deleteFoodCaService = (id) => {
    return axios.post(
        `${URL_BE}/api/admin/delete-food-category`,
        { id: id }
    );
};
const editFoodCaService = (data) => {
    return axios.put(`${URL_BE}/api/admin/edit-food-category`, data);
};
const newFoodService = (data) => {
    return axios.post(
        `${URL_BE}/api/admin/create-new-food`, data
    );
};
const getFood = (inputId) => {
    return axios.post(
        `${URL_BE}/api/user/get-food`, { categoryId: 'ALL' }
    );
};
const deleteOneFoodService = (id) => {
    return axios.post(
        `${URL_BE}/api/admin/delete-food`,
        { id: id }
    );
};
const editFoodService = (data) => {
    return axios.put(`${URL_BE}/api/admin/edit-food`, data);
};
const deleteFoodService = () => {
    return axios.post(
        `${URL_BE}/api/admin/delete-all-food`,
        { Delete: 1 }
    );
};
const newFoodExcelService = (data) => {
    return axios.post(
        `${URL_BE}/api/admin/create-excel-food`, data
    );
};

const getInfo = (token) => {
    return axios.post(
        `${URL_BE}/api/user/getInfo`, token
    );
};
const getField = () => {
    return axios.get(
        `${URL_BE}/api/user/get-field`, 
    );
};

export {
    getInfo,
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
    deleteSickService,
    newExerciseCa,
    getExerciseCa,
    deleteOneExeCaService,
    editExeCaService,
    newExeService,
    getExercise,
    deleteOneExeService,
    newExeExcelService,
    deleteExeService,
    editExeService,
    newFoodCa,
    getFoodCa,
    deleteFoodCaService,
    editFoodCaService,
    newFoodService,
    getFood,
    deleteOneFoodService,
    editFoodService,
    deleteFoodService,
    newFoodExcelService,
    getField
};
