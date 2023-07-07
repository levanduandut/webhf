import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import {
  getInfo,
  getSickService,
  getSickUser,
} from "../../services/userService";

const About = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [items, setItems] = useState([]);
  const [sickId, setSickId] = useState(0);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("JWT")) {
      navigate("/login");
    }
    setToken(localStorage.getItem("JWT"));
    if (token !== "") {
      getInfoUser(token);
      getInfoSick(token);
      handleGetSick();
    }
  }, [token]);
  async function getInfoUser(token) {
    getInfo({
      jwtToken: token,
    })
      .then(async (res) => {
        if (!res.data.message) {
          setEmail(res.data.user.email);
          setName(res.data.user.fullName);
          setAge(res.data.user.age);
          setGender(res.data.user.gender);
          setCreatedAt(formatDateTime(res.data.user.createdAt));
          setUpdatedAt(formatDateTime(res.data.user.updatedAt));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Adjust the format as needed
  }
  async function getInfoSick(token) {
    getSickUser({
      token: token,
      limit: 1,
    })
      .then(async (res) => {
        if (res.data.errCode === 0) {
          setSickId(res.data.info[0].sickId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function handleGetSick() {
    try {
      let response = await getSickService("");
      setItems(response.data.sick);
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogOut() {
    localStorage.clear("JWT");
    localStorage.setItem("isLogin", false);
    navigate("/login");
  }
  return (
    <div>
      <div className="row">
        <div className="col-lg-6">
          <div>
            <label style={{ fontSize: 40, color: "red" }}>Người quản lý</label>
            <h6 className="theme-color lead">Website dành riêng cho Admin</h6>
            <p>
              Đây là trang quản lý dữ liệu cho{" "}
              <mark>Ứng dụng khuyến nghị chế độ ăn</mark> Vui lòng cập nhật
              thông tin chính xác nhất cho người dùng{" "}
            </p>
            <div
              style={{
                backgroundColor: "#b5ff93",
                padding: 10,
                borderRadius: 10,
                marginBottom:10,
              }}
            >
              <div className="row about-list">
                <div className="col-md-6">
                  <div>
                    <label>Giới tính</label>
                    <p>{gender === 1 ? "Nữ" : gender === 2 ? "Nam" : "Khác"}</p>
                  </div>
                  <div>
                    <label>Bệnh</label>
                    <p>{items[sickId - 1]?.name}</p>
                  </div>
                  <div>
                    <label>Ngày tạo</label>
                    <p>{createdAt}</p>
                  </div>
                  <div>
                    <label>Ngày cập nhật</label>
                    <p>{updatedAt}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <label>E-mail</label>
                    <p>{email}</p>
                  </div>
                  <div>
                    <label>Tên</label>
                    <p>{name}</p>
                  </div>
                  <div>
                    <label>Tuổi</label>
                    <p>{age}</p>
                  </div>
                  <div>
                    <label>Phân quyền</label>
                    <p>Administrator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            style={{
              fontFamily: "'Anton', sans-serif",
              width: 300,
              padding: 10,
              borderRadius: 10,
            }}
            onClick={(event) => {
              handleLogOut(event);
            }}
          >
            Đăng xuất{" "}
          </button>
        </div>
        <div className="col-lg-6">
          <div style={{ paddingLeft: 50 }}>
            <img
              src={
                gender === 2
                  ? "https://bootdey.com/img/Content/avatar/avatar7.png"
                  : "https://bootdey.com/img/Content/avatar/avatar8.png"
              }
              title=""
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
