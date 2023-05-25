import React, { Component } from "react";
import "./ManageUser.scss";
import {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenEditUser: false,
            userEdit: {},
            search: "",
            cateSearch: "email"
        };
    }
    async componentDidMount() {
        await this.getAllUsersFrom();
    }

    getAllUsersFrom = async () => {
        let res = await getAllUsers("");
        if (res && res.data.errCode === 0) {
            this.setState({
                arrUsers: res.data.users,
            });
        }
    };
    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true,
        });
    };
    toggleUserMoDal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        });
    };
    toggleUserEditMoDal = () => {
        this.setState({
            isOpenEditUser: !this.state.isOpenEditUser,
        });
    };
    createNewUsers = async (data) => {
        try {
            let response = await createNewUserService(data);

            if (response && response.data && response.data.errCode !== 0) {
                alert(response.data.message);
            } else {
                await this.getAllUsersFrom();
                this.setState({
                    isOpenModal: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL", { id: "123" });
            }
        } catch (error) {
            console.log(error);
        }
    };
    handleDeleteUser = async (item) => {
        try {
            let response = await deleteUserService(item.id);
            if (response && response.data && response.data.errCode !== 0) {
                alert(response.data.message);
            } else {
                await this.getAllUsersFrom();
            }
        } catch (error) {
            console.log(error);
        }
    };
    handleEditUser = async (item) => {
        this.setState({
            isOpenEditUser: true,
            userEdit: item,
        });
    };
    saveEditUser = async (data) => {
        try {
            let response = await editUserService(data);
            console.log(response.data);
            if (response && response.data.errCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllUsersFrom();
                this.setState({
                    isOpenEditUser: false,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div>
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggleUFromParent={this.toggleUserMoDal}
                    createNewUser={this.createNewUsers}
                />
                {this.state.isOpenEditUser && (
                    <ModalEditUser
                        isOpen={this.state.isOpenEditUser}
                        toggleUFromParent={this.toggleUserEditMoDal}
                        currentUser={this.state.userEdit}
                        saveUser={this.saveEditUser}
                    // createNewUser={this.createNewUsers}
                    />
                )}
                <div className="mx-1">
                    <button
                        className="buttonA buttonA2"
                        onClick={() => this.handleAddNewUser()}
                    >
                        Thêm mới người dùng
                    </button>
                </div>
                <div className="searchInput">
                    <input
                        placeholder="Tìm kiêm theo Email"
                        className="form-control"
                        onChange={(e) => this.setState({ search: e.target.value })}
                    ></input>

                </div>
                <div className='table-container'>
                    <div className="user-manager">
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>Email</th>
                                    <th>Tên</th>
                                    <th>Phân Quyền</th>
                                    <th>Giới tính</th>
                                    <th>Tuổi</th>
                                    <th>Tình trạng bệnh</th>
                                    <th>Địa chỉ</th>
                                    <th>Ngày tạo</th>
                                    <th>Ngày cập nhật</th>
                                    <th>Hành động</th>
                                </tr>

                                {arrUsers &&
                                    arrUsers
                                        .filter((item) => {
                                            return this.state.search.toLowerCase() === ""
                                                ? item
                                                : item.email.toLowerCase().includes(this.state.search);
                                        })
                                        .map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.email}</td>
                                                    <td>{item.fullName}</td>
                                                    <td>{item.roleId === "2" ? "Admin" : "Người dùng"} </td>
                                                    <td>
                                                        {item.gender === 1
                                                            ? "Nữ"
                                                            : item.gender === 0
                                                                ? "Nam"
                                                                : "Khác"}
                                                    </td>
                                                    <td>{item.age === null ? "" : item.age}</td>
                                                    <td>{item.sick === null ? "Khỏe mạnh" : item.sick}</td>
                                                    <td>{item.address === null ? "" : item.address}</td>
                                                    <td>
                                                        {new Date(item.createdAt).getDate()}/
                                                        {new Date(item.createdAt).getMonth() + 1}/
                                                        {new Date(item.createdAt).getFullYear()}
                                                    </td>
                                                    <td>
                                                        {new Date(item.updatedAt).getDate()}/
                                                        {new Date(item.updatedAt).getMonth() + 1}/
                                                        {new Date(item.updatedAt).getFullYear()}
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => this.handleEditUser(item)}
                                                            className="button button2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => this.handleDeleteUser(item)}
                                                            className="button button3"
                                                        >
                                                            Delete
                                                        </button>
                                                        <button className="button button4">Info</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        );
    }
}

export default ManageUser;
