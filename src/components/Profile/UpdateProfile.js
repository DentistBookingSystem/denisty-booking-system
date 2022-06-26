import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import axios from "axios";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
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
    <div>
      <Row className="header-profile">
        <h3>Chỉnh sửa thông tin của bạn</h3>
      </Row>
      <form>
        {/* Phone  */}
        <Row>
          <Col>
            <label>Số điện thoại: </label>
          </Col>
          <Col>
            <input value={account.phone} />
          </Col>
        </Row>
        {/* Tên  */}
        <Row>
          <Col>
            <label>Tên: </label>
          </Col>
          <Col>
            <input
              placeholder="Nhập tên của bạn"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Col>
        </Row>
        {/* Email  */}
        <Row>
          <Col>
            <label>Email: </label>
          </Col>
          <Col>
            <input
              placeholder="Nhập email của bạn"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Col>
        </Row>
        {/* Date of birth  */}
        <Row>
          <Col>
            <label>Ngày sinh: </label>
          </Col>
          <Col>
            <input
              placeholder="Nhập email của bạn"
              type="date"
              value={dateOfBirth}
              onChange={(e) => {
                let separator = "";
                let date = e.target.valueAsDate.getDate();
                let month = e.target.valueAsDate.getMonth() + 1;
                let year = e.target.valueAsDate.getFullYear();

                let dayOfBirth = `${year}${separator}-${
                  month < 10 ? `0${month}` : `${month}`
                }-${separator}${date}`;
                setDateOfBirth(dayOfBirth);
              }}
            />
          </Col>
        </Row>
        {/* Giới tính  */}
        <Row>
          <Col>
            <label>Giới tính: </label>
          </Col>
          <Col>
            <select
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
        </Row>
        {/* province  */}
        <Row>
          <Col>
            <label>Tỉnh/thành phố: </label>
          </Col>
          <Col>
            <select
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
        </Row>
        {/* District  */}
        <Row>
          <Col>
            <label>Quận/huyện: </label>
          </Col>
          <Col>
            <select
              defaultValue={district}
              onChange={(e) => {
                setDistrict(e.target.value);
              }}
            >
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
        </Row>
      </form>
    </div>
  );
}
