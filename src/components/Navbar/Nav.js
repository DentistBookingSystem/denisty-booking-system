import React, { Component } from "react";
import "./styleNav.css";
import logo from "../../logo/logo1.jpg";
import LoginForm from "../Login/Login";
import Popup from "reactjs-popup";
import { Outlet, Link } from "react-router-dom";
import SignIn from "../signIn/SignIn";
import Service from "../ServiceType/Service";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import Sign_in from "../signIn/Sign_in";
export default class Nav extends Component {
  state = {
    style: "nav_button",
  };
  changeStyle = () => {
    this.setState = {
      style: "nav_button_click",
    };
  };

  componentDidMount() {}
  render() {
    return (
      <>
        <nav>
          <div className="nav">
            <div className="logo">
              <img src={logo} alt="logo" />
              <p>Rade-Nha khoa hoàn mỹ</p>
            </div>
            <FirstNav />
            <SecondNav />
          </div>
        </nav>

        <Outlet />
        {/* <Service /> */}
      </>
    );
  }
}

const FirstNav = () => (
  <ul className="first-nav">
    <li className="nav-item" onClick={() => this.changeStyle()}>
      <Link to="/home" style={{ textDecoration: "none" }}>
        <button>Trang chủ</button>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/servicetype" style={{ textDecoration: "none" }}>
        <Service />
      </Link>
    </li>
  </ul>
);

const SecondNavLogin = () => (
  <ul className="second-nav">
    <Link className="nav-item" to="/history" style={{ textDecoration: "none" }}>
      <button>History</button>
    </Link>
    <Link className="nav-item" to="/profile" style={{ textDecoration: "none" }}>
      <i className="fa-solid fa-user"></i>
    </Link>
    <Link className="nav-item" to="/logout" style={{ textDecoration: "none" }}>
      <i className="fa-solid fa-arrow-right-from-bracket"></i>
    </Link>
  </ul>
);
const SecondNav = () => (
  <ul className="second-nav">
    <Popup modal trigger={<li className="nav-item">Đăng nhập</li>}>
      <LoginForm />
    </Popup>
    <Popup modal trigger={<li className="nav-item">Đăng ký</li>}>
      <SignIn />
    </Popup>
  </ul>
);
