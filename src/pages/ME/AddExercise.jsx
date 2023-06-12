import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
// import { connect } from "react-redux";
class AddExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            name: '',
            tag: '',
            detail: '',
        };

    }
    listenEmitter() {
        emitter.on("EVENT_CLEAR_MODAL", () => {
            this.setState({
                name: '',
                tag: '',
                detail: '',
                image: '',
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
    handleAddNewSick = () => {
        if (this.checkValidateInput()) {
            this.props.createNewSick(this.state);
            //   console.log("data modal ", this.state);
        }
    }
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
        this.listenEmitter();
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
                            <div className="form-group col-md-24">
                                <label>Mô tả</label>
                                <textarea
                                    onChange={(event) => {
                                        this.handleOnchange(event, "detail");
                                    }}
                                    className="form-control"
                                    name="detail"
                                    value={this.state.detail}
                                    style={{height:400}}
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
                        onClick={() => this.handleAddNewSick()}
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

export default AddExercise;
