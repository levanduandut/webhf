import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import "./Blog.scss"
// import { connect } from "react-redux";
class AddBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            categoryId: '',
            tag: '',
            star: '',
            detail: '',
            image: '',
        };
        this.listenEmitter();
    }
    listenEmitter() {
        emitter.on("EVENT_CLEAR_MODAL", () => {
            this.setState({
                title: '',
                categoryId: '',
                tag: '',
                star: '',
                detail: '',
                image: '',
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
    handleAddNewBlog = () => {
        if (this.checkValidateInput()) {
            this.props.createNewBlog(this.state);
            //   console.log("data modal ", this.state);
        }
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [
            "title",
            "categoryId",
            "tag",
            "star",
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
                    Thêm mới bài viết
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="form-row">
                                <div className="form-group col-md-24">
                                    <label>Tên bài viết</label>
                                    <input
                                        type="text"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "title");
                                        }}
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={this.state.title}
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
                            <div className="form-group col-md-24">
                                <label>Nội dung</label>
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        this.handleOnchange(event, "detail");
                                    }}
                                    className="form-control"
                                    name="detail"
                                    value={this.state.detail}
                                />
                            </div>
                            <div className="form-group col-md-24">
                                <label>File hình ảnh</label>
                                <input
                                    type="file"
                                    onChange={(event) => {
                                        this.handleOnchange(event, "image");
                                    }}
                                    className="form-control"
                                    name="image"
                                    value={this.state.image}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary "
                        className="px-3"
                        onClick={() => this.handleAddNewBlog()}
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

export default AddBlog;
