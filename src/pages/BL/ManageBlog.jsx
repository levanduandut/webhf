/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Blog.scss";
import AddBlog from './AddBlog';
import { emitter } from "../../utils/emitter";
import { getBlogService } from '../../services/userService';
const ManageBlog = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [blogEdit, setBlogEdit] = useState({});
    const [search, setSearch] = useState("");   
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem("JWT")) {
            navigate("/login")
        }
        handleGetBlog();
    }, []);

    function toggleBlogModal() {
        setIsOpenModal(!isOpenModal);
    }
    // async function createNewBlog(data) {
    //     try {
    //         let response = await newBlogService([data]);
    //         console.log(response.data);
    //         if (response && response.data.errCode !== 0) {
    //             alert(response.message);
    //         } else {
    //             // await this.getAllUsersFrom();
    //             handleGetBlog();
    //             setIsOpenModal(false);
    //             emitter.emit("EVENT_CLEAR_MODAL", { id: "123" });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // async function handleGetBlog() {
    //     try {
    //         let response = await getBlogService("");
    //         await setItems(response.data.ingre);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    async function handleGetBlog() {
        try {
            let response = await getBlogService("");
            await setItems(response.data.blog);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            {/* <AddBlog
            isOpen={true}
            toggleUFromParent={toggleBlogModal}
            // createNewBlog={createNewIngre}
            /> */}

            {/*{isOpenEditModal && (
            <ModalEditIngredient
                isOpen={isOpenEditModal}
                toggleUFromParent={toggleUserEditMoDal}
                currentIngre={ingreEdit}
                saveIngre={saveEditIngre}
            />
        )} */}
            <h1>Quản lí Blog</h1>
            <div className="inputFile">
                <button
                    // onClick={() => handleAddNew()}
                    // onClick={() => handleAddNew()}
                    className="button button4"
                >
                    Thêm bài viết
                </button>
                {/* {" Hoặc "} */}
                {/* <h5>Nhập file Excel input dữ liệu :</h5>
                <input type="file" onChange={(e) => readExcel(e)}></input>
                <button
                    // onClick={() => handleAddExcelIngre()}
                    className="button button5"
                >
                    Ghi dữ liệu vào database
                </button> */}
                <button
                    // onClick={() => handleDeleteAllIngre()}
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
                                            <div style={{ display: "flex" }}>
                                                <button
                                                    // onClick={() => handleEditIngre(d)}
                                                    className="buttonx button2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    // onClick={() => handleDeleteIngre(d.id)}
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