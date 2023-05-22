import React from 'react'
import "./Login.scss"
import { Component } from 'react'
import { handleLoginApi } from '../../services/userService';
import ImgWel from "../../Others/hinhnen.png"
class Login extends Component {
    constructor(props) {
        super(props); // Ham tao
        this.state = {
            email: "",
            password: "",
            isShowPassword: false,
            errMessage: "",
        };
    }
    handleOnchangeUserName = (event) => {
        this.setState({
            email: event.target.value,
            errMessage: "",
        });
    };
    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value,
            errMessage: "",
        });
    };
    handleLogin = async (event) => {

        this.setState({
            errMessage: "",
        });
        if (this.state.password==="" && this.state.email==="") {
            this.setState({
                errMessage: "Bạn chưa nhập email hoặc mật khẩu",
            });
        } else {
            try {
                let data = await handleLoginApi(this.state.email, this.state.password);
                if (data && data.data && data.data.errCode !== 0) {
                    this.setState({
                        errMessage: data.data.message,
                    });
                }
                if (data && data.data && data.data.errCode === 0) {
                    // this.props.userLoginSuccess(data.user)
                    console.log("Login Ok")
                    localStorage.setItem("Login","OK")
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
                                        type="email"
                                        className="col-12 form-control login-input"
                                        placeholder="Nhập email"
                                        value={this.state.email}
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
                                <div className="col-12 errMessage" style={{ color: "red" }}>
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
                            <h3>Chào mừng người quản trị App HealthFood</h3>
                        </div>
                        <div className='welcomeImg'>
                            <img src={ImgWel} id='wel-img' alt='Anh nen' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;
