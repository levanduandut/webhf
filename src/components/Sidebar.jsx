import React, { useState } from "react";
import { FaUserAlt, FaTh, FaBars } from "react-icons/fa";
import { GiBodyBalance } from "react-icons/gi";
import { MdOutlineFastfood, MdManageAccounts } from "react-icons/md";
import { SiGoogletagmanager } from "react-icons/si";
import { NavLink } from "react-router-dom";
const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    // eslint-disable-next-line
    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaTh />,
        },
        {
            path: "/about",
            name: "Thông tin tài khoản",
            icon: <FaUserAlt />,
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
                        <div className='link_text' style={{ display: isOpen ? "block" : "none" , paddingTop:"5px" }}>
                            {item.name}
                        </div>
                    </NavLink>
                ))}
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
