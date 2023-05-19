import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: "",
            email: "",
            password: "",
            fullName: "",
            address: "",
            gender: "",
            roleId: "",

        };
    }
    toggle = () => {
        this.props.toggleUFromParent();
    };
    handleOnchange = (event, item) => {
        let copyState = { ...this.state };
        copyState[item] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    handleAddNewUser = () => {
        if (this.checkValidateInput()) {
            this.props.createNewUser(this.state);
        }
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            "age",
            "email",
            "fullName",
            "address",
            "gender",
            "roleId",
            "age",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Bạn nhập thiếu :" + arrInput[i]);
                break;
            }
        }
        return isValid;
    };

    componentDidMount() {
        let user = this.props.currentUser;
        console.log(user);
        if (user && !_.isEmpty(user)) {

            this.setState({
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                address: user.address,
                gender: user.gender,
                roleId: user.roleId,
                age: user.age,
            });
        }
    }
    handleSaveUser = () => {
        if (this.checkValidateInput()) {
            this.props.saveUser(this.state);
        }
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size="lg"
                className={"modal-user"}
                scrollable={true}
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>
                    {" "}
                    Chỉnh sửa thông tin tài khoản
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="form-row">
                                <div className="form-group col-md-24">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "email");
                                        }}
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Vd: example@gmail.com"
                                        value={this.state.email}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-24">
                                    <label>Tên </label>
                                    <input
                                        type="text"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "fullName");
                                        }}
                                        className="form-control"
                                        name="fullName"
                                        placeholder="Vd:  Lê Văn A "
                                        value={this.state.fullName}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-24">
                                <label>Địa chỉ</label>
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        this.handleOnchange(event, "address");
                                    }}
                                    className="form-control"
                                    name="address"
                                    placeholder="Vd: 123 Nguyễn Lương Bằng, TP.Đà Nẵng"
                                    value={this.state.address}
                                />
                            </div>
                            <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                                <div className="form-group col-md-3">
                                    <label>Gender</label>
                                    <select
                                        name="gender"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "gender");
                                        }}
                                        className="form-control"
                                        value={this.state.gender}
                                    >
                                        <option value="">Chọn</option>
                                        <option value="0">Nam</option>
                                        <option value="1">Nữ</option>
                                        <option value="2">Khác</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Phân quyền</label>
                                    <select
                                        name="roleId"
                                        className="form-control"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "roleId");
                                        }}
                                        value={this.state.roleId}
                                    >
                                        <option value="">Chọn</option>
                                        <option value="1">Admin</option>
                                        <option value="2">User</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Tuổi</label>
                                    <input
                                        type="text"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "age");
                                        }}
                                        className="form-control"
                                        name="age"
                                        placeholder="Vd: 18"
                                        value={this.state.age}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary "
                        className="px-3"
                        onClick={() => this.handleSaveUser()}
                    >
                        Lưu thay đổi
                    </Button>{" "}
                    <Button
                        color="danger "
                        className="px-3"
                        onClick={() => this.toggle()}
                    >
                        Hủy
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {};
// };

// const mapDispatchToProps = (dispatch) => {
//     return {};
// };

export default ModalEditUser;