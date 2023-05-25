import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import "./Modal.scss"
// import { connect } from "react-redux";
class ModalIngredient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            category: "",
            unit: "",
            calo: "",
            protein: "",
            fat: "",
            carb: "",
            fiber: "",
            cholesterol: "",
            canxi: "",
            photpho: "",
            fe: "",
            natri: "",
            kali: "",
            betacaroten: "",
            vita: "",
            vitb1: "",
            vitc: ""
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
                protein: "",
                fat: "",
                carb: "",
                fiber: "",
                cholesterol: "",
                canxi: "",
                photpho: "",
                fe: "",
                natri: "",
                kali: "",
                betacaroten: "",
                vita: "",
                vitb1: "",
                vitc: ""
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
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            "name",
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

    componentDidMount() { }
    toggle = () => {
        this.props.toggleUFromParent();
        console.log("Hello")

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
                    Thêm mới thực phẩm
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
                                        value={this.state.vitc}
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
                        onClick={() => this.handleAddNewIngre()}
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

export default ModalIngredient;
