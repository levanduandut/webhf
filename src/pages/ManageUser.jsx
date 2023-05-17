import React, { Component } from 'react';
import "../styles/ManageUser.scss";
import { getAllUsers } from '../services/userService';
import ModalUser from './ModalUser';
class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenEditUser: false,
            userEdit: {},
        }
    }
    async componentDidMount() {
        let res = await getAllUsers("");
        if (res && res.data.errCode === 0) {
            this.setState({
                arrUsers: res.data.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true,
        });
    }
    toggleUserMoDal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        });
    };

    render() {
        console.log(this.state.arrUsers)
        let arrUsers = this.state.arrUsers;


        return (
            <div>
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggleUFromParent={this.toggleUserMoDal}
                    createNewUser={this.createNewUsers}
                />
                <div className='mx-1'>
                    <button class="buttonA buttonA2" onClick={() => this.handleAddNewUser()}>Thêm mới người dùng</button>
                </div>
                <div className='user-manager'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Tên</th>
                                <th>Phân Quyền</th>
                                <th>Giới tính</th>
                                <th>Tình trạng bệnh</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật</th>
                                <th>Hành động</th>
                            </tr>

                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.fullName}</td>
                                            <td>{item.roleId === "2" ? "Admin" : "Người dùng"} </td>
                                            <td>{item.gender === false ? "Không xác định" : "Nam"}</td>
                                            <td>{item.sick === null ? "Khỏe mạnh" : item.sick}</td>
                                            <td>{new Date(item.createdAt).getDate()}/{new Date(item.createdAt).getMonth() + 1}/{new Date(item.createdAt).getFullYear()}</td>
                                            <td>{new Date(item.updatedAt).getDate()}/{new Date(item.updatedAt).getMonth() + 1}/{new Date(item.updatedAt).getFullYear()}</td>
                                            <td>
                                                <button class="button button2">Edit</button>
                                                <button class="button button3">Delete</button>
                                                <button class="button button4">Info</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
};

export default ManageUser;