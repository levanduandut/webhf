import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emitter } from "../../utils/emitter";
import AddSick from './AddSick';
import { Alert } from 'reactstrap';
import * as XLSX from "xlsx";
import { getSickService, newSickExcelService, newSickService } from '../../services/userService';
const ManageSick = () => {
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [dataExcel, setDataExcel] = useState([]);
    const [colorAlert, setColorAlert] = useState("info");
    const onDismiss = () => setVisible(false);
    useEffect(() => {
        if (!localStorage.getItem("JWT")) {
            navigate("/login")
        }
        handleGetSick();
    }, [])
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function showAlert(message, time, color) {
        setMessage(message);
        setColorAlert(color)
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
            showAlert("Đã load tất cả bệnh !", 2500, "primary");
        } catch (error) {
            console.log(error);
        }
    }
    async function createNewSick(data) {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("tag", data.tag);
            formData.append("detail", data.detail);
            formData.append("image", data.image);
            let response = await newSickService(formData);
            if (response && response.data.errCode !== 0) {
                setMessage(response.message)
            } else {
                handleGetSick();
                setIsOpenModal(false);
                showAlert("Thêm mới blog thành công !", 2500, "info");
                emitter.emit("EVENT_CLEAR_MODAL", { id: "123" });
            }
        } catch (error) {
            console.log(error);
            showAlert("Lỗi không thêm được blog!", 2500, "danger");
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
            {/* {isOpenEditModal && (
            <EditBlog
                isOpen={true}
                toggleUFromParent={toggleBlogEditMoDal}
                currentBlog={blogEdit}
                saveBlog={saveEditBlog}
            />
        )} */}
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
                    // onClick={() => handleDeleteAllBlog()}
                    className="button button6"
                >
                    Xóa toàn bộ dữ liệu
                </button>
            </div>

            <div className="inputFile">
                <input
                    placeholder="Tìm kiếm "
                    className="form-control"
                // onChange={(e) => setSearch(e.target.value)}
                ></input>
            </div>
            <div className="table-container">
                <table className="table container">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Tên bệnh</th>
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
                                        <td>{d.tag}</td>
                                        <td>{d.detail}</td>
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
                                                    // onClick={() => handleDeleteBlog(d.id)}
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
    );
};

export default ManageSick;