import React from 'react'
import "./Login.scss"
import { render } from '@testing-library/react'
import { Component } from 'react'
import { handleLoginApi } from '../../services/userService';
import ImgWel from "../../Image/hinhnen.png"
class Login extends Component {
    constructor(props) {
        super(props); // Ham tao
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: "",
        };
    }
    handleOnchangeUserName = (event) => {
        this.setState({
            username: event.target.value,
        });
    };
    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };
    handleLogin = async (event) => {
        this.setState({
            errMessage: "",
        });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {

                this.setState({
                    errMessage: data.message,
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    });
                }
            }
        }
    };
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };
    render() {
        return (
            <div className='main-login'>
                <div className='login-contain'>
                    <div className='left-side'>
                        <div className="login-container">
                            <div className="login-content row justify-content-center">
                                <div className="col-12 text-center text-login ">ĐĂNG NHẬP ADMIN</div>
                                <div className="col-12 form-group ">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        className="col-12 form-control login-input"
                                        placeholder="Nhập email"
                                        value={this.state.username}
                                        onChange={(event) => this.handleOnchangeUserName(event)}
                                    ></input>
                                </div>
                                <div className="col-12 form-group login-input">
                                    <label>Mật khẩu</label>

                                    <div className="custom-input-password">
                                        <input
                                            type={this.state.isShowPassword ? "text" : "password"}
                                            className="form-control"
                                            placeholder="Nhập mật khẩu"
                                            value={this.state.password}
                                            onChange={(event) => this.handleOnchangePassword(event)}
                                        ></input>
                                        <span
                                            onClick={() => {
                                                this.handleShowHidePassword();
                                            }}
                                        >
                                            <i
                                                className={
                                                    this.state.isShowPassword
                                                        ? "fas fa-eye"
                                                        : "fas fa-eye-slash"
                                                }
                                            ></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12" style={{ color: "red" }}>
                                    {this.state.errMessage}
                                </div>

                                <div className="col-4 " >
                                    <button
                                        className="col-12 btn-login"
                                        onClick={(event) => {
                                            this.handleLogin(event);
                                        }}
                                    >
                                        Đăng nhập
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right-side'>
                        <div className='welcomeNote'>
                            <h3>Chào mừng người quản trị</h3>
                        </div>
                        <div className='welcomeImg'>
                            <img src={ImgWel} id='wel-img' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;
