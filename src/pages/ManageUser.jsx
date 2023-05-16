import React, { Component } from 'react';
import "../styles/ManageUser.scss";
import { getAllUsers } from '../services/userService';
class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
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

    render() {
        console.log(this.state.arrUsers)
        let arrUsers = this.state.arrUsers;


        return (
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
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
};

export default ManageUser;