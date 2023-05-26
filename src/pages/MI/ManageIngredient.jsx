import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageIngredient.scss";
import * as XLSX from "xlsx";
import ModalIngredient from "./ModalIngredient";
import {
    deleteIngreService,
    newIngreService,
    getIngreService,
    deleteOneIngreService,
    editIngreService,
} from "../../services/userService";
import { emitter } from "../../utils/emitter";
import ModalEditIngredient from "./ModalEditIngredient";

const ManageIngredient = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [ingreEdit, setIngreEdit] = useState({});
    const [search, setSearch] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem("JWT")) {
            navigate("/login");
        }
        handleGetIngre();
    }, []);
    async function handleGetIngre() {
        try {
            let response = await getIngreService("");
            await setItems(response.data.ingre);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteIngre(id) {
        try {
            let response = await deleteOneIngreService(id);
            if (response && response.data.errCode !== 0) {
                alert(response.message);
            } else {
                handleGetIngre();
            }
        } catch (error) {
            console.log(error);
        }
    }
    function handleEditIngre(item) {
        setIsOpenEditModal(true);
        setIngreEdit(item);
    }
    function handleAddNew() {
        setIsOpenModal(true);
    }

    function toggleUserEditMoDal() {
        setIsOpenModal(!isOpenEditModal);
    }
    function toggleUserMoDal() {
        setIsOpenModal(!isOpenModal);
    }
    async function saveEditIngre(data) {
        try {
            let response = await editIngreService(data);
            console.log(response)
            if (response && response.data.errCode !== 0) {
                alert(response.message);
            } else {
                await handleGetIngre();
                setIsOpenEditModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function createNewIngre(data) {
        try {
            let response = await newIngreService([data]);
            console.log(response.data);
            if (response && response.data.errCode !== 0) {
                alert(response.message);
            } else {
                // await this.getAllUsersFrom();
                handleGetIngre();
                setIsOpenModal(false);
                emitter.emit("EVENT_CLEAR_MODAL", { id: "123" });
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function handleDeleteAllIngre() {
        try {
            let response = await deleteIngreService();
            console.log(response);
            if (response && response.data.errCode !== 0) {
                alert(response.data.message);
            } else {
                handleGetIngre();
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function handleAddExcelIngre(items) {
        try {
            let response = await newIngreService(items);

            if (response && response.data.errCode !== 0) {
                alert(response.message);
            } else {
                handleGetIngre();
            }
        } catch (error) {
            console.log(error);
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
            handleAddExcelIngre(d);
        });
    }
    return (
        <div>
            <ModalIngredient
                isOpen={isOpenModal}
                toggleUFromParent={toggleUserMoDal}
                createNewIngre={createNewIngre}
            />
            {isOpenEditModal && (
                <ModalEditIngredient
                    isOpen={isOpenEditModal}
                    toggleUFromParent={toggleUserEditMoDal}
                    currentIngre={ingreEdit}
                    saveIngre={saveEditIngre}
                />
            )}
            <h1>Quản lý thành phần</h1>
            <div className="inputFile">
                <button
                    // onClick={() => handleAddNew()}
                    onClick={() => handleAddNew()}
                    className="button button4"
                >
                    Nhập từng thực phẩm
                </button>
                {" Hoặc "}
                <h5>Nhập file Excel input dữ liệu :</h5>
                <input type="file" onChange={(e) => readExcel(e)}></input>
                <button
                    onClick={() => handleAddExcelIngre()}
                    className="button button5"
                >
                    Ghi dữ liệu vào database
                </button>
                <button
                    onClick={() => handleDeleteAllIngre()}
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
                            <th scope="col">Phân Loại</th>
                            <th scope="col">Đơn vị</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Calo</th>
                            <th scope="col">Protein</th>
                            <th scope="col">Chất béo</th>
                            <th scope="col">Chất xơ</th>
                            <th scope="col">Fiber</th>
                            <th scope="col">Cholesterol</th>
                            <th scope="col">Canxi</th>
                            <th scope="col">Photpho</th>
                            <th scope="col">Fe</th>
                            <th scope="col">Natri</th>
                            <th scope="col">Kali</th>
                            <th scope="col">BetaCaroten</th>
                            <th scope="col">Vitamin A</th>
                            <th scope="col">Vitamin B1</th>
                            <th scope="col">Vitamin C</th>
                            <th scope="col">Hành Động</th>
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
                                        <td>{d.category}</td>
                                        <td>{d.unit}</td>
                                        <td>{d.name}</td>
                                        <td>{d.calo}</td>
                                        <td>{d.protein}</td>
                                        <td>{d.fat}</td>
                                        <td>{d.carb}</td>
                                        <td>{d.fiber}</td>
                                        <td>{d.cholesterol}</td>
                                        <td>{d.canxi}</td>
                                        <td>{d.photpho}</td>
                                        <td>{d.fe}</td>
                                        <td>{d.natri}</td>
                                        <td>{d.kali}</td>
                                        <td>{d.betacaroten}</td>
                                        <td>{d.vita}</td>
                                        <td>{d.vitb1}</td>
                                        <td>{d.vitc}</td>
                                        <td>
                                            <div style={{ display: "flex" }}>
                                                <button
                                                    onClick={() => handleEditIngre(d)}
                                                    className="buttonx button2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteIngre(d.id)}
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

export default ManageIngredient;
