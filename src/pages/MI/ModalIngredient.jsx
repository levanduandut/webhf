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
            init: "",
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
            betaCaroten: "",
            vitA: "",
            vitB1: "",
            vitC: ""
        };
        this.listenEmitter();
    }
    listenEmitter() {
        emitter.on("EVENT_CLEAR_MODAL", () => {
            this.setState({
                name: "",
                category: "",
                init: "",
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
                betaCaroten: "",
                vitA: "",
                vitB1: "",
                vitC: ""
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
    handleAddNewUser = () => {
        if (this.checkValidateInput()) {
            //Call api
            this.props.createNewUser(this.state);
            //   console.log("data modal ", this.state);
        }
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            "name",
            "category",
            "init",
            "calo",
            "protein",
            "fat",
            "carb",
            "fiber",
            "cholesterol",
            "canxi",
            "photpho",
            "fe",
            "natri",
            "kali",
            "beta",
            "vitA",
            "vitB1",
            "vitC",
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
                                            this.handleOnchange(event, "init");
                                        }}
                                        className="form-control"
                                        name="init"
                                        value={this.state.init}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-24">
                                <label>Calo</label>
                                <input
                                    type="text"
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
                                        type="text"
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
                                        type="text"
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
                                        type="text"
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
                                        type="text"
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
                                        type="text"
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
                                        type="text"
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
                                        type="text"
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
                                        type="text"
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
                                        type="text"
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
                                        type="text"
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
                                        type="text"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "betaCaroten");
                                        }}
                                        className="form-control"
                                        name="betaCaroten"
                                        value={this.state.betaCaroten}
                                    />
                                </div>
                            </div>
                            <div className="form-row" style={{ display: 'flex', gap: '20px' }}>
                                <div className="form-group col-md-3">
                                    <label>Vitamin A</label>
                                    <input
                                        type="text"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "vitA");
                                        }}
                                        className="form-control"
                                        name="vitA"
                                        value={this.state.vitA}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Vitamin B1</label>
                                    <input
                                        type="text"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "vitB1");
                                        }}
                                        className="form-control"
                                        name="vitB1"
                                        value={this.state.vitB1}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Vitamin C</label>
                                    <input
                                        type="text"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "vitC");
                                        }}
                                        className="form-control"
                                        name="vitC"
                                        value={this.state.vitC}
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
                        onClick={() => this.handleAddNewUser()}
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
