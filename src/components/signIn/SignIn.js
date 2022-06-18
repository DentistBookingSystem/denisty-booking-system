import React, { useEffect, useState } from "react";
import logo from "../../logo/logo1.jpg";
import "./style.css";
import isEmpty from "validator/lib/isEmpty";
import axios from "axios";
import { Col, Row } from "reactstrap";
const API_REGIS = "http://localhost:8080/rade/account/registration";
const API_GET_PROVINCE = "http://localhost:8080/rade/province";
const API_GET_DISTRICT = "http://localhost:8080/rade/district/";
const genders = [
  {
    id: "1",
    value: "Nam",
  },
  {
    id: "2",
    value: "Nữ",
  },
];
export default function SignIn() {
  const [districtArr, setDistrictArr] = useState([]);
  const [provinceArr, setProvinceArr] = useState([]);

  const [validationMsg, setValidationMsg] = useState("");

  //data sign
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confrim, setConfirm] = useState("");
  const [full_name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [districtID, setDistrictID] = useState("");
  const [province, setProvice] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get(API_GET_PROVINCE)
      .then((res) => {
        setProvinceArr(res.data);
        console.log("gán :");
        console.log(res);
      })
      .catch()
      .then(() => {
        console.log("provinceArr");
        console.log(provinceArr);
      });
  }, []);

  const clickSiginIn = () => {
    validateAll();
    const data = {
      full_name: full_name,
      password: password,
      date_of_birth: dateOfBirth,
      gender: gender,
      district_id: districtID,
      phone: phone,
      email: email,
    };
    console.log(data);
    axios.post(API_REGIS, data).then(() => {
      console.log("thành công");
      window.location.replace("/");
    });
  };

  const validateAll = () => {
    const msg = {};
    if (phone.length > 11 || phone.length < 10) {
      msg.phone = "Vui lòng nhập số điện thoại của bạn";
    }
    if (password.length === 0) {
      msg.password = "Vui lòng nhập mật khẩu";
    } else if (password !== confrim) {
      msg.confrim = "Bạn phải nhập lại mất khẩu";
    }
    if (isEmpty(full_name)) {
      msg.full_name = "Vui lòng nhập tên của bạn";
    }
    if (isEmpty(gender)) {
      console.log("genderfalse");
      msg.gender = "Nhập giới tính của bạn";
      console.log(msg.gender);
    }
    if (isEmpty(province)) {
      msg.province = "Nhập tỉnh của bạn";
    }
    if (isEmpty(districtID)) {
      msg.districtID = "Nhập quận/huyện của bạn";
    }
    const differ = compareDate(dateOfBirth);
    console.log(differ + " ngày sinh");
    if (differ < 20) {
      msg.dateOfBirth = "Bạn không đủ tuổi";
    }
    setValidationMsg(msg);
    console.log(validationMsg);
  };

  const handleChangePro = (e) => {
    setProvice(e.target.value);
    axios.get(API_GET_DISTRICT + e.target.value).then((res) => {
      console.log(res.data);
      setDistrictArr(res.data);
    });
  };

  const compareDate = (dateOfBirth) => {
    var today = new Date();
    return Math.floor((today - dateOfBirth) / (1000 * 60 * 60 * 24));
  };

  return (
    <div id="signForm">
      <div className="form-header">
        <img src={logo} alt="logo" />
        <h2>Rade - Nha khoa hoàn mỹ</h2>
      </div>
      <div className="form-sign">
        <Row className="content-sign">
          <Col>
            {/* phone */}
            <Row>
              <Col sm={5}>Số điện thoại</Col>
              <Col sm={7}>
                <input
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <span style={{ color: `red`, fontSize: `15px` }}>
              <>{validationMsg.phone}</>
            </span>
            {/* Mất khẩu */}
            <Row>
              <Col sm={5}>Mật khẩu</Col>
              <Col sm={7}>
                <input
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <span style={{ color: `red`, fontSize: `15px` }}>
              <>{validationMsg.password}</>
            </span>
            {/* Nhập lại mật khẩu */}
            <Row>
              <Col sm={5}>Nhập lại mật khẩu</Col>
              <Col sm={7}>
                <input
                  name="confirm"
                  value={confrim}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <span style={{ color: `red`, fontSize: `15px` }}>
              <>{validationMsg.confrim}</>
            </span>
            {/* Nhập họ và tên */}
            <Row>
              <Col sm={5}>Tên</Col>
              <Col sm={7}>
                <input
                  name="full_name"
                  value={full_name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <span style={{ color: `red`, fontSize: `15px` }}>
              <>{validationMsg.full_name}</>
            </span>
          </Col>

          {/* col bên phải  */}
          <Col className="col-right">
            <Row>
              {/* Ngày sinh */}
              <Col sm={8}>
                <Row>
                  <Col sm={6}>Ngày sinh</Col>
                  <Col sm={6}>
                    <input
                      style={{ fontSize: `18px` }}
                      type="date"
                      name="dateOfBirth"
                      value={dateOfBirth}
                      onChange={(e) => {
                        setDateOfBirth(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <span style={{ color: `red`, fontSize: `15px` }}>
                  <>{validationMsg.dateOfBirth}</>
                </span>
              </Col>
              {/* Giới tính */}
              <Col sm={4}>
                <Row>
                  <Col sm={5}>Giới tính</Col>
                  <Col sm={7}>
                    <select
                      style={{ width: `100%` }}
                      name="gender"
                      className="optional"
                      onChange={(e) => setGender(e.target.value)}
                      defaultValue={1}
                    >
                      {/* <option value="">Chọn giới tính</option> */}
                      {genders.map((option) => (
                        <option value={option.id}>{option.value}</option>
                      ))}
                    </select>
                  </Col>
                </Row>
                <span style={{ color: `red`, fontSize: `15px` }}>
                  <>{validationMsg.gender}</>
                </span>
              </Col>
            </Row>

            {/* Email */}
            <Row>
              <Col sm={4}>Email</Col>
              <Col sm={8}>
                <input
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Col>
            </Row>
            {/* Tỉnh thành phố  */}
            <Row>
              <Col sm={4}>Tỉnh/Thành phố</Col>
              <Col sm={8}>
                <select
                  style={{ width: `100%` }}
                  className="optional"
                  onChange={(e) => handleChangePro(e)}
                  placeholder="Nhập tỉnh"
                >
                  <option value="">Chọn tỉnh/thành phố</option>
                  {provinceArr.map((option) => (
                    <option value={option.id}>{option.name}</option>
                  ))}
                </select>
              </Col>
            </Row>
            <span style={{ color: `red`, fontSize: `15px` }}>
              <>{validationMsg.province}</>
            </span>
            {/* Quận Huyện  */}
            <Row>
              <Col sm={4}>Quận/Huyện</Col>
              <Col sm={8}>
                <select
                  style={{ width: `100%` }}
                  className="optional"
                  onChange={(e) => setDistrictID(e.target.value)}
                >
                  <option value="">Chọn quận/huyện</option>
                  {districtArr.map((option) => (
                    <option value={option.id}>{option.name}</option>
                  ))}
                </select>
              </Col>
            </Row>
            <span style={{ color: `red`, fontSize: `15px` }}>
              <>{validationMsg.districtID}</>
            </span>
          </Col>
        </Row>
        <Row className="btn" style={{ textAlign: `center` }}>
          <button type="button" onClick={() => clickSiginIn()}>
            Đăng ký
          </button>
        </Row>
      </div>
    </div>
  );
}
