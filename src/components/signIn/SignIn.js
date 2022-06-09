import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../../logo/logo1.jpg";
import "./style.css";
import isEmpty from "validator/lib/isEmpty";

const districts = [
  {
    id: "pro1",
    value: "Quận 1",
  },
  {
    id: "pro2",
    value: "Quận 2",
  },
  {
    id: "pro3",
    value: "Quận 3",
  },
  {
    id: "pro4",
    value: "Quận 4",
  },
];

const districts2 = [
  {
    id: "pro1",
    value: "Quận 5",
  },
  {
    id: "pro2",
    value: "Quận 6",
  },
  {
    id: "pro3",
    value: "Quận 7",
  },
  {
    id: "pro4",
    value: "Quận 8",
  },
];

const provinces = [
  {
    id: "p1",
    value: "HCM",
  },
  {
    id: "p2",
    value: "HN",
  },
];
const genders = [
  {
    id: "nam",
    value: "Nam",
  },
  {
    id: "nu",
    value: "Nữ",
  },
];

// tạo một validation schema với yup
const schema = yup.object().shape({
  phone: yup
    .string()
    .required("Vui lòng nhập phone")
    .max(10, "Số điện thoại tối đa 10 ký tự"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .max(20, "mật khẩu tối đa 20 ký tự"),
  confirm: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu")
    .max(20, "mật khẩu tối đa 20 ký tự"),
  name: yup
    .string()
    .required("Vui lòng nhập Họ và Tên")
    .max(20, "mật khẩu tối đa 20 ký tự"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .max(20, "mật khẩu tối đa 20 ký tự"),
});

export default function SignIn() {
  const [districtArr, setDistrictArr] = useState([]);
  const [districtID, setDistrictID] = useState("");
  const [province, setProvice] = useState(provinces[0].id);
  const [gender, setGender] = useState("");
  const [validationMsg, setValidationMsg] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onLoginSubmit = (data) => {
    // const data = {
    //   full_name: "Nguyen Quoc Bao",
    //   password: "12345",
    //   date_of_birth: "05-05-2022",
    //   gender: 1,
    //   district_id: 1,
    //   phone: "0948457079",
    //   email: "Hhihhihihih",
    // };
    const isValid = validateAll();
    if (!isValid) {
      console.log(data);
      console.log(districtID);
      console.log(gender);
      console.log(dateOfBirth);
      console.log(province);
    }
  };

  const validateAll = () => {
    const msg = {};
    console.log(gender.trim().length);
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
    if (differ < 200) {
      msg.dateOfBirth = "Bạn không đủ tuổi";
    }
    setValidationMsg(msg);
  };

  const handleChangePro = (e) => {
    setProvice(e.target.value);
    if (province === "p1") {
      setDistrictArr(districts);
    } else {
      setDistrictArr(districts2);
    }
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
      <form onSubmit={handleSubmit(onLoginSubmit)}>
        <div className="row-sign">
          <label>Số điện thoại: </label>
          <input
            {...register("phone")}
            placeholder="Nhập số điện thoại của bạn"
          />
          {errors.phone && <p className="error">{errors.phone?.message}</p>}
        </div>
        <div className="row-sign">
          <label>Mật khẩu: </label>
          <input {...register("password")} placeholder="Nhập mật khẩu" />
          {errors.password && (
            <p className="error">{errors.password?.message}</p>
          )}
        </div>
        <div className="row-sign">
          <label>Nhập lại mật khẩu: </label>
          <input {...register("confirm")} placeholder="Nhập lại mật khẩu" />
          {errors.confirm && <p className="error">{errors.confirm?.message}</p>}
        </div>
        <div className="row-sign">
          <label>Tên: </label>
          <input {...register("name")} placeholder="Nhập tên của bạn" />
          {errors.name && <p className="error">{errors.name?.message}</p>}
        </div>
        {/* Giới tính */}
        <div className="row-sign">
          <label>Giới tính: </label>
          <select
            name="gender"
            className="optional"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Chọn giới tính</option>
            {genders.map((option) => (
              <option value={option.id}>{option.value}</option>
            ))}
          </select>
          <span>
            <p className="error">{validationMsg.gender}</p>
          </span>
        </div>
        {/* Ngày sinh */}
        <div className="row-sign">
          <label>Ngày sinh: </label>
          <input
            type="date"
            onChange={(e) => setDateOfBirth(e.target.valueAsDate)}
          />
          <p className="error">{validationMsg.dateOfBirth}</p>
        </div>
        <div className="row-sign">
          <label>Email: </label>
          <input {...register("email")} placeholder="Nhập email của bạn" />
          {errors.email && <p className="error">{errors.email?.message}</p>}
        </div>

        <div className="row-sign">
          <label>Tỉnh thành: </label>
          <select
            className="optional"
            onChange={(e) => handleChangePro(e)}
            placeholder="Nhập tỉnh"
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {provinces.map((option) => (
              <option value={option.id}>{option.value}</option>
            ))}
            <option value="other-option">Địa chỉ khác</option>
          </select>
          <p className="error">{validationMsg.province}</p>
        </div>
        <div className="row-sign">
          <label>Quận/Huyện: </label>
          <select
            className="optional"
            onChange={(e) => setDistrictID(e.target.value)}
          >
            <option value="">Chọn quận/huyện</option>
            {districtArr.map((option) => (
              <option value={option.id}>{option.value}</option>
            ))}
          </select>
          <p className="error">{validationMsg.districtID}</p>
          {/* <input {...register("disttrict")} placeholder="Nhập quận/huyện" />
          {errors.disttrict && (
            <p className="error">{errors.disttrict?.message}</p>
          )} */}
        </div>
        <div className="btn">
          <button type="submit">Đăng ký</button>
        </div>
      </form>
    </div>
  );
}
