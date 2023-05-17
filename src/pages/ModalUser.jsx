import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { connect } from "react-redux";
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }
    toggle = () => {
        this.props.toggleUFromParent();
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
                    <h5 style={{color:'#11580a'}}>
                    Thêm mới người dùng
                    </h5>
                    
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
                                    />
                                </div>
                                <div className="form-group col-md-24">
                                    <label>Nhập mật khẩu</label>
                                    <input
                                        type="password"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "password");
                                        }}
                                        className="form-control"
                                        name="password"
                                        placeholder=""
                                        value={this.state.password}
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
                                <label>Dịa chỉ</label>
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
                            <div className="form-row">
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
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary "
                        className="px-3"
                        onClick={() => this.hanndleAddNewUser()}
                    >
                        Tạo mới
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

export default ModalUser;
