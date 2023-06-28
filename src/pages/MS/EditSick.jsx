import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import "./Sick.scss";
import _ from "lodash";
// import { connect } from "react-redux";
class EditSick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            name: '',
            tag: '',
            detail: '',
            arring: '',
        };

    }
    listenEmitter() {
        emitter.on("EVENT_CLEAR_MODAL", () => {
            this.setState({
                image: '',
                name: '',
                tag: '',
                detail: '',
                arring: '',
            });
        });
    }
    handleOnchange = (event, item) => {
        let copyState = { ...this.state };
        if (item !== "image") {
            copyState[item] = event.target.value;
            this.setState({
                ...copyState,
            });
        }
        else {
            copyState[item] = event.target.files[0];
            this.setState({
                ...copyState,
            });
        }
    };
    // handleOnChange1 = (event, fieldName) => {
    //     const value = event.target.value;
    //     const isValid = this.validateInput(value);
    //     if (isValid) {
    //         this.setState({ [fieldName]: value });
    //     } else {
    //         // Xử lý khi dữ liệu không hợp lệ
    //         console.log("Dữ liệu không hợp lệ");
    //     }
    // };
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            "name",
            "tag",
            "detail",
            "image",
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
        let sick = this.props.currentSick;
        if (sick && !_.isEmpty(sick)) {
            this.setState({
                id: sick.id,
                name: sick.name,
                tag: sick.tag,
                detail: sick.detail,
                image: sick.image,
                arring: sick.arring,
            });
        }
    }
    handleSaveSick = () => {
        if (this.checkValidateInput()) {
            this.props.saveSick(this.state);
        }
    };
    toggle = () => {
        this.props.toggleUFromParent();
    };
    // validateInput = (value) => {
    //     if (value.trim() === "") {
    //         // Trường rỗng, không cần kiểm tra
    //         return true;
    //     }

    //     const regex = /^(-?\d+(,-?\d+)*)?$/;

    //     if (!regex.test(value)) {
    //         // Dữ liệu không đúng định dạng
    //         return false;
    //     }

    //     // Dữ liệu đúng định dạng
    //     return true;
    // };
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
                    Chỉnh sửa bệnh
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="form-row">
                                <div className="form-group col-md-24">
                                    <label>Tên bệnh</label>
                                    <input
                                        type="text"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "name");
                                        }}
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={this.state.name}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-24">
                                    <label>Tag</label>
                                    <input
                                        type="text"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "tag");
                                        }}
                                        className="form-control"
                                        name="tag"
                                        value={this.state.tag}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-24">
                                    <label>Array Id SBF</label>
                                    <input
                                        type="text"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "arring");
                                        }}
                                        className="form-control"
                                        name="arring"
                                        value={this.state.arring}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-24">
                                <label>Nội dung</label>
                                <textarea
                                    onChange={(event) => {
                                        this.handleOnchange(event, "detail");
                                    }}
                                    className="form-control"
                                    name="detail"
                                    value={this.state.detail}
                                    style={{ height: 400 }}
                                />
                            </div>
                            <div className="form-group col-md-24">
                                <label>File hình ảnh</label>
                                <input
                                    multiple
                                    type="file"
                                    onChange={(event) => {
                                        this.handleOnchange(event, "image");
                                    }}
                                    className="form-control"
                                    name="image"
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary "
                        className="px-3"
                        onClick={() => this.handleSaveSick()}
                    >
                        Lưu
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


export default EditSick;
