import "./style.css";
import React, { Component } from "react";
import axios from "axios";
import ServiceList from "../../getData/ServiceList";
import ServiceTypeList from "../../getData/ServiceTypeList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Toast from "../Toast/Toast";
import { Table, Row, Col, Container, Button } from "reactstrap";
const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
const API_INPUT_BRANCH = "http://localhost:8080/rade/patient/appointment";
const slot = [
  {
    id: 1,
    value: "7:00 - 9:00",
  },
  {
    id: 2,
    value: "9:00 - 11:00",
  },
  {
    id: 3,
    value: "11:00 - 13:00",
  },
  {
    id: 4,
    value: "13:00 - 15:00",
  },
  {
    id: 5,
    value: "15:00 - 17:00",
  },
  {
    id: 6,
    value: "17:00 - 19:00",
  },
];
let msg = {};
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
      doctorID: 0,
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
      address: "",
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
    return (
      <>
        <Table striped bordered hover style={{ fontSize: `18px` }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Dịch vụ đã chọn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td className="p-0">
                {this.state.serviceID.at(0) ? (
                  <Row className="p-0 row-item-selected">
                    <Col sm={9} className="p-0">
                      {this.state.serviceID.at(0).service.name}
                    </Col>
                    <Col sm={2} className="p-0 remove">
                      <button
                        value={this.state.serviceID.at(0).service.id}
                        style={{ backgroundColor: `rgba (255, 255, 255, 0).` }}
                        onClick={(e) => this.removeItem(e)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td className="p-0">
                {this.state.serviceID.at(1) ? (
                  <Row className="p-0 row-item-selected">
                    <Col sm={9} className="p-0">
                      {this.state.serviceID.at(1).service.name}
                    </Col>
                    <Col sm={2} className="p-0 remove">
                      <button
                        value={this.state.serviceID.at(1).service.id}
                        style={{ backgroundColor: `rgba (255, 255, 255, 0).` }}
                        onClick={(e) => this.removeItem(e)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td className="p-0">
                {this.state.serviceID.at(2) ? (
                  <Row className="p-0 row-item-selected">
                    <Col sm={9} className="p-0">
                      {this.state.serviceID.at(2).service.name}
                    </Col>
                    <Col sm={2} className="p-0 remove">
                      <button
                        value={this.state.serviceID.at(2).service.id}
                        onClick={(e) => this.removeItem(e)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
              </td>
            </tr>
          </tbody>
        </Table>
        <p style={{ color: "red", textAlign: `center` }}>
          {/* {msg.numServiceSelected} */}
          {this.state.validateMsg.numServiceSelected}
        </p>
        <p style={{ color: "red", textAlign: `center` }}>{msg.serviceID}</p>
      </>
    );
    // return this.state.serviceID.map((item, index) => (
    //   <ul
    //     style={{ borderRadius: `10px` }}
    //     key={item.service.id}
    //     className="detail"
    //   >
    //     <li className="service">
    //       <p style={{ padding: ` 10px 20px` }}>{item.service.name}</p>
    //     </li>

    //     <li className="remove">
    //       <button value={item.service.id} onClick={(e) => this.removeItem(e)}>
    //         <FontAwesomeIcon icon={faXmark} />
    //       </button>
    //     </li>
    //   </ul>
    // ));
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
    console.log(err);
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
          alert("Đặt lịch thành công");
          console.log("Đặt lịch thành công");
          window.location.replace("/");
          return <Toast />;
        })
        .catch(console.error());
    } else {
      // alert(this.state.validateMsg);
      alert("Đặt lịch không thành công");
      console.log("Đặt lịch không thành công");
    }
  }

  async validateAll() {
    let flag = false;
    if (this.state.serviceID.length === 0) {
      msg.serviceID = "Vui lòng chọn loại dịch vụ";
      console.log(msg.serviceID);
      flag = true;
    }
    if (this.state.date.length === 0) {
      msg.date = "Vui lòng chọn thời gian bạn đến";
      console.log(msg.date);
      flag = true;
    }

    if (this.state.serviceID.length > 3) {
      msg.numServiceSelected = "Số lượng dịch vụ tối đa là 3";
      flag = true;
    }

    await this.setState({
      validateMsg: msg,
    });
    console.log(msg);
    // console.log("this.stage.validateMsg");
    // console.log(this.stage.validateMsg);
    console.log(flag);
    return flag;
  }

  async componentDidMount() {
    await ServiceTypeList.getSericeType()
      .then((res) => {
        this.setState({
          branchArr: res.data.branchList,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("this.state.branchArr");
    // console.log(this.state.branchArr);
    if (this.state.displayChoose === true) {
      document.getElementById("popup").style.display = "block";
      document.getElementById("page").style.width = "1920px";
    } else {
      document.getElementById("popup").style.display = "none";
      document.getElementById("page").style.width = "0px";
    }
  }

  ShowAddress() {
    return (
      <div className="address">
        <h4>Địa chỉ bạn chọn</h4>
        <p style={{ marginLeft: `20px` }}>
          {this.state.branch.name} : {this.state.address}
        </p>
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
          address:
            res.data.branch.district.name +
            ", " +
            res.data.branch.district.province.name,
        });
      });
    console.log(this.state.serviceTypeArr);
    document.getElementById("popup").style.display = `none`;
    document.getElementById("page").style.display = `none`;
  }

  getSlot() {
    const API = "http://localhost:8080/rade/patient/appointment/check-doctor";
    console.log(this.state.doctorID);
    console.log(this.state.date);
    const data = {
      doctor_id: this.state.doctorID,
      date: this.state.date,
      branch_id: this.state.branch.id,
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
      <div id="appointment-page">
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
                        style={{ borderRadius: `20px` }}
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
                        style={{ borderRadius: `20px` }}
                        name={item.service.id}
                        value={item.service.name}
                        onClick={(e) => {
                          msg.numServiceSelected = "";
                          console.log(this.state.serviceID.length);
                          if (this.state.serviceID.length < 3) {
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
                          } else {
                            msg.numServiceSelected =
                              "Chỉ được chọn tối đa 3 dịch vụ";
                            this.setState({
                              validateMsg: msg,
                            });
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

            {/* dịch vụ đã chọn */}
            <div className=" service">
              <h4>Dịch vụ đã chọn</h4>
            </div>
            <div className="service-selected">
              {/* <div id="border-bottom"></div> */}

              {this.ShowServiceSelected()}
            </div>

            {/* dịch vụ đã chọn */}

            <div className="infor-appointment">
              {this.ShowAddress()}
              <div className="doctor">
                <div className="doctor-select">
                  <h4>Chọn bác sĩ</h4>
                  <select
                    style={{ borderRadius: `10px` }}
                    onChange={(e) => this.changDoctor(e)}
                  >
                    <option value={0}>Chọn bác sĩ</option>
                    {this.MapDoctor()}
                  </select>
                  <span>
                    <p>{msg.doctorID}</p>
                  </span>
                </div>
              </div>
              {/* time */}
              <div className="time">
                <div style={{ display: `flex`, justifyContent: `flex-start` }}>
                  <h4 style={{ fontSize: `25px` }}>Chọn thời gian bạn đến</h4>
                  <h4 style={{ color: "red", paddingLeft: 0 }}>*</h4>{" "}
                </div>
                <div
                  style={{
                    textAlign: "left",
                    paddingLeft: `20px`,
                    marginLeft: `20px`,
                  }}
                >
                  <input
                    style={{
                      border: `1px solid black`,
                      width: `200px`,
                      borderRadius: `10px`,
                    }}
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
                  <span>
                    <p
                      style={{
                        color: "red",
                        textAlign: `left`,
                      }}
                    >
                      {msg.date}
                    </p>
                  </span>
                </div>
                <div className="slot" style={{ textAlign: `left` }}>
                  <h4>Chọn giờ làm việc</h4>
                  <select
                    style={{ border: `1px solid black`, borderRadius: `10px` }}
                    onChange={async (e) => {
                      await this.setState({
                        shift: e.currentTarget.value,
                      });
                    }}
                    defaultValue="Chọn giờ"
                  >
                    <option disabled>Chọn giờ</option>
                    {slot.map((item) => {
                      if (this.state.slotSelected.indexOf(item.id) > -1) {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.value}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
              </div>
              {/* time */}

              {/* <BookDrivingSlot /> */}
              <div className="appointmet-btn">
                <button onClick={(e) => this.handleBooking(e)}>Đặt</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
