import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emitter } from "../../utils/emitter";
import AddSick from './AddSick';
import { Alert } from 'reactstrap';
import * as XLSX from "xlsx";
import { deleteOneSickService, deleteSickService, editSickService, getField, getSickService, newSickExcelService, newSickService } from '../../services/userService';
import EditSick from './EditSick';
const ManageSick = () => {
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [sickEdit, setSickEdit] = useState({});
    const [items, setItems] = useState([]);
    const [field, setField] = useState([]);
    const [search, setSearch] = useState("");
    const [dataExcel, setDataExcel] = useState([]);
    const [colorAlert, setColorAlert] = useState("info");
    const onDismiss = () => setVisible(false);
    useEffect(() => {
        if (!localStorage.getItem("JWT")) {
            navigate("/login")
        }
        handleGetSick();
        handleGetField();
    }, [])
    async function handleGetField() {
        try {
            let response = await getField();
            console.log(response.data.field);
            await setField(response.data.field);
        } catch (error) {
            console.log(error);
        }
    }
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
    function handleAddNew() {
        setIsOpenModal(true);
    }
    async function handleGetSick() {
        try {
            let response = await getSickService("");
            await setItems(response.data.sick);
        } catch (error) {
            console.log(error);
        }
    }
    async function createNewSick(data) {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("arring", data.arring);
            formData.append("tag", data.tag);
            formData.append("detail", data.detail);
            formData.append("image", data.image);
            let response = await newSickService(formData);
            if (response && response.data.errCode !== 0) {
                setMessage(response.message)
            } else {
                handleGetSick();
                setIsOpenModal(false);
                showAlert("Thêm mới bênh thành công !", 2500, "info");
                emitter.emit("EVENT_CLEAR_MODAL", { id: "123" });
            }
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
    async function handleAddExcelSick(data) {
        try {
            let response = await newSickExcelService(data);
            if (response && response.data.errCode !== 0) {
                alert(response.message);
            } else {
                handleGetSick();
            }
        } catch (error) {
            console.log(error);
        }
        setDataExcel([])
    }
    async function handleDeleteSick(id) {
        try {
            let response = await deleteOneSickService(id);
            if (response && response.data.errCode !== 0) {
                showAlert("Xóa bệnh không thành công !", 2500, "primary");
            } else {
                setIsOpenModal(false);
                showAlert("Xóa bệnh thành công !", 2500, "primary");
                handleGetSick();
                setVisible(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    function toggleSickEditMoDal() {
        setIsOpenEditModal(!isOpenEditModal);
    }
    function handleEditBlog(item) {
        setIsOpenEditModal(true);
        setSickEdit(item);
    }
    async function saveEditSick(data) {
        try {
            const formData = new FormData();
            formData.append("id", data.id);
            formData.append("name", data.name);
            formData.append("arring", data.arring);
            formData.append("tag", data.tag);
            formData.append("detail", data.detail);
            formData.append("image", data.image);
            let response = await editSickService(formData);
            console.log(response.data.message);
            if (response && response.data.errCode !== 0) {
                alert(response.data.message);
            } else {
                await handleGetSick();
                setIsOpenEditModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function handleDeleteAllSick() {
        try {
            let response = await deleteSickService();
            if (response && response.data.errCode !== 0) {
                showAlert("Xóa không thành công !", 2500, "danger");
            } else {
                handleGetSick();
                showAlert("Đã xóa tất cả bệnh !", 2500, "danger");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <AddSick
                isOpen={isOpenModal}
                toggleUFromParent={toggleBlogModal}
                createNewSick={createNewSick}
            />
            <Alert color={colorAlert} isOpen={visible} toggle={onDismiss}>
                {message}
            </Alert>
            {isOpenEditModal && (
                <EditSick
                    isOpen={true}
                    toggleUFromParent={toggleSickEditMoDal}
                    currentSick={sickEdit}
                    saveSick={saveEditSick}
                />
            )}
            <div className='row row-cols-3'>
                <div className='col-3'>
                    <h5>Danh sách các trường trong thành phần thực phẩm</h5>
                    <div className="table-container">
                        <table className="table container">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Tên Trường Sắp Xếp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {field &&
                                    field
                                        .map((d, index) => (
                                            <tr key={index}>
                                                <td>{index}</td>
                                                <td>{d}</td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                    <h4>Chú thích : Array Id SBF</h4>
                    <p>- Nếu Id SBF {'>'} 0 : Thành phần nên ăn </p>
                    <p>- Nếu Id SBF {'<'} 0 : Thành phần không nên ăn</p>
                </div>
                <div className='col-9'>
                    <h1>Quản lý bệnh</h1>
                    <div className="inputFile">
                        <button
                            onClick={() => handleAddNew()}
                            className="button button4"
                        >
                            Thêm bệnh
                        </button>
                        {" Hoặc "}
                        <h5>Nhập file Excel input dữ liệu :</h5>
                        <input type="file" onChange={(e) => readExcel(e)}></input>
                        <button
                            onClick={() => handleAddExcelSick(dataExcel)}
                            className="button button5"
                        >
                            Ghi dữ liệu vào database
                        </button>
                        <button
                            onClick={() => handleDeleteAllSick()}
                            className="button button6"
                        >
                            Xóa toàn bộ dữ liệu
                        </button>
                    </div>

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
                                    <th scope="col">Tên bệnh</th>
                                    <th scope="col">Array Id SBF</th>
                                    <th scope="col">Tag</th>
                                    <th scope="col">Mô tả</th>
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
                                                <td>{d.name}</td>
                                                <td>{d.arring}</td>
                                                <td>{d.tag}</td>
                                                <td>{d.detail}</td>
                                                <td>
                                                    <div>
                                                        <img style={{ width: '50px', height: '50px' }} src={d.image != null ? `${d.image}` : ""} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ display: "flex" }}>
                                                        <button
                                                            onClick={() => handleEditBlog(d)}
                                                            className="buttonx button2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteSick(d.id)}
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

export default ManageSick;