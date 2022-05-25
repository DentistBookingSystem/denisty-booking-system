import React from "react";
import "./style.css";
import AccountLogin from "../../service/loginService";
import gmail_icon from "../../assets/images/google.jpg";
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: "",
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  onChangeHandle(e) {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val,
    });
  }

  onSubmitHandle(e) {
    // e.preventDefault();
    alert(this.state.phone + this.state.password);
    AccountLogin.login(this.state.phone, this.state.password).then(
      () => alert("login thành công"),
      (Error) => alert("error rồi")
    );
  }

  render() {
    return (
      <div id="loginform">
        <h2 id="headerTitle">Đăng nhập</h2>
        <div id="login">
          <form onSubmit={() => this.onSubmitHandle()}>
            <div className="row">
              <label>Số điện thoại</label>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                name="phone"
                onChange={(e) => this.onChangeHandle(e)}
              />
            </div>
            <div className="row">
              <label>Nhập mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                name="password"
                onChange={(e) => this.onChangeHandle(e)}
              />
            </div>
            <div id="button" className="row">
              <button type="submit">Login</button>
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
