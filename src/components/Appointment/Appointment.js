import "./style.css";
import React, { Component } from "react";
import axios from "axios";
import ServiceList from "../../getData/ServiceList";
const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
export default class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReadOnly: "readOnly",
      serviceTypeArr: [],
      serviceArr: [],
      doctorArr: [],
      branch: {},
      serviceID: [],
      serviceID_List: [],
      doctorID: "",
      distritID: "",
      cusName: "",
      phone: phone,
      time: "",
      date: "",
      //
      validateMsg: {},
      numServiceSelected: 0,
    };
    this.changeService = this.changeService.bind(this);
    this.MapDoctor = this.MapDoctor.bind(this);
  }

  MapDoctor(index) {
    return this.state.doctorArr.map((item) => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ));
  }

  changeService(e) {
    let id = e.currentTarget.name;
    ServiceList.getSericeType(id).then((res) =>
      this.setState({ serviceArr: res.data })
    );
  }

  changDoctor(e, index) {
    let i = index;
    let items = [...this.state.doctorID];
    let item = items[i];
    item = e.currentTarget.value;
    this.setState({ doctorID: items });
  }
  ShowServiceSelected() {
    return this.state.serviceID.map((item, index) => (
      <ul key={item.id} className="detail">
        <li id="border-right" className="service">
          <p>
            {item.id}-{item.name}
          </p>
        </li>
        <li id="border-right" className="doctor">
          {/* <select onChange={(e, index) => this.changDoctor(e, index)}> */}
          <select
            onChange={(e) => {
              let i = index;
              let items = [...this.state.doctorID];
              items[index] = e.currentTarget.value;
              this.setState({
                doctorID: items,
              });
            }}
          >
            <option value="0">Chọn bác sĩ</option>
            {this.MapDoctor(index)}
          </select>
        </li>
        <li className="remove">
          <button value={item.id} onClick={(e) => this.removeItem(e)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </li>
      </ul>
    ));
  }

  removeItem(e) {
    const valueRemove = e.currentTarget.value;
    var items = [];
    var serviveIDSelected = [];
    this.state.serviceID.map((item) => {
      if (!(item.id === parseInt(valueRemove))) {
        items = [...items, item];
      }
    });

    this.state.serviceID_List.map((item) => {
      if (!(item === parseInt(valueRemove))) {
        serviveIDSelected = [...serviveIDSelected, item];
      }
    });

    this.setState({
      serviceID: items,
      numServiceSelected: this.state.numServiceSelected - 1,
      serviceID_List: serviveIDSelected,
    });
  }

  handleBooking(e) {
    console.log("token: " + token);
    var err = this.validateAll();
    console.log("đặt lịch");
    console.log(this.state);
    if (!err) {
      const data = {
        appointmentDTO: {
          branch_id: this.state.branch.id,
          name: this.state.cusName,
          phone: this.state.phone,
          date: this.state.date,
          time: this.state.time,
        },

        serviceIdList: this.state.serviceID_List,
        doctorIdList: this.state.doctorID,
      };
      if (token.length === 0) {
        axios
          .post(
            "http://localhost:8080/rade/appointment/make",
            // JSON.stringify(data),
            data
          )
          .then((res) => {
            // console(res);
            console.log("Đặt lịch thành công");
            window.location.replace("/");
          })
          .catch(console.error());
      } else {
        axios
          .post(
            "http://localhost:8080/rade/appointment/make",
            // JSON.stringify(data),
            data,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            // console(res);
            console.log("Đặt lịch thành công");
            window.location.replace("/");
          })
          .catch(console.error());
      }
    } else {
      console.log("Đặt lịch không thành công");
    }
  }

  validateAll() {
    let msg = {};
    let flag = false;
    if (this.state.serviceID.length === 0) {
      msg.serviceID = "Vui lòng chọn loại dịch vụ";
      flag = true;
    }
    if (!this.state.branch) {
      msg.branchAddrID = "Vui lòng chọn địa chỉ bạn đến";
      flag = true;
    }
    console.log("time: " + this.state.time);
    if (this.state.time.length === 0) {
      msg.time = "Vui lòng chọn thời gian bạn đến";
      flag = true;
    }
    if (this.state.time.date === 0) {
      msg.date = "Vui lòng chọn thời gian bạn đến";
      flag = true;
    }
    var differ = this.compareDate(this.state.date);
    if (differ < 0) {
      console.log("time");
      msg.time = "Vui lòng chọn lại ngày";
      flag = true;
    }

    if (phone.length === 0) {
      if (this.state.cusName.length === 0 || this.state.cusName.length > 30) {
        msg.cusName = "Tên dài tối đa 30 kí tự";
        flag = true;
      }
    }

    if (this.state.phone.length < 10 || this.state.phone.length > 11) {
      msg.phone = "Số điện thoại phải dài 10-11 số";
      flag = true;
    }

    if (this.state.numServiceSelected > 3) {
      msg.numServiceSelected = "Số lượng dịch vụ tối đa là 3";
      flag = true;
    }

    this.setState({
      validateMsg: msg,
    });
    return flag;
  }

  compareDate(date) {
    var today = new Date();
    return Math.floor((date - today) / (1000 * 60 * 60 * 24 * 7));
  }

  componentDidMount() {
    const API_INPUT_BRANCH = "http://localhost:8080/rade/appointment";
    const data = axios
      .post(API_INPUT_BRANCH, localStorage.getItem("branch"))
      .then((res) => {
        this.setState({
          serviceTypeArr: res.data.serviceTypeList,
          branch: res.data.branch,
          doctorArr: res.data.doctorByBranchList,
        });
      })
      .catch((err) => console.log("Error-Appointment: " + err));
  }

  ShowAddress() {
    const branch_id = localStorage.getItem("branch");
    return (
      <div className="address">
        <h4>Địa chỉ bạn chọn</h4>
        <p>{this.state.branch.name}</p>
      </div>
    );
  }

  ShowInputNameAndPhone() {
    if (phone.length === 0) {
      return (
        <>
          <div className="cus-name">
            <h4>Tên:</h4>
            <input
              type="text"
              placeholder="Nhập tên"
              onChange={(e) =>
                this.setState({
                  cusName: e.currentTarget.value,
                })
              }
            ></input>
            <div>
              <p style={{ color: "red" }}>{this.state.validateMsg.cusName}</p>
            </div>
          </div>
          <div className="sdt">
            <h4>Số điện thoại:</h4>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              value={this.state.phone}
              onChange={(e) =>
                this.setState({
                  phone: e.currentTarget.value,
                })
              }
            ></input>
            <div>
              <p style={{ color: "red" }}>{this.state.validateMsg.phone}</p>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="sdt">
            <h4>Số điện thoại:</h4>
            <input type="text" value={this.state.phone} readOnly></input>
          </div>
        </>
      );
    }
  }
  render() {
    return (
      <>
        <div className="header-appointment">
          <h2>Đặt lịch nha khoa - Rade</h2>
        </div>
        <div className="appointment">
          <div className="side-left">
            <h3 className="title-left">Chọn dịch vụ</h3>
            <div className="title">
              <ul>
                <li className="service-type-item">Loại dịch vụ</li>
                <li className="service-item">Dịch vụ</li>
              </ul>
            </div>
            {/* thôngtin */}
            <div>
              <ul className="service-info">
                <li style={{ padding: 0 }} className="service-type-item">
                  {this.state.serviceTypeArr.map((item) => (
                    <li key={item.id} className="service-type-item-small">
                      <button
                        name={item.id}
                        onClick={(e) => this.changeService(e)}
                      >
                        <p>{item.name}</p>
                      </button>
                    </li>
                  ))}
                </li>
                <li style={{ padding: 0 }} className="service-item">
                  {this.state.serviceArr.map((item) => (
                    <li key={item.id} className="service-item-small">
                      <button
                        name={item.id}
                        value={item.name}
                        onClick={(e) => {
                          if (this.state.numServiceSelected < 3) {
                            let flag = false;
                            this.state.serviceID.map((item) => {
                              if (item.name === e.currentTarget.value) {
                                flag = true;
                              }
                            });
                            if (!flag) {
                              this.setState({
                                serviceID: [...this.state.serviceID, item],
                                doctorID: [...this.state.doctorID, 0],
                                serviceID_List: [
                                  ...this.state.serviceID_List,
                                  item.id,
                                ],
                                numServiceSelected:
                                  this.state.numServiceSelected + 1,
                              });
                            } else {
                              alert("Dịch vụ này bạn đã chọn ");
                            }
                          }
                        }}
                      >
                        <p>{item.name}</p>
                      </button>
                    </li>
                  ))}
                </li>
              </ul>
            </div>
          </div>
          <div className="side-right">
            <div className="title-right">
              <h3>Thông tin lịch hẹn</h3>
            </div>
            {this.ShowInputNameAndPhone()}
            <div className="infor-appointment">
              <div className="service-selected">
                <ul id="border-bottom" className="table-right">
                  <li className="service">
                    <p id="border-right">Dịch vụ đã chọn</p>
                  </li>
                  <li id="border-right" className="doctor">
                    Chọn bác sĩ
                  </li>
                  <li className="remove">Xóa</li>
                </ul>

                {this.ShowServiceSelected()}
                <p style={{ color: "red" }}>
                  {this.state.validateMsg.serviceID}
                </p>
                {this.state.numServiceSelected > 2 ? (
                  <p style={{ color: "red" }}>Số lượng dịch vụ tối đa là 3</p>
                ) : (
                  <p></p>
                )}
                <p style={{ color: "red" }}>
                  {this.state.validateMsg.numServiceSelected}
                </p>
              </div>
              {this.ShowAddress()}
              <div className="time">
                <h4>
                  <p>Chọn thời gian bạn đến</p>
                  <p style={{ color: "red" }}>(*)</p>{" "}
                </h4>
                <input
                  type="date"
                  onChange={(e) => {
                    this.setState({ date: e.currentTarget.valueAsDate });
                    console.log(this.state.date);
                  }}
                />
                <input
                  type="time"
                  onChange={(e) =>
                    this.setState({
                      time: e.currentTarget.value,
                    })
                  }
                  min="00:00"
                  max="23:59"
                  step="60"
                  value={this.state.tiem}
                />
                <p style={{ color: "red" }}>{this.state.validateMsg.time}</p>
              </div>
              <div className="appointmet-btn">
                <button onClick={(e) => this.handleBooking(e)}>Đặt lịch</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
