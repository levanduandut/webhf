import React, { useEffect, useState } from "react";
import { FaUserAlt, FaTh, FaBars , FaBloggerB} from "react-icons/fa";
import { GiBodyBalance } from "react-icons/gi";
import { MdOutlineFastfood, MdManageAccounts,MdOutlineSick } from "react-icons/md";
import { SiGoogletagmanager } from "react-icons/si";
import { NavLink, redirect, useNavigate } from "react-router-dom";
const Sidebar = ({ children }) => {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    useEffect(() => {
        if (!localStorage.getItem("JWT")) {
            navigate("/login");
        }
    },[])
    const menuItem = [
        {
            path: "/about",
            name: "Thông tin tài khoản",
            icon: <FaUserAlt />,
        },
        {
            path: "/manageBlog",
            name: "Quản lý bài viết",
            icon: <FaBloggerB />,
        },
        {
            path: "/manageSick",
            name: "Quản lý bệnh",
            icon: <MdOutlineSick />,
        },
        {
            path: "/manageExercise",
            name: "Quản lý bài tập",
            icon: <GiBodyBalance />,
        },
        {
            path: "/manageFood",
            name: "Quản lý món ăn",
            icon: <MdOutlineFastfood />,
        },
        {
            path: "/manageIngredient",
            name: "Quản lý thành phần dinh dưỡng",
            icon: <SiGoogletagmanager />,
        },
        {
            path: "/manageUser",
            name: "Quản lý người dùng",
            icon: <MdManageAccounts />,
        },
    ];
    function handleLogOut() {
        
        localStorage.clear("JWT");
        localStorage.setItem("isLogin", false);
        navigate("/login");
    }
    return (
        <div className="containerX">
            <div style={{ width: isOpen ? "600px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="Logo">
                        Logo
                    </h1>
                    <div
                        style={{ marginLeft: isOpen ? "100px" : "-2px" }}
                        className="bars"
                    >
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <NavLink
                        to={item.path}
                        style={{ textDecoration: "none" }}
                        key={index}
                        className={({ isActive }) => (isActive ? "active link" : "link")}
                    >
                        <div className="icon">{item.icon}</div>
                        <div className='link_text' style={{ display: isOpen ? "block" : "none", paddingTop: "5px" }}>
                            {item.name}
                        </div>

                    </NavLink>
                ))}
                <div style={{ fontFamily: "", justifyContent: 'center', display: 'flex', flexDirection: "column", padding: "20px 100px" }}>
                    <button style={{ fontFamily: "'Anton', sans-serif", display: isOpen ? "block" : "none", paddingTop: "5px" }} className="btn_logOut" onClick={(event) => {
                        handleLogOut(event);
                    }}>Đăng xuất</button>
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
