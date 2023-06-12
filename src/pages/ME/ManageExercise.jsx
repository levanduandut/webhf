import React, { useEffect, useState } from 'react';
import { emitter } from "../../utils/emitter";
import { useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx";
import AddExercise from './AddExercise';
import "./ManageExercise.scss";
import AddCategory from './AddCategory';
import { deleteOneExeCaService, editExeCaService, getExerciseCa, newExerciseCa } from '../../services/userService';
import EditCategory from './EditCategory';

const ManageExercise = () => {
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalCa, setIsOpenModalCa] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isOpenEditModalCa, setIsOpenEditModalCa] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [exeCaEdit, setExeCaEdit] = useState({});
    const [items, setItems] = useState([]);
    const [itemsCa, setItemsCa] = useState([]);
    const [search, setSearch] = useState("");
    const [dataExcel, setDataExcel] = useState([]);
    const [colorAlert, setColorAlert] = useState("info");
    const onDismiss = () => setVisible(false);
    useEffect(() => {
        if (!localStorage.getItem("JWT")) {
            navigate("/login")
        }
        handleGetSick();
        showAlert("Đã load tất cả !", 2500, "primary");
    }, [])
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function showAlert(message, time, color) {
        setMessage(message);
        setColorAlert(color);
        setVisible(true);
        sleep(time).then(() => { setVisible(false); });
    }
    function toggleBlogModal() {
        setIsOpenModal(!isOpenModal);
    }
    function toggleBlogModalCa() {
        setIsOpenModalCa(!isOpenModalCa);
    }
    function handleAddNew() {
        setIsOpenModal(true);
    }
    function handleAddNewCa() {
        setIsOpenModalCa(true);
    }
    async function handleGetSick() {
        try {
            let response = await getExerciseCa("");
            await setItemsCa(response.data.exerciseCa);
        } catch (error) {
            console.log(error);
        }
    }
    async function createNewExerciseCa(data) {
        try {

            let response = await newExerciseCa(data);
            if (response && response.data.errCode !== 0) {
                setMessage(response.message)
            } else {
                handleGetSick();
                setIsOpenModalCa(false);
                showAlert("Thêm mới loại bài tập thành công !", 2500, "info");
                emitter.emit("EVENT_CLEAR_MODAL_Ca", { id: "123" });
            }
        } catch (error) {
            console.log(error);
            showAlert("Lỗi không thêm được !", 2500, "danger");
        }
    }
    async function createNewSick(data) {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("tag", data.tag);
            formData.append("detail", data.detail);
            formData.append("image", data.image);
            // let response = await newSickService(formData);
            // if (response && response.data.errCode !== 0) {
            //     setMessage(response.message)
            // } else {
            //     handleGetSick();
            //     setIsOpenModal(false);
            //     showAlert("Thêm mới bênh thành công !", 2500, "info");
            //     emitter.emit("EVENT_CLEAR_MODAL", { id: "123" });
            // }
        } catch (error) {
            console.log(error);
            showAlert("Lỗi không thêm được bệnh!", 2500, "danger");
        }
    }
    function readExcel(e) {
        const file = e.target.files[0];
        const promise = new Promise(async (resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
        promise.then((d) => {
            setDataExcel(d)
        });
        e.target.value = null;
    }
    // async function handleAddExcelSick(data) {
    //     try {
    //         let response = await newSickExcelService(data);
    //         if (response && response.data.errCode !== 0) {
    //             alert(response.message);
    //         } else {
    //             handleGetSick();
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     setDataExcel([])
    // }
    async function handleDeleteExeCa(id) {
        try {
            let response = await deleteOneExeCaService(id);
            if (response && response.data.errCode !== 0) {
                showAlert("Xóa loại bài tập không thành công !", 2500, "primary");
            } else {
                setIsOpenModal(false);
                showAlert("Xóa loại bài tập thành công !", 2500, "primary");
                handleGetSick();
                setVisible(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    function toggleExeEditMoDalCa() {
        setIsOpenEditModalCa(!isOpenEditModalCa);
    }
    // function handleEditBlog(item) {
    //     setIsOpenEditModal(true);
    //     setSickEdit(item);
    // }
    function handleEditExeCa(item) {
        setIsOpenEditModalCa(true);
        setExeCaEdit(item);
    }
    // async function saveEditSick(data) {
    //     try {
    //         const formData = new FormData();
    //         formData.append("id", data.id);
    //         formData.append("name", data.name);
    //         formData.append("tag", data.tag);
    //         formData.append("detail", data.detail);
    //         formData.append("image", data.image);
    //         let response = await editSickService(formData);
    //         console.log(response.data.message);
    //         if (response && response.data.errCode !== 0) {
    //             alert(response.data.message);
    //         } else {
    //             await handleGetSick();
    //             setIsOpenEditModal(false);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    async function saveExeCa(data) {
        try {
            let response = await editExeCaService(data);
            if (response && response.data.errCode !== 0) {
                alert(response.data.message);
            } else {
                await handleGetSick();
                setIsOpenEditModalCa(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    // async function handleDeleteAllSick() {
    //     try {
    //         let response = await deleteSickService();
    //         if (response && response.data.errCode !== 0) {
    //             showAlert("Xóa không thành công !", 2500, "danger");
    //         } else {
    //             handleGetSick();
    //             showAlert("Đã xóa tất cả bệnh !", 2500, "danger");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    return (
        <div>
            <AddCategory
                isOpen={isOpenModalCa}
                toggleUFromParent={toggleBlogModalCa}
                createNewExerciseCa={createNewExerciseCa}
            />
            {/* <AddExercise
                isOpen={isOpenModal}
                toggleUFromParent={toggleBlogModal}
                createNewSick={createNewSick}
            /> */}
            {/* <Alert color={colorAlert} isOpen={visible} toggle={onDismiss}>
                {message}
            </Alert> */}
            {isOpenEditModalCa && (
                <EditCategory
                    isOpen={true}
                    toggleUFromParent={toggleExeEditMoDalCa}
                    currentExeCa={exeCaEdit}
                    saveExeCa={saveExeCa}
                />
            )}
            <h1>Quản lý bài tập thể dục</h1>
            <div className='row row-cols-2'>
                <div className='col-4'>
                    <button
                        onClick={() => handleAddNewCa()}
                        className="button button4"
                    >
                        Thêm loại bài tập
                    </button>
                    <h5>Danh sách loại bài tập</h5>
                    <div className="table-container">
                        <table className="table container">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Tên loại bài tập</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    itemsCa
                                        .map((d) => (
                                            <tr key={d.id}>
                                                <td>{d.id}</td>
                                                <td>{d.name}</td>
                                                <td>
                                                    <div style={{ display: "flex" }}>
                                                        <button
                                                            onClick={() => handleEditExeCa(d)}
                                                            className="buttonx button2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteExeCa(d.id)}
                                                            className="buttonx button3"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-8'>
                    <div className="inputFile">
                        <button
                            onClick={() => handleAddNew()}
                            className="button button4"
                        >
                            Thêm bài tập
                        </button>
                        {" Hoặc "}
                        <h5>Nhập file Excel input dữ liệu :</h5>
                        <input type="file" onChange={(e) => readExcel(e)}></input>
                        <button
                            // onClick={() => handleAddExcelSick(dataExcel)}
                            className="button button5"
                        >
                            Ghi dữ liệu vào database
                        </button>
                        <button
                            // onClick={() => handleDeleteAllSick()}
                            className="button button6"
                        >
                            Xóa toàn bộ dữ liệu
                        </button>
                    </div>
                    <h5>Danh sách bài tập</h5>
                    <div className="inputFile">
                        <input
                            placeholder="Tìm kiếm "
                            className="form-control"
                            onChange={(e) => setSearch(e.target.value)}
                        ></input>
                    </div>
                    <div className="table-container">

                        <table className="table container">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Tên bài tập</th>
                                    <th scope="col">Phân Loại</th>
                                    <th scope="col">Thời gian</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items &&
                                    items
                                        .filter((item) => {
                                            return search.toLowerCase() === ""
                                                ? item
                                                : item.name.toLowerCase().includes(search);
                                        })
                                        .map((d) => (
                                            <tr key={d.id}>
                                                <td>{d.id}</td>
                                                <td>{d.categoryId}</td>
                                                <td>{d.time}</td>
                                                <td>
                                                    <div>
                                                        <img style={{ width: '50px', height: '50px' }} src={d.image != null ? `https://storage.googleapis.com/healthfood-do/${d.image}` : ""} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ display: "flex" }}>
                                                        <button
                                                            // onClick={() => handleEditBlog(d)}
                                                            className="buttonx button2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            // onClick={() => handleDeleteSick(d.id)}
                                                            className="buttonx button3"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageExercise;