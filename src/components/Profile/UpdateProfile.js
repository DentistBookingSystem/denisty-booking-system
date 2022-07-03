import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";
import { toast } from "react-toastify";
import { Col, Input, Row } from "reactstrap";
import Validate from "../signIn/Validate";
import validator from "validator";
const API_GET_ACCOUNT_PROFILE =
  "http://localhost:8080/rade/patient/account/profile?phone=";
const API_GET_PROVINCE = "http://localhost:8080/rade/province";
const API_GET_DISTRICT = "http://localhost:8080/rade/district/";
const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
const genders = [
  {
    id: 1,
    value: "Nam",
  },
  {
    id: 2,
    value: "Nữ",
  },
];
export default function UpdateProfile() {
  const [account, setAccount] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [district, setDistrict] = useState(null);
  const [province, setProvince] = useState(null);
  const [gender, setGender] = useState(null);

  const [emailValidate, setEmailValidate] = useState(false);
  const [nameValidate, setNameValidate] = useState(false);
  const [dateOfBirthValidate, setDateOfBirthValidate] = useState(false);
  const [districtValidate, setDistrictValidate] = useState(false);
  const [provinceValidate, setProvinceValidate] = useState(false);
  const [genderValidate, setGenderValidate] = useState(false);

  //
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);

  const getAccount = async () => {
    console.log("getAccount");
    const data = {
      phone: phone,
    };
    const result = await axios
      .get(API_GET_ACCOUNT_PROFILE + phone, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        if (result.status === 401) {
          toast.warn("Bạn không có quyền truy cập");
        }
      });
    console.log(result.data.district.province.name);
    if (result.data) {
      setAccount(result?.data);
      setName(result.data.fullName);
      setEmail(result.data.email);
      setGender(result.data.gender);
      setDistrict(result.data.district.id);
      setProvince(result.data.district.province.id);
      setDateOfBirth(result.data.dateOfBirth);
    }
  };

  const getProvince = async () => {
    const result = await axios.get(API_GET_PROVINCE);
    console.log("province", result.data);
    if (result.data) {
      setProvinceList(result.data);
      setDistrict(null);
    }
  };

  const getDistrict = async () => {
    if (province.length === 0) {
      console.log("không có province");
      return;
    }
    const result = await axios.get(API_GET_DISTRICT + province);

    if (result.data) {
      setDistrictList(result.data);
    }
  };

  useEffect(() => {
    getAccount();
    getProvince();
  }, []);

  useEffect(() => {
    getDistrict();
  }, [province]);

  return (
    <div
      style={{ backgroundColor: `white`, padding: `20px`, paddingTop: `0px` }}
    >
      <Row className="header-profile">
        <h3>Chỉnh sửa thông tin của bạn</h3>
      </Row>
      <div>
        {/* Phone  */}
        <Row className="justify-content-center">
          <Col md={2} className="text-start">
            <label style={{ color: `black`, textAlign: `left` }}>
              Số điện thoại:{" "}
            </label>
          </Col>
          <Col md={5}>
            <Input
              style={{
                width: `100%`,
                border: `1px solid gray`,
                borderRadius: `4px`,
              }}
              value={account.phone}
            />
          </Col>
        </Row>

        {/* Tên  */}
        <Row className="justify-content-center">
          <Col md={2} className="text-start">
            <label style={{ color: `black`, textAlign: `left` }}>Tên: </label>
          </Col>
          <Col md={5}>
            <Input
              style={{
                width: `100%`,
                border: `1px solid gray`,
                borderRadius: `4px`,
              }}
              placeholder="Nhập tên của bạn"
              value={name}
              onChange={(e) => {
                if (!Validate.validateMinLength(e.target.value, 8)) {
                  setNameValidate(true);
                } else {
                  setNameValidate(false);
                }
                setName(e.target.value);
              }}
            />
          </Col>
          {nameValidate ? (
            <Col md={7} className=" text-end">
              <span style={{ color: `red`, fontSize: `15px` }}>
                Tên phải dài ít nhất 8 kí tự.
              </span>
            </Col>
          ) : null}
        </Row>
        {/* Email  */}
        <Row className="justify-content-center" md={5}>
          <Col md={2} className="text-start">
            <label style={{ color: `black`, textAlign: `left` }}>Email: </label>
          </Col>
          <Col md={5}>
            <Input
              style={{
                width: `100%`,
                border: `1px solid gray`,
                borderRadius: `4px`,
              }}
              placeholder="Nhập email của bạn"
              type="email"
              value={email}
              onChange={(e) => {
                if (!validator.isEmail(email)) {
                  setEmailValidate(true);
                } else {
                  setEmailValidate(false);
                }
                setEmail(e.target.value);
              }}
            />
          </Col>
          {emailValidate ? (
            <Col md={7} className=" text-end">
              <span style={{ color: `red`, fontSize: `15px` }}>
                Email không tồn tại.
              </span>
            </Col>
          ) : null}
        </Row>

        {/* Date of birth  */}
        <Row className="justify-content-center">
          <Col md={2} className="text-start">
            <label style={{ color: `black`, textAlign: `left` }}>
              Ngày sinh:{" "}
            </label>
          </Col>
          <Col md={5}>
            <Input
              style={{
                width: `100%`,
                border: `1px solid gray`,
                borderRadius: `4px`,
              }}
              placeholder="Nhập email của bạn"
              type="date"
              pattern="yyyy-mm-dd"
              value={dateOfBirth}
              onChange={(e) => {
                // let separator = "";
                // let date = e.target.valueAsDate.getDate();
                // let month = e.target.valueAsDate.getMonth() + 1;
                // let year = e.target.valueAsDate.getFullYear();

                // let dayOfBirth = `${year}${separator}-${
                //   month < 10 ? `0${month}` : `${month}`
                // }-${separator}${date}`;
                setDateOfBirth(e.target.valueAsDate);
              }}
            />
          </Col>
          {dateOfBirthValidate ? (
            <Col md={7} className=" text-end">
              <span style={{ color: `red`, fontSize: `15px` }}>
                Vui lòng chọn ngày sinh của bạn.
              </span>
            </Col>
          ) : null}
        </Row>
        {/* Giới tính  */}
        <Row className="justify-content-center">
          <Col md={2} className="text-start">
            <label style={{ color: `black`, textAlign: `left` }}>
              Giới tính:{" "}
            </label>
          </Col>
          <Col md={5}>
            <select
              style={{
                width: `100%`,
                border: `1px solid gray`,
                borderRadius: `4px`,
              }}
              defaultValue={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              {genders.map((item, key) => {
                if (gender === item.id) {
                  return (
                    <option key={item.id} value={item.id} selected={true}>
                      {item.value}
                    </option>
                  );
                } else {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.value}
                    </option>
                  );
                }
              })}
            </select>
          </Col>
          {genderValidate ? (
            <Col md={7} className=" text-end">
              <span style={{ color: `red`, fontSize: `15px` }}>
                Vui lòng chọn giới tính của bạn.
              </span>
            </Col>
          ) : null}
        </Row>
        {/* province  */}
        <Row className="justify-content-center">
          <Col md={2} className="text-start">
            <label style={{ color: `black`, textAlign: `left` }}>
              Tỉnh/thành phố:{" "}
            </label>
          </Col>
          <Col md={5}>
            <select
              style={{
                width: `100%`,
                border: `1px solid gray`,
                borderRadius: `4px`,
              }}
              defaultValue={province}
              onChange={(e) => {
                console.log(e.target.value);
                setProvince(e.target.value);
              }}
            >
              {provinceList.map((item, key) => {
                if (province === item.id) {
                  return (
                    <option key={item.id} value={item.id} selected={true}>
                      {item.name}
                    </option>
                  );
                } else {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                }
              })}
            </select>
          </Col>
          {provinceValidate ? (
            <Col md={7} className=" text-end">
              <span style={{ color: `red`, fontSize: `15px` }}>
                Vui lòng chọn tỉnh/thành phố bạn đang ở.
              </span>
            </Col>
          ) : null}
        </Row>
        {/* District  */}
        <Row className="justify-content-center">
          <Col md={2} className="text-start">
            <label style={{ color: `black`, textAlign: `left` }}>
              Quận/huyện:{" "}
            </label>
          </Col>
          <Col md={5}>
            <select
              style={{
                width: `100%`,
                border: `1px solid gray`,
                borderRadius: `4px`,
              }}
              defaultValue={district}
              onChange={(e) => {
                setDistrict(e.target.value);
              }}
            >
              <option value="-1">--- Select district --- </option>
              {districtList.map((item, key) => {
                if (district === item.id) {
                  return (
                    <option key={item.id} value={item.id} selected={true}>
                      {item.name}
                    </option>
                  );
                } else {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                }
              })}
            </select>
          </Col>
          {districtValidate ? (
            <Col md={7} className=" text-end">
              <span style={{ color: `red`, fontSize: `15px` }}>
                Vui lòng chọn quận/huyện bạn đang ở.
              </span>
            </Col>
          ) : null}
        </Row>
        <Row className="justify-content-around">
          <Col xs={3} md={2}>
            <Row>
              <button>Thay đổi</button>
            </Row>
          </Col>
          <Col xs={3} md={2}>
            <Row>
              <button>Hủy bỏ</button>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
