import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
// import { connect } from "react-redux";
class EditExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            name: '',
            star: '',
            categoryId: '',
            time: '',
            detail: '',
        };

    }
    listenEmitter() {
        emitter.on("EVENT_CLEAR_MODAL", () => {
            this.setState({
                image: '',
                name: '',
                star: '',
                categoryId: '',
                time: '',
                detail: '',
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
    
    handleSaveExe = () => {
        if (this.checkValidateInput()) {
            this.props.saveExe(this.state);
        }
    };
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            // "image",
            "name",
            "star",
            "categoryId",
            "time",
            "detail",
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
        let exe = this.props.currentExe;
        if (exe && !_.isEmpty(exe)) {
            this.setState({
                image: exe.image,
                name: exe.name,
                star: exe.star,
                categoryId: exe.categoryId,
                time: exe.time,
                detail: exe.detail,
                id: exe.id,
            });
        }
    }
    toggle = () => {
        this.props.toggleUFromParent();
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size="xl"
                className={"modal-user"}
                scrollable={true}
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>
                    {" "}
                    Thêm mới bài tập
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="form-row">
                                <div className="form-group col-md-24">
                                    <label>Tên bài tập</label>
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
                                <label>Loại</label>
                                <select
                                    name="categoryId"
                                    className="form-control"
                                    onChange={(event) => {
                                        this.handleOnchange(event, "categoryId");
                                    }}
                                    value={this.state.categoryId}
                                >
                                    <option value="">Chọn</option>
                                    {
                                        this.props.itemsCa.map((x) =>
                                            <option key={x.id} value={x.id}>{x.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-24">
                                    <label>Star</label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "star");
                                        }}
                                        className="form-control"
                                        name="star"
                                        value={this.state.star}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-24">
                                    <label>Thời gian</label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "time");
                                        }}
                                        className="form-control"
                                        name="time"
                                        value={this.state.time}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-24">
                                <label>Mô tả</label>
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
                        onClick={() => this.handleSaveExe()}
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

export default EditExercise;
