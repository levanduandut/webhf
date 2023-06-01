/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Blog.scss";
import AddBlog from './AddBlog';
import { emitter } from "../../utils/emitter";
import { getBlogService, newBlogService, deleteOneBlogService, deleteBlogService, editBlogService, newBlogExcelService } from '../../services/userService';
import { Alert } from 'reactstrap';
import * as XLSX from "xlsx";
import EditBlog from './EditBlog';
const ManageBlog = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [blogEdit, setBlogEdit] = useState({});
    const [search, setSearch] = useState("");
    const [colorAlert, setColorAlert] = useState("info");
    const [message, setMessage] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const onDismiss = () => setVisible(false);
    useEffect(() => {
        if (!localStorage.getItem("JWT")) {
            navigate("/login")
        }
        handleGetBlog();
    }, []);

    function toggleBlogModal() {
        setIsOpenModal(!isOpenModal);
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function showAlert(message, time, color) {
        setMessage(message);
        setColorAlert(color)
        setVisible(true);
        sleep(time).then(() => { setVisible(false); });
    }
    async function createNewBlog(data) {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("categoryId", data.categoryId);
            formData.append("tag", data.tag);
            formData.append("star", data.star);
            formData.append("detail", data.detail);
            formData.append("image", data.image);
            let response = await newBlogService(formData);
            if (response && response.data.errCode !== 0) {
                setMessage(response.message)
            } else {
                handleGetBlog();
                setIsOpenModal(false);
                showAlert("Thêm mới blog thành công !", 2500, "info");
                emitter.emit("EVENT_CLEAR_MODAL", { id: "123" });
            }
        } catch (error) {
            console.log(error);
            showAlert("Lỗi không thêm được blog!", 2500, "danger");
        }
    }
    function handleAddNew() {
        setIsOpenModal(true);
    }
    async function handleGetBlog() {
        try {
            let response = await getBlogService("");
            await setItems(response.data.blog);
            showAlert("Đã load tất cả blog !", 2500, "primary");
        } catch (error) {
            console.log(error);
        }
    }
    async function handleDeleteBlog(id) {
        try {
            let response = await deleteOneBlogService(id);
            if (response && response.data.errCode !== 0) {
                showAlert("Xóa blog không thành công !", 2500, "primary");
            } else {
                handleGetBlog();
                setIsOpenModal(false);
                showAlert("Xóa blog thành công !", 2500, "primary");
                setVisible(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function handleDeleteAllBlog() {
        try {
            let response = await deleteBlogService();
            if (response && response.data.errCode !== 0) {
                showAlert("Xóa không thành công !", 2500, "danger");
            } else {
                handleGetBlog();
                showAlert("Đã xóa tất cả Blog !", 2500, "danger");
            }
        } catch (error) {
            console.log(error);
        }
    }
    function handleEditBlog(item) {
        setIsOpenEditModal(true);
        setBlogEdit(item);
    }
    async function saveEditBlog(data) {
        try {
            const formData = new FormData();
            formData.append("id", data.id);
            formData.append("title", data.title);
            formData.append("categoryId", data.categoryId);
            formData.append("tag", data.tag);
            formData.append("star", data.star);
            formData.append("detail", data.detail);
            formData.append("image", data.image);
            let response = await editBlogService(formData);
            console.log(response.data.message);
            if (response && response.data.errCode !== 0) {
                alert(response.data.message);
            } else {
                await handleGetBlog();
                setIsOpenEditModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    function toggleBlogEditMoDal() {
        setIsOpenEditModal(!isOpenEditModal);
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
            handleAddExcelBlog(d);
        });
    }
    async function handleAddExcelBlog(items) {
        try {
            let response = await newBlogExcelService(items);
            if (response && response.data.errCode !== 0) {
                alert(response.message);
            } else {
                handleGetBlog();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <AddBlog
                isOpen={isOpenModal}
                toggleUFromParent={toggleBlogModal}
                createNewBlog={createNewBlog}
            />
            <Alert color={colorAlert} isOpen={visible} toggle={onDismiss}>
                {message}
            </Alert>
            {isOpenEditModal && (
                <EditBlog
                    isOpen={true}
                    toggleUFromParent={toggleBlogEditMoDal}
                    currentBlog={blogEdit}
                    saveBlog={saveEditBlog}
                />
            )}
            <h1>Quản lí Blog</h1>
            <div className="inputFile">
                <button
                    onClick={() => handleAddNew()}
                    className="button button4"
                >
                    Thêm bài viết
                </button>
                {" Hoặc "}
                <h5>Nhập file Excel input dữ liệu :</h5>
                <input type="file" onChange={(e) => readExcel(e)}></input>
                <button
                    // onClick={() => handleAddExcelIngre()}
                    className="button button5"
                >
                    Ghi dữ liệu vào database
                </button>
                <button
                    onClick={() => handleDeleteAllBlog()}
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
                            <th scope="col">Tên bài viết</th>
                            <th scope="col">Phân loại</th>
                            <th scope="col">Tag</th>
                            <th scope="col">Sao</th>
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
                                        : item.title.toLowerCase().includes(search);
                                })
                                .map((d) => (
                                    <tr key={d.id}>
                                        <td>{d.id}</td>
                                        <td>{d.title}</td>
                                        <td>{d.categoryId}</td>
                                        <td>{d.tag}</td>
                                        <td>{d.star}</td>
                                        <td>
                                            <div>
                                                <img style={{ width: '50px', height: '50px' }} src={`https://storage.googleapis.com/healthfood-do/${d.image}`} />
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
                                                    onClick={() => handleDeleteBlog(d.id)}
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

export default ManageBlog;