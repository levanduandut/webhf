import React, { useEffect, useState } from 'react';
import { emitter } from "../../utils/emitter";
import { useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx";
import AddFood from './AddFood';
import "./ManageFood.scss";
import { deleteFoodCaService, editFoodCaService, getFoodCa, getSickService, newFoodCa, newFoodService } from '../../services/userService';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';

const ManageFood = () => {
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalCa, setIsOpenModalCa] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isOpenEditModalCa, setIsOpenEditModalCa] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [foodCaEdit, setFoodCaEdit] = useState({});
    const [sickEdit, setSickEdit] = useState({});
    const [items, setItems] = useState([]);
    const [itemsCa, setItemsCa] = useState([]);
    const [itemSick, setItemSick] = useState([]);
    const [search, setSearch] = useState("");
    const [dataExcel, setDataExcel] = useState([]);
    const [colorAlert, setColorAlert] = useState("info");
    const onDismiss = () => setVisible(false);
    useEffect(() => {
        if (!localStorage.getItem("JWT")) {
            navigate("/login")
        }
        handleGetSick();
        handleGetFoodCa();
        showAlert("Đã load tất cả bệnh !", 2500, "primary");
    }, [])
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function handleGetSick() {
        try {
            let response = await getSickService("");
            await setItemSick(response.data.sick);
        } catch (error) {
            console.log(error);
        }
    }
    function showAlert(message, time, color) {
        setMessage(message);
        setColorAlert(color);
        setVisible(true);
        sleep(time).then(() => { setVisible(false); });
    }
    // function toggleBlogModal() {
    //     setIsOpenModal(!isOpenModal);
    // }
    function handleAddNew() {
        setIsOpenModal(true);
    }
    function toggleFoodCaModal() {
        setIsOpenModalCa(!isOpenModalCa);
    }
    function handleAddNewCa() {
        setIsOpenModalCa(true);
    }
    // async function handleGetSick() {
    //     try {
    //         // let response = await getSickService("");
    //         // await setItems(response.data.sick);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
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
    // async function handleDeleteFoodCa(id) {
    //     try {
    //         let response = await deleteOneSickService(id);
    //         if (response && response.data.errCode !== 0) {
    //             showAlert("Xóa bệnh không thành công !", 2500, "primary");
    //         } else {
    //             setIsOpenModal(false);
    //             showAlert("Xóa bệnh thành công !", 2500, "primary");
    //             handleGetSick();
    //             setVisible(true);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    async function handleDeleteFoodCa(id) {
        try {
            let response = await deleteFoodCaService(id);
            if (response && response.data.errCode !== 0) {
                showAlert("Xóa loại bài tập không thành công !", 2500, "primary");
            } else {
                setIsOpenModal(false);
                showAlert("Xóa loại bài tập thành công !", 2500, "primary");
                handleGetFoodCa();
                setVisible(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    // function toggleSickEditMoDal() {
    //     setIsOpenEditModal(!isOpenEditModal);
    // }
    function toggleFoodCaEditMoDal() {
        setIsOpenEditModalCa(!isOpenEditModalCa);
    }

    function handleEditExeCa(item) {
        setIsOpenEditModalCa(true);
        setFoodCaEdit(item);
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
    async function handleGetFoodCa() {
        try {
            let response = await getFoodCa("");
            await setItemsCa(response.data.foodCa);
        } catch (error) {
            console.log(error);
        }
    }
    async function createNewFoodCa(data) {
        try {
            let response = await newFoodCa(data);
            if (response && response.data.errCode !== 0) {
                setMessage(response.message)
            } else {
                handleGetFoodCa();
                setIsOpenModalCa(false);
                showAlert("Thêm mới loại bài tập thành công !", 2500, "info");
                emitter.emit("EVENT_CLEAR_MODAL_Ca", { id: "123" });
            }
        } catch (error) {
            console.log(error);
            showAlert("Lỗi không thêm được !", 2500, "danger");
        }
    }
    async function saveFoodCa(data) {
        try {
            let response = await editFoodCaService(data);
            if (response && response.data.errCode !== 0) {
                alert(response.data.message);
            } else {
                await handleGetFoodCa();
                setIsOpenEditModalCa(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function createNewFood(data) {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("calo", data.calo);
            formData.append("tag", data.tag);
            formData.append("sickId", (Number(data.sickId) * Number(data.status)));
            formData.append("categoryId", data.categoryId);
            formData.append("detail", data.detail);
            formData.append("time", data.time);
            formData.append("star", data.star);
            formData.append("image", data.image);
            let response = await newFoodService(formData);
            if (response && response.data.errCode !== 0) {
                setMessage(response.message)
            } else {
                // handleGetExe();
                setIsOpenModal(false);
                showAlert("Thêm mới món ăn thành công !", 2500, "info");
                emitter.emit("EVENT_CLEAR_MODAL", { id: "123" });
            }
        } catch (error) {
            console.log(error);
            showAlert("Lỗi không thêm được món ăn!", 2500, "danger");
        }
    }
    function toggleFoodModal() {
        setIsOpenModal(!isOpenModal);
    }
    return (
        <div>
            <AddCategory
                isOpen={isOpenModalCa}
                toggleUFromParent={toggleFoodCaModal}
                createNewFoodCa={createNewFoodCa}
            />
            <AddFood
                isOpen={isOpenModal}
                toggleUFromParent={toggleFoodModal}
                createNewFood={createNewFood}
                itemsCa={itemsCa}
                itemSick={itemSick}
            />
            {/* <Alert color={colorAlert} isOpen={visible} toggle={onDismiss}>
                {message}
            </Alert> */}
            {/* {isOpenEditModal && (
                <EditSick
                    isOpen={true}
                    toggleUFromParent={toggleFoodCaEditMoDal}
                    currentSick={sickEdit}
                    saveSick={saveEditSick}
                />
            )} */}
            {isOpenEditModalCa && (
                <EditCategory
                    isOpen={true}
                    toggleUFromParent={toggleFoodCaEditMoDal}
                    currentFoodCa={foodCaEdit}
                    saveFoodCa={saveFoodCa}
                />
            )}
            <h1>Quản lý món ăn</h1>


            <div className='row row-cols-3'>
                <div className='col-3'>
                    <button
                        onClick={() => handleAddNewCa()}
                        className="button button4"
                    >
                        Thêm loại món ăn
                    </button>
                    <h5>Danh sách loại món ăn</h5>
                    <div className="table-container">
                        <table className="table container">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Tên loại món ăn</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsCa &&
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
                                                            onClick={() => handleDeleteFoodCa(d.id)}
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
                <div className='col-6'>
                    <div className="inputFile">
                        <button
                            onClick={() => handleAddNew()}
                            className="button button4"
                        >
                            Thêm món ăn
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
                    <h5>Danh sách món ăn</h5>
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
                                    <th scope="col">Tên món ăn</th>
                                    <th scope="col">Id Sick</th>
                                    <th scope="col">Id Food Category</th>
                                    <th scope="col">Tag</th>
                                    <th scope="col">Calo</th>
                                    <th scope="col">Thời gian</th>
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
                                                <td>{d.name}</td>
                                                <td>{d.categoryId}</td>
                                                <td>{d.tag}</td>
                                                <td>{d.calo}</td>
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
                                                            // onClick={() => handleDeleteFoodCa(d.id)}
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
                <div className='col-3'>
                    <h5>Danh sách bệnh theo Id</h5>
                    <div className="table-container">
                        <table className="table container">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Tên bệnh</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemSick &&
                                    itemSick
                                        .map((d) => (
                                            <tr key={d.id}>
                                                <td>{d.id}</td>
                                                <td>{d.name}</td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                    <h4>Lưu ý:</h4>
                    <p>- Nếu idSick món ăn = Id Bệnh : Nên Ăn</p>
                    <p>- Nếu idSick món ăn = - Id Bệnh : Không Nên Ăn</p>
                </div>
            </div>
        </div>
    );
};

export default ManageFood;