import React, { useEffect, useState } from "react";
import "./styleNav.css";
import logo from "../../logo/logo1.jpg";
import LoginForm from "../Login-Logout/Login";
import { Link, useRoutes, useNavigate, Navigate } from "react-router-dom";
import SignIn from "../signIn/SignIn";
import Service from "../ServiceType/Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import {
  faBell,
  faUser,
  faCalendarDays,
} from "@fortawesome/free-regular-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Notification from "../Notification/Notification";
import axios from "axios";
import { toast } from "react-toastify";
import HistoryPage from "../History/History";
// import { useHistory } from "react-router-dom";
// import Sign_in from "../signIn/Sign_in";
import { Redirect } from "react-router-dom";

const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
const API_POST_HISTORY =
  "http://localhost:8080/rade/patient/appointment/history";
const API_CHECK_ACCOUNT = "http://localhost:8080/rade/patient/account/";

export default function Nav(props) {
  const [statusLogin, setStatusLogin] = useState(null);
  let navigate = useNavigate();
  // let HistoryPage = useRoutes([{ path: "/history", element: <HistoryPage /> }]);
  useEffect(() => {
    var data = {
      phone: phone,
      page: 1,
    };
    axios
      .post(API_POST_HISTORY, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then()
      .catch((error) => {
        if (error.message.indexOf("401") > -1) {
          // toast.warn("Vui lòng đăng nhập lại!");
          localStorage.setItem("statusLogin", "false");
        }
      });
    // console.log(localStorage.getItem("statusLogin"));
    // console.log("phone: " + localStorage.getItem("phone"));
    // console.log("accessToken: " + localStorage.getItem("accessToken"));
  }, []);

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

  const ClickMakeAppoiment = () => {
    axios
      .get(API_CHECK_ACCOUNT + phone, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return navigate("/user/appointment");
      })
      .catch((error) => {
        if (error.message.indexOf("406") > -1) {
          toast.warn("Tài khoản bạn không có trong hệ thống");
        } else if (error.message.indexOf("410") > -1) {
          toast.warn("Bạn có lịch hẹn chưa hoàn thành");
          return navigate("/user/history");
        } else if (error.message.indexOf("423") > -1) {
          toast.warn("Tài khoản của bạn đã bị đưa vào danh sách đen");
        }
      });
  };

  const SecondNavLogin = () => (
    <ul className="second-nav">
      <div
        to="/user/appointment"
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
          onClick={() => ClickMakeAppoiment()}
        >
          Đặt lịch
        </button>
      </div>
      <Link to="" className="nav-item" style={{ textDecoration: "none" }}>
        <Notification />
      </Link>
      <Link
        className="nav-item"
        to="/user/history"
        style={{ textDecoration: "none" }}
      >
        <button>
          <FontAwesomeIcon icon={faCalendarDays} />
        </button>
      </Link>
      <Link
        className="nav-item"
        to="/user/profile"
        style={{ textDecoration: "none" }}
      >
        <button>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </Link>
      <Link
        className="nav-item"
        to="/logout"
        style={{ textDecoration: "none" }}
      >
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

  return (
    <>
      <nav>
        <div className="nav">
          <div className="logo">
            <img
              src={logo}
              alt="logo"
              onClick={() => {
                navigate("/");
              }}
            />
            <p className="p-2">Nha khoa RADE</p>
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
