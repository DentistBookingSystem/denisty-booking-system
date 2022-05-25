import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../../logo/logo1.jpg";
import "./style.css";

// tạo một validation schema với yup
const schema = yup.object().shape({
  phone: yup
    .string()
    .required("Vui lòng nhập phone")
    .max(10, "username tối đa 10 ký tự"),
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
    .required("Vui lòng nhập mật khẩu")
    .max(20, "mật khẩu tối đa 20 ký tự"),
  email: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .max(20, "mật khẩu tối đa 20 ký tự"),
  disttrict: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .max(20, "mật khẩu tối đa 20 ký tự"),
  province: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .max(20, "mật khẩu tối đa 20 ký tự"),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onLoginSubmit = (data) => {
    console.log(data);
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
        <div className="row-sign">
          <label>Email: </label>
          <input {...register("email")} placeholder="Nhập email của bạn" />
          {errors.email && <p className="error">{errors.email?.message}</p>}
        </div>
        <div className="row-sign">
          <label>Tỉnh thành: </label>
          <input {...register("province")} placeholder="Nhập tỉnh thành" />
          {errors.province && (
            <p className="error">{errors.province?.message}</p>
          )}
        </div>
        <div className="row-sign">
          <label>Quận/Huyện: </label>
          <input {...register("disttrict")} placeholder="Nhập quận/huyện" />
          {errors.disttrict && (
            <p className="error">{errors.disttrict?.message}</p>
          )}
        </div>
        <div className="btn">
          <button type="submit">Sign</button>
        </div>
      </form>
    </div>
  );
}
