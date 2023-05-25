import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ManageIngredient.scss";
import * as XLSX from "xlsx";
import ModalIngredient from './ModalIngredient';
import { deleteIngreService, newIngreService } from '../../services/userService';
import { emitter } from "../../utils/emitter";

const ManageIngredient = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem("JWT")) {
            navigate("/login")
        }
    })
    function handleEditUser() {

    }
    function handleAddNew() {
        setIsOpenModal(true);
    }
    function toggleUserMoDal() {
        setIsOpenModal(!isOpenModal);
    }
    async function createNewIngre(data) {
        try {
            let response = await newIngreService(data);
            console.log(response.data);
            if (response && response.data.errCode !== 0) {
                alert(response.message);
            } else {
                // await this.getAllUsersFrom();
                setIsOpenModal(false)
                emitter.emit("EVENT_CLEAR_MODAL", { id: "123" });
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function handleDeleteAllIngre() {
        try {
            let response = await deleteIngreService();
            console.log(response.data);
            if (response && response.data.errCode !== 0) {
                alert(response.message);
            } else {

            }
        } catch (error) {
            console.log(error);
        }
    }
    async function handleAddExcelIngre(items) {
        try {
            if (items) {
                let response = await newIngreService(items);
                console.log(response.data);
                if (response && response.data.errCode !== 0) {
                    alert(response.message);
                } else {
                }
            } else {
                alert("Chưa import file !")

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
        })
        promise.then((d) => {
            setItems(d);
        });
    }
    return (
        <div>
            <ModalIngredient
                isOpen={isOpenModal}
                toggleUFromParent={toggleUserMoDal}
                createNewIngre={createNewIngre}
            />
            <h1>Quản lý thành phần</h1>
            <div className='inputFile'>
                <button
                    onClick={() => handleAddNew()}
                    className="button button4"
                >
                    Nhập từng thực phẩm
                </button>
                {" Hoặc "}
                <h5>Nhập file Excel input dữ liệu :</h5>
                <input type='file' onChange={(e) => readExcel(e)}></input>
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

            <div className='inputFile'>
                <input
                    placeholder="Tìm kiếm "
                    className="form-control"
                    onChange={(e) => setSearch(e.target.value)}
                ></input>
            </div>
            <div className='table-container'>
                <table className="table container">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
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
                        {items && items.filter((item) => {
                            return search.toLowerCase() === ""
                                ? item
                                : item.Name.toLowerCase().includes(search);
                        })
                            .map((d) => (
                                <tr key={d.STT}>
                                    <td>{d.STT}</td>
                                    <td>{d.Category}</td>
                                    <td>{d.Unit}</td>
                                    <td>{d.Name}</td>
                                    <td>{d.Calo}</td>
                                    <td>{d.Protein}</td>
                                    <td>{d.Fat}</td>
                                    <td>{d.Carb}</td>
                                    <td>{d.Fiber}</td>
                                    <td>{d.Cholesterol}</td>
                                    <td>{d.Canxi}</td>
                                    <td>{d.Photpho}</td>
                                    <td>{d.Fe}</td>
                                    <td>{d.Natri}</td>
                                    <td>{d.Kali}</td>
                                    <td>{d.BetaCaroten}</td>
                                    <td>{d.VitA}</td>
                                    <td>{d.VitB1}</td>
                                    <td>{d.VitC}</td>
                                    <td >
                                        <div style={{ display: 'flex' }}>
                                            <button
                                                onClick={() => handleEditUser(d)}
                                                className="buttonx button2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => this.handleDeleteUser(d)}
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