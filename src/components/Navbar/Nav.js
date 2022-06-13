import React, { useEffect, useState } from "react";
import "./styleNav.css";
import logo from "../../logo/logo1.jpg";
import LoginForm from "../Login-Logout/Login";
import { Link } from "react-router-dom";
import SignIn from "../signIn/SignIn";
import Service from "../ServiceType/Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import ChooseBranchPopUp from "../chooseBranchPopUp/ChooseBranchPopUp";
import {
  faBell,
  faUser,
  faCalendarDays,
} from "@fortawesome/free-regular-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Notification from "../Notification/Notification";
// import Sign_in from "../signIn/Sign_in";

export default function Nav(props) {
  const [statusLogin, setStatusLogin] = useState(null);

  useEffect(() => {
    console.log(localStorage.getItem("statusLogin"));
    console.log("phone: " + localStorage.getItem("phone"));
    console.log("accessToken: " + localStorage.getItem("accessToken"));
  }, [localStorage.getItem("statusLogin")]);

  return (
    <>
      <nav>
        <div className="nav">
          <div className="logo">
            <img src={logo} alt="logo" />
            <p>Nha khoa RADE</p>
          </div>
          <FirstNav />
          {localStorage.getItem("statusLogin") === "true" ? (
            <SecondNavLogin />
          ) : (
            <SecondNav />
          )}
        </div>
      </nav>
    </>
  );
}

const FirstNav = () => {
  return (
    <nav>
      <ul className="first-nav">
        <li className="nav-item">
          <Link to="/home" style={{ textDecoration: "none" }}>
            <button>Trang chủ</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/servicetype/1" style={{ textDecoration: "none" }}>
            <Service />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const SecondNavLogin = () => (
  <ul className="second-nav">
    <Link
      to="/appointment"
      className="nav-item"
      style={{ textDecoration: "none" }}
    >
      <button
        type="button"
        className="btn-datlich"
        style={{
          backgroundColor: `#0b0b90 `,
          color: `white`,
          borderRadius: `10px`,
          border: `2px solid #0b0b90`,
        }}
      >
        Đặt lịch
      </button>
    </Link>
    <Link to="" className="nav-item" style={{ textDecoration: "none" }}>
      <Notification />
    </Link>
    <Link className="nav-item" to="/history" style={{ textDecoration: "none" }}>
      <button>
        <FontAwesomeIcon icon={faCalendarDays} />
      </button>
    </Link>
    <Link className="nav-item" to="/profile" style={{ textDecoration: "none" }}>
      <button>
        <FontAwesomeIcon icon={faUser} />
      </button>
    </Link>
    <Link className="nav-item" to="/logout" style={{ textDecoration: "none" }}>
      <button>
        <FontAwesomeIcon icon={faRightToBracket} />
      </button>
    </Link>
  </ul>
);
const SecondNav = () => (
  <ul className="second-nav">
    <Popup
      modal
      trigger={
        <li className="nav-item">
          <button>Đăng nhập</button>
        </li>
      }
    >
      <LoginForm />
    </Popup>
    <Popup
      modal
      trigger={
        <li className="nav-item">
          <button>Đăng ký</button>
        </li>
      }
    >
      <SignIn />
    </Popup>
  </ul>
);
