import React from "react";
import "./style.css";
import AccountLogin from "../../service/loginService";
import gmail_icon from "../../assets/images/google.jpg";
import { toast } from "react-toastify";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: "",
      validMsg: {},
    };
  }

  onChangeHandle(e) {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val,
    });
  }

  validateAll() {
    let error = {};
    console.log(this.state.phone);
    if (this.state.phone.length < 10 || this.state.phone.length > 11) {
      console.log("phone-err");
      error.phone = "Please input your phone!!!";
    }
    if (this.state.password.length === 0) {
      error.password = "Please input your password";
    }
    this.setState({
      validMsg: error,
    });
  }

  onSubmitHandle(e) {
    this.validateAll();
    let err = this.state.validMsg;
    if (err) {
      AccountLogin.login(this.state.phone, this.state.password)
        .then((response) => {
          localStorage.setItem("phone", response.data.phone);
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("statusLogin", true);
          if (response.data.roleName === "ROLE_USER") {
            window.location.reload();
          } else {
            toast.warn(
              "Bạn đăng nhập không thành công. Tài khoản của bạn không tồn tại"
            );
            this.setState({
              password: "",
            });
          }
        })
        .catch((e) => {
          localStorage.setItem("statusLogin", false);
          toast.error("Login không thành công");
          this.setState({
            password: "",
          });
        });
      // AccountLogin.getBranch();
    }
  }

  render() {
    return (
      <div id="loginform">
        <h2 id="headerTitle">Đăng nhập</h2>
        <div id="login">
          <form onSubmit={() => this.onSubmitHandle()}>
            <div className="row">
              <label>Số điện thoại</label>
              <p style={{ color: `red` }}>{this.state.validMsg.phone}</p>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                name="phone"
                onChange={(e) => this.onChangeHandle(e)}
              />
            </div>
            <div className="row">
              <label>Nhập mật khẩu</label>
              <p style={{ color: `red` }}>{this.state.validMsg.password}</p>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                name="password"
                value={this.state.password}
                onChange={(e) => this.onChangeHandle(e)}
              />
            </div>
            <div id="button" className="row justify-content-center">
              <button type="button" onClick={() => this.onSubmitHandle()}>
                Login
              </button>
            </div>
          </form>
          <div id="alternativeLogin">
            <label>Hoặc đăng nhập bằng:</label>
            <div id="iconGroup">
              <a
                href="https://accounts.google.com/o/oauth2/auth?scope=email&redirect_uri=http://localhost:8080/VegetableStrore/MainController&response_type=code
                       &client_id=247126668913-fi6ogou11n56ejlfk0fuq26ublnavlv6.apps.googleusercontent.com&approval_prompt=force"
                id="googleIcon"
              >
                <img className="logo" src={gmail_icon} alt="gmail" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginForm;
