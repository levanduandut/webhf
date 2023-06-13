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
            star: '',
            calo: '',
            categoryId: '',
            sickId: '',
            status:'',
            time: '',
            detail: '',
        };

    }
    listenEmitter() {
        emitter.on("EVENT_CLEAR_MODAL", () => {
            this.setState({
                image: '',
                name: '',
                tag: '',
                star: '',
                calo: '',
                categoryId: '',
                status:'',
                sickId: '',
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
    handleAddNewFood = () => {
        if (this.checkValidateInput()) {
            this.props.createNewFood(this.state);
            //   console.log("data modal ", this.state);
        }
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            // "image",
            "name",
            "tag",
            "star",
            "calo",
            "status",
            "categoryId",
            "sickId",
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
                    Thêm mới món ăn
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="row" >
                                <div className="form-group col">
                                    <label>Tên món ăn</label>
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
                                <div className="form-group col">
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
                                <div className="form-group col">
                                    <label>Loại món ăn</label>
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
                            </div>
                            <div className="form-row" style={{ display: "flex" }}>
                                <div className="form-group col">
                                    <label>Loại bệnh</label>
                                    <select
                                        name="sickId"
                                        className="form-control"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "sickId");
                                        }}
                                        value={this.state.sickId}
                                    >
                                        <option value="">Chọn</option>
                                        {
                                            this.props.itemSick.map((x) =>
                                                <option key={x.id} value={x.id}>{x.name}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="form-group col">
                                    <label>Khuyến nghị</label>
                                    <select
                                        name="status"
                                        className="form-control"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "status");
                                        }}
                                        value={this.state.status}
                                    >
                                        <option value="">Chọn</option>
                                        <option value="1">Nên ăn</option>
                                        <option value="-1">Không nên ăn</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row" style={{ display: "flex" }}>
                                <div className="form-group col">
                                    <label>Calo</label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "calo");
                                        }}
                                        className="form-control"
                                        name="calo"
                                        value={this.state.calo}
                                    />
                                </div>
                                <div className="form-group col">
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
                                <div className="form-group col">
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
                        onClick={() => this.handleAddNewFood()}
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
