import "./style.css";
import React, { Component } from "react";
import axios from "axios";
import ServiceList from "../../getData/ServiceList";
import ServiceTypeList from "../../getData/ServiceTypeList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
const API_INPUT_BRANCH = "http://localhost:8080/rade/patient/appointment";
const slot = [1, 2, 3, 4, 5, 6];

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
      date: "",
      branchArr: [],
      shift: 0,
      //
      validateMsg: {},
      numServiceSelected: 0,
      displayChoose: true,
      today: this.getCurrentDate(),
      maxday: this.getMaxDate(),
      slotSelected: [],
    };
    this.changeService = this.changeService.bind(this);
    this.MapDoctor = this.MapDoctor.bind(this);
  }

  getCurrentDate(separator = "") {
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + 1);
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}-${
      month < 10 ? `0${month}` : `${month}`
    }-${separator}${date}`;
  }

  getMaxDate(separator = "") {
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + 7);
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}-${
      month < 10 ? `0${month}` : `${month}`
    }-${separator}${date}`;
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

  changDoctor(e) {
    this.setState({
      doctorID: e.currentTarget.value,
    });
  }
  ShowServiceSelected() {
    return this.state.serviceID.map((item, index) => (
      <ul key={item.service.id} className="detail">
        <li className="service">
          <p style={{ padding: ` 10px 20px` }}>{item.service.name}</p>
        </li>

        <li className="remove">
          <button value={item.service.id} onClick={(e) => this.removeItem(e)}>
            <FontAwesomeIcon icon={faXmark} />
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
      if (!(item.service.id === parseInt(valueRemove))) {
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
    var err = this.validateAll();
    console.log("đặt lịch");
    console.log(this.state);
    if (!err) {
      const data = {
        appointmentDTO: {
          branch_id: this.state.branch.id,
          doctor_id: this.state.doctorID,
          date: this.state.date,
          shift: this.state.shift,
        },

        phone: phone,
        serviceIdList: this.state.serviceID_List,
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
            "http://localhost:8080/rade/patient/appointment/make",
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
    if (this.state.date === 0) {
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

  async componentDidMount() {
    await ServiceTypeList.getSericeType().then((res) => {
      this.setState({
        branchArr: res.data.branchList,
      });
    });
    // console.log("this.state.branchArr");
    // console.log(this.state.branchArr);
    if (this.state.displayChoose === true) {
      document.getElementById("popup").style.display = "block";
      // document.getElementById("page").style.backgroundColor =
      //   "rgba(94, 85, 85, 0.8)";
    } else {
      document.getElementById("popup").style.display = "none";
    }
  }

  ShowAddress() {
    return (
      <div className="address">
        <h4>Địa chỉ bạn chọn</h4>
        <p>{this.state.branch.name}</p>
      </div>
    );
  }

  ShowInputNameAndPhone() {
    if (phone === null) {
      return window.location.replace("/");
    }
  }

  ChooseBranchPopUp = () => {
    return (
      <div id="popup" className="cover">
        <div className="branch-container">
          <div>
            <h3 className="choose-branch-title">Chọn chi nhánh bạn muốn đến</h3>
          </div>
          <div className="branch-hint">
            {this.state.branchArr.map((item) => (
              <button
                value={item.id}
                className="branch-item"
                onClick={(e) => this.HandleClick(e)}
              >
                <>
                  <h4>{item.name}</h4>
                  <div className="info-branch">
                    <div className="info-branch-left">
                      <div style={{ width: `100px`, height: `100px` }}>
                        <img
                          style={{ width: `100px`, margin: `auto` }}
                          src={`https://drive.google.com/uc?id=${item.url}`}
                          alt=""
                        ></img>
                      </div>
                    </div>
                    <div className="info-branch-right">
                      <div className="addr">
                        <p style={{ fontWeight: `bold` }}>Địa chỉ:</p>
                        <p style={{ marginLeft: `15px` }}>
                          {item.district.name}, {item.district.province.name}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontWeight: `bold` }}>
                          Thời gian làm việc:
                        </p>
                        <p style={{ marginLeft: `15px` }}>
                          {item.open_time}-{item.close_time}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  async HandleClick(e) {
    let id = e.currentTarget.value;
    axios
      .get(API_INPUT_BRANCH + "/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        this.setState({
          serviceTypeArr: res.data.serviceTypeList,
          branch: res.data.branch,
          doctorArr: res.data.doctorByBranchList,
        });
      });
    console.log(this.state.serviceTypeArr);
    document.getElementById("popup").style.display = `none`;
  }

  getSlot() {
    const API = "http://localhost:8080/rade/patient/appointment/check-doctor";
    console.log(this.state.doctorID);
    console.log(this.state.date);
    const data = {
      doctor_id: this.state.doctorID,
      date: this.state.date,
    };
    axios
      .post(API, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        console.log(res.data);
        await this.setState({
          slotSelected: res.data.shiftList,
        });
      });
  }

  render() {
    return (
      <div>
        <div id="page">
          <this.ChooseBranchPopUp />
        </div>

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
                    <li key={item.service.id} className="service-item-small">
                      <button
                        name={item.service.id}
                        value={item.service.name}
                        onClick={(e) => {
                          if (this.state.numServiceSelected < 3) {
                            let flag = false;
                            this.state.serviceID.map((item) => {
                              if (item.service.name === e.currentTarget.value) {
                                flag = true;
                              }
                            });
                            if (!flag) {
                              this.setState({
                                serviceID: [...this.state.serviceID, item],
                                serviceID_List: [
                                  ...this.state.serviceID_List,
                                  item.service.id,
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
                        <p>{item.service.name}</p>
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
              {this.ShowAddress()}
              <div className="doctor">
                <div className="doctor-select">
                  <h4>Chọn bác sĩ</h4>
                  <select onChange={(e) => this.changDoctor(e)}>
                    <option value={0}>Chọn bác sĩ</option>
                    {this.MapDoctor()}
                  </select>
                </div>
              </div>
              <div className="time">
                <h4>
                  <p>Chọn thời gian bạn đến</p>
                  <p style={{ color: "red" }}>(*)</p>{" "}
                </h4>
                <div
                  style={{
                    textAlign: "left",
                    paddingLeft: `20px`,
                    marginLeft: `20px`,
                  }}
                >
                  <input
                    style={{ border: `1px solid black`, width: `200px` }}
                    type="date"
                    min={this.state.today}
                    max={this.state.maxday}
                    onChange={async (e) => {
                      await this.setState({
                        date: e.currentTarget.valueAsDate,
                      });
                      this.getSlot();
                    }}
                  />
                </div>
                <div className="slot" style={{ textAlign: `left` }}>
                  <h4>Chọn giờ làm việc</h4>
                  <select
                    style={{ border: `1px solid black` }}
                    onChange={async (e) => {
                      await this.setState({
                        shift: e.currentTarget.value,
                      });
                    }}
                  >
                    <option>Chọn phiên</option>
                    {slot.map((item) => {
                      if (this.state.slotSelected.indexOf(item) > -1) {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
              </div>
              <div className=" service">
                <h4>Dịch vụ đã chọn ({this.state.serviceID.length})</h4>
              </div>
              {this.state.serviceID.length !== 0 ? (
                <div className="service-selected">
                  {/* <div id="border-bottom"></div> */}

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
              ) : (
                ""
              )}

              {/* <BookDrivingSlot /> */}
              <div className="appointmet-btn">
                <button onClick={(e) => this.handleBooking(e)}>Đặt lịch</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
