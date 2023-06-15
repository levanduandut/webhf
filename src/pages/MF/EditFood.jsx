import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import "./ManageFood.scss";
import _ from "lodash";
// import { connect } from "react-redux";
class EditFood extends Component {
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
            sickId1: '',
            sickId2: '',
            status: '',
            status1: '',
            status2: '',
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
                sickId: '',
                sickId1: '',
                sickId2: '',
                status: '',
                status1: '',
                status2: '',
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
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
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
        let food = this.props.currentFood;
        if (food && !_.isEmpty(food)) {
            if (food.sickId1 < 0) {
                food.sickId1 = 0 - food.sickId1;
            }
            if (food.sickId < 0) {
                food.sickId = 0 - food.sickId;
            }
            if (food.sickId2 < 0) {
                food.sickId2 = 0 - food.sickId2;
            }
            this.setState({
                id: food.id,
                name: food.name,
                tag: food.tag,
                star: food.star,
                calo: food.calo,
                categoryId: food.categoryId,
                sickId: food.sickId,
                sickId1: food.sickId1,
                sickId2: food.sickId2,
                time: food.time,
                detail: food.detail,
            });
        }
    }
    handleSaveFood = () => {
        if (this.checkValidateInput()) {
            this.props.saveFood(this.state);
        }
    };
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
                    Chỉnh sửa món ăn
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
                                        <option value="0">Chọn</option>
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
                                        <option value="0">Chọn</option>
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
                                        <option value="0">Chọn</option>
                                        <option value="1">Nên ăn</option>
                                        <option value="-1">Không nên ăn</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row" style={{ display: "flex" }}>
                                <div className="form-group col">
                                    <label>Loại bệnh</label>
                                    <select
                                        name="sickId1"
                                        className="form-control"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "sickId1");
                                        }}
                                        value={this.state.sickId1}
                                    >
                                        <option value="0">Chọn</option>
                                        {
                                            this.props.itemSick.map((x) =>
                                                <option key={x.id} value={x.id}>{x.name}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="form-group col">
                                    <label>Khuyến nghị</label>
                                    <select
                                        name="status1"
                                        className="form-control"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "status1");
                                        }}
                                        value={this.state.status1}
                                    >
                                        <option value="0">Chọn</option>
                                        <option value="1">Nên ăn</option>
                                        <option value="-1">Không nên ăn</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row" style={{ display: "flex" }}>
                                <div className="form-group col">
                                    <label>Loại bệnh</label>
                                    <select
                                        name="sickId2"
                                        className="form-control"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "sickId2");
                                        }}
                                        value={this.state.sickId2}
                                    >
                                        <option value="0">Chọn</option>
                                        {
                                            this.props.itemSick.map((x) =>
                                                <option key={x.id} value={x.id}>{x.name}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="form-group col">
                                    <label>Khuyến nghị</label>
                                    <select
                                        name="status2"
                                        className="form-control"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "status2");
                                        }}
                                        value={this.state.status2}
                                    >
                                        <option value="0">Chọn</option>
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
                                    style={{ height: 300 }}
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
                        onClick={() => this.handleSaveFood()}
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


export default EditFood;
