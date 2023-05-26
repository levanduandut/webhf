import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import "./Modal.scss";
import _ from "lodash";
// import { connect } from "react-redux";
class ModalEditIngredient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            category: "",
            unit: "",
            calo: "",
            protein: "-1",
            fat: "-1",
            carb: "-1",
            fiber: "-1",
            cholesterol: "-1",
            canxi: "-1",
            photpho: "-1",
            fe: "-1",
            natri: "-1",
            kali: "-1",
            betacaroten: "-1",
            vita: "-1",
            vitb1: "-1",
            vitc: "-1"
        };
        this.listenEmitter();
    }
    listenEmitter() {
        emitter.on("EVENT_CLEAR_MODAL", () => {
            this.setState({
                name: "",
                category: "",
                unit: "",
                calo: "",
                protein: "-1",
                fat: "-1",
                carb: "-1",
                fiber: "-1",
                cholesterol: "-1",
                canxi: "-1",
                photpho: "-1",
                fe: "-1",
                natri: "-1",
                kali: "-1",
                betacaroten: "-1",
                vita: "-1",
                vitb1: "-1",
                vitc: "-1"
            });
        });
    }
    handleOnchange = (event, item) => {
        let copyState = { ...this.state };
        copyState[item] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    handleAddNewIngre = () => {
        if (this.checkValidateInput()) {
            this.props.createNewIngre(this.state);
            //   console.log("data modal ", this.state);
        }
    }
    handleSetZero = (item) => {
        let copyState = { ...this.state };
        copyState[item] = "0"
        this.setState({
            ...copyState,
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            "category",
            "unit",
            "calo",
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
        let ingre = this.props.currentIngre;
        if (ingre && !_.isEmpty(ingre)) {
            this.setState({
                id:ingre.id,
                name: ingre.name,
                category: ingre.category,
                unit: ingre.unit,
                calo: ingre.calo,
                protein: ingre.protein,
                fat: ingre.fat,
                carb: ingre.carb,
                fiber: ingre.fiber,
                cholesterol: ingre.cholesterol,
                canxi: ingre.canxi,
                photpho: ingre.photpho,
                fe: ingre.fe,
                natri: ingre.natri,
                kali: ingre.kali,
                betacaroten: ingre.betacaroten,
                vita: ingre.vita,
                vitb1: ingre.vitb1,
                vitc: ingre.vitc,
            });
        }
    }
    handleSaveIngre = () => {
        if (this.checkValidateInput()) {
            this.props.saveIngre(this.state);
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
                size="lg"
                className={"modal-user"}
                scrollable={true}
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>
                    {" "}
                    Chỉnh sửa thông tin thực phẩm
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="form-row">
                                <div className="form-group col-md-24">
                                    <label>Tên</label>
                                    <input
                                        type="text"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "name");
                                        }}
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        disabled
                                        placeholder="Vd: Tôm hùm"
                                        value={this.state.name}
                                    />
                                </div>
                                <div className="form-group col-md-24">
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "category");
                                        }}
                                        className="form-control"
                                        name="category"
                                        value={this.state.category}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-24">
                                    <label>Đơn vị</label>
                                    <input
                                        type="text"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "unit");
                                        }}
                                        className="form-control"
                                        name="unit"
                                        value={this.state.unit}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-24">
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
                            <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                                <div className="form-group col-md-3">
                                    <label>Protein</label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "protein");
                                        }}
                                        onClick={() => this.handleSetZero("protein")}
                                        className="form-control"
                                        name="protein"
                                        value={this.state.protein}
                                    />
                                </div>
                            </div>
                            <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                                <div className="form-group col-md-3">
                                    <label>Chất béo</label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "fat");
                                        }}
                                        className="form-control"
                                        onClick={() => this.handleSetZero("fat")}
                                        name="fat"
                                        value={this.state.fat}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Carbonhydrates </label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "carb");
                                        }}
                                        className="form-control"
                                        onClick={() => this.handleSetZero("carb")}
                                        name="carb"
                                        value={this.state.carb}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Chất xơ</label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "fiber");
                                        }}
                                        className="form-control"
                                        onClick={() => this.handleSetZero("fiber")}
                                        name="fiber"
                                        value={this.state.fiber}
                                    />
                                </div>
                            </div>
                            <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                                <div className="form-group col-md-3">
                                    <label>Cholesterol</label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "cholesterol");
                                        }}
                                        className="form-control"
                                        onClick={() => this.handleSetZero("cholesterol")}
                                        name="cholesterol"
                                        value={this.state.cholesterol}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Canxi </label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "canxi");
                                        }}
                                        className="form-control"
                                        onClick={() => this.handleSetZero("canxi")}
                                        name="canxi"
                                        value={this.state.canxi}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Phốt pho</label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "photpho");
                                        }}
                                        className="form-control"
                                        onClick={() => this.handleSetZero("photpho")}
                                        name="photpho"
                                        value={this.state.photpho}
                                    />
                                </div>
                            </div>
                            <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                                <div className="form-group col-md-3">
                                    <label>Sắt</label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "fe");
                                        }}
                                        className="form-control"
                                        onClick={() => this.handleSetZero("fe")}
                                        name="fe"
                                        value={this.state.fe}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Natri </label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "natri");
                                        }}
                                        className="form-control"
                                        name="natri"
                                        onClick={() => this.handleSetZero("natri")}
                                        value={this.state.natri}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Kali</label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "kali");
                                        }}
                                        className="form-control"
                                        onClick={() => this.handleSetZero("kali")}
                                        name="kali"
                                        value={this.state.kali}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-24">
                                    <label>Beta Caroten</label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "betacaroten");
                                        }}
                                        className="form-control"
                                        name="betacaroten"
                                        onClick={() => this.handleSetZero("betacaroten")}
                                        value={this.state.betacaroten}
                                    />
                                </div>
                            </div>
                            <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                                <div className="form-group col-md-3">
                                    <label>Vitamin A</label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "vita");
                                        }}
                                        className="form-control"
                                        onClick={() => this.handleSetZero("vita")}
                                        name="vita"
                                        value={this.state.vita}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Vitamin B1</label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "vitb1");
                                        }}
                                        className="form-control"
                                        name="vitb1"
                                        onClick={() => this.handleSetZero("vitb1")}
                                        value={this.state.vitb1}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Vitamin C</label>
                                    <input
                                        type="number"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "vitc");
                                        }}
                                        className="form-control"
                                        name="vitc"
                                        onClick={() => this.handleSetZero("vitc")}
                                        value={this.state.vitc}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <p style={{ color: "red" }}>Lưu ý : -1: Chưa có số liệu & 0: Hàm lương = 0 {"     "}</p>
                    <Button
                        color="primary "
                        className="px-3"
                        onClick={() => this.handleSaveIngre()}
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


export default ModalEditIngredient;
