import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.scss"
import { handleLoginApi } from '../../services/userService';
import ImgWel from "../../Others/hinhnen.png";
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    
    function handleOnchangeUserName(event) {
        setEmail(event.target.value);
        setErrMessage("");
    };
    function handleOnchangePassword(event) {
        setPassword(event.target.value);
        setErrMessage("");
    };
    async function handleLogin(event) {

        setErrMessage("")
        if (password === "" && email === "") {
            setErrMessage("Bạn chưa nhập email hoặc mật khẩu")
        } else {
            try {
                let data = await handleLoginApi(email, password);
                if (data && data.data && data.data.errCode !== 0) {
                    setErrMessage(data.data.message)
                }
                if (data && data.data && data.data.errCode === 0) {
                    // this.props.userLoginSuccess(data.user)
                    localStorage.setItem("JWT", data.data.token);
                    localStorage.setItem("isLogin", true);
                    navigate("/dashboard")
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.data) {
                        setErrMessage(error.response.data.message)
                    }
                }
            }
        }

    };
    function handleShowHidePassword() {
        setIsShowPassword(!isShowPassword);
    };
    return (
        <div className='main-login' >
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
                                    value={email}
                                    onChange={(event) => handleOnchangeUserName(event)}
                                ></input>
                            </div>
                            <div className="col-12 form-group login-input">
                                <label>Mật khẩu</label>

                                <div className="custom-input-password">
                                    <input
                                        type={isShowPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(event) => handleOnchangePassword(event)}
                                    ></input>
                                    <span
                                        onClick={() => {
                                            handleShowHidePassword();
                                        }}
                                    >
                                        <i
                                            className={
                                                isShowPassword
                                                    ? "fas fa-eye"
                                                    : "fas fa-eye-slash"
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 errMessage" style={{ color: "red" }}>
                                {errMessage}
                            </div>
                            <div className="col-4 " >
                                <button
                                    className="col-12 btn-login"
                                    onClick={(event) => {
                                        handleLogin(event);
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
    );

}
export default Login;
