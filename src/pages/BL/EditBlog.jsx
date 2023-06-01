import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import "./Blog.scss";
import _ from "lodash";
// import { connect } from "react-redux";
class EditBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            title: '',
            categoryId: '',
            tag: '',
            star: '',
            detail: '',
        };

    }
    listenEmitter() {
        emitter.on("EVENT_CLEAR_MODAL", () => {
            this.setState({
                image: '',
                title: '',
                categoryId: '',
                tag: '',
                star: '',
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
            "title",
            "categoryId",
            "tag",
            "star",
            "detail",
            // "image",
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
        let blog = this.props.currentBlog;
        if (blog && !_.isEmpty(blog)) {
            this.setState({
                id: blog.id,
                title: blog.title,
                categoryId: blog.categoryId,
                tag: blog.tag,
                star: blog.star,
                detail: blog.detail,
                image: blog.image,
            });
        }
    }
    handleSaveBlog = () => {
        if (this.checkValidateInput()) {
            this.props.saveBlog(this.state);
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
                fullscreen
            >
                <ModalHeader toggle={() => this.toggle()}>
                    {" "}
                    Chỉnh sửa bài viết
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
                                    <label>Phân loại</label>
                                    <select
                                        name="categoryId"
                                        className="form-control"
                                        onChange={(event) => {
                                            this.handleOnchange(event, "categoryId");
                                        }}
                                        value={this.state.categoryId}
                                    >
                                        <option value="">Chọn</option>
                                        <option value="1">Phong cách sống</option>
                                        <option value="2">Công thức nấu ăn</option>
                                        <option value="3">Lưu ý</option>
                                    </select>
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
                                    min={1}
                                    max={10}
                                    name="star"
                                    value={this.state.star}
                                />
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
                        onClick={() => this.handleSaveBlog()}
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


export default EditBlog;
