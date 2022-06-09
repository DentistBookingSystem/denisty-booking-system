import React from "react";
import "./style.css";
export default function Profile() {
  const FormInfo = (props) => (
    <form className="form-profile">
      <FormText name="name" value="Tên của bạn" label="Tên: " />
      <FormText name="phone" value="Số điện thoại" label="Số điện thoại: " />
      <FormText name="distric" value="Quận/Huyện" label="Quận/Huyện: " />
      <FormText
        name="province"
        value="tỉnh/thành phố"
        label="Tỉnh/Thành phố: "
      />
      <FormText name="gender" value="Giới tính" label="Giới tính: " />
      <FormText name="Email" value="Email" label="Email: " />
      <FormText name="name" value="Tên của bạn" label="Tên: " />
      <FormText name="phone" value="Số điện thoại" label="Số điện thoại: " />
      <FormText name="distric" value="Quận/Huyện" label="Quận/Huyện: " />
      <FormButton />
    </form>
  );

  const FormText = (props) => (
    <div className="profile-item">
      <label>{props.label}</label>
      <input
        name={props.name}
        value={props.value}
        onChange={(e) => changeInfo(e)}
      ></input>
    </div>
  );

  const FormButton = () => (
    <div className="form-button">
      <button type="button">Save</button>
      <button type="button">Cancel</button>
    </div>
  );

  //fucntion

  const changeInfo = (e) => {
    var name = e.target.name;
    var value = e.target.value;
  };

  return (
    <div>
      <div className="header-profile">
        <h3>Thông tin của bạn </h3>
      </div>

      <FormInfo />
    </div>
  );
}
