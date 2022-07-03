import "./style.css";
import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ServiceList from "../../getData/ServiceList";
import ServiceTypeList from "../../getData/ServiceTypeList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faLocationArrow,
  faLocationCrosshairs,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Table, Row, Col, Container, Button } from "reactstrap";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
// import { withNavigation } from "react-navigation";
const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
const API_INPUT_BRANCH = "http://localhost:8080/rade/patient/appointment";
const API_GET_TIME =
  "http://localhost:8080/rade/patient/appointment/check-doctor";
const API_GET_SERVICE_OF_SERVICETYPE =
  "http://localhost:8080/rade/patient/service/";
const API_GET_BRANCH = "http://localhost:8080/rade/patient/branch";
const API_GET_RECOMMEND_BRANCH =
  "http://localhost:8080/rade/patient/branch/recommend";
const API_CHECK_ACCOUNT = "http://localhost:8080/rade/patient/account/";
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
      serviceIdList: [],
      doctorID: 0,
      distritID: "",
      cusName: "",
      phone: phone,
      date: "",
      branchArr: [],
      shift: "",
      //
      validateMsg: {},
      numServiceSelected: 0,
      displayChoose: true,
      // today: this.getCurrentDate(),
      // maxday: this.getMaxDate(),
      slotSelected: [],
      address: "",
      recommentBranch: [],
    };
    this.changeService = this.changeService.bind(this);
    this.MapDoctor = this.MapDoctor.bind(this);
    this.getSlot = this.getSlot.bind(this);
  }

  getCurrentDate(separator = "") {
    let newDate = new Date();
    // newDate.setDate(newDate.getDate());
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    console.log(
      `${year}${separator}-${month < 10 ? `0${month}` : `${month}`}-${
        date < 10 ? `0${date}` : `${date}`
      }`
    );
    this.setState({
      today: `${year}${separator}-${month < 10 ? `0${month}` : `${month}`}-${
        date < 10 ? `0${date}` : `${date}`
      }`,
    });
    return `${year}${separator}-
    ${month < 10 ? `0${month}` : `${month}`}-${
      date < 10 ? `0${date}` : `${date}`
    }`;
  }

  getMaxDate(separator = "") {
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + 7);
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    this.setState({
      maxday: `${year}${separator}-${month < 10 ? `0${month}` : `${month}`}-${
        date < 10 ? `0${date}` : `${date}`
      }`,
    });
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
    let id = e.currentTarget.value;
    ServiceList.getSericeType(id)
      .then((res) => this.setState({ serviceArr: res.data }))
      .catch((error) => {
        if (error.message.indexOf("401" > -1)) {
          // window.location.replace("/");
        }
      });
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
                      {this.state.serviceID.at(0).name}
                    </Col>
                    <Col sm={2} className="p-0 remove">
                      <button
                        value={this.state.serviceID.at(0).id}
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
                      {this.state.serviceID.at(1).name}
                    </Col>
                    <Col sm={2} className="p-0 remove">
                      <button
                        value={this.state.serviceID.at(1).id}
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
                      {this.state.serviceID.at(2).name}
                    </Col>
                    <Col sm={2} className="p-0 remove">
                      <button
                        value={this.state.serviceID.at(2).id}
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
  }

  async removeItem(e) {
    const valueRemove = e.currentTarget.value;
    var items = [];
    var serviveIDSelected = [];
    this.state.serviceID.map((item) => {
      if (!(item.id === parseInt(valueRemove))) {
        items = [...items, item];
      }
    });

    this.state.serviceIdList.map((item) => {
      if (!(item === parseInt(valueRemove))) {
        serviveIDSelected = [...serviveIDSelected, item];
      }
    });

    await this.setState({
      serviceID: items,
      numServiceSelected: this.state.numServiceSelected - 1,
      serviceIdList: serviveIDSelected,
    });
    console.log(this.state.serviceIdList);
    return this.getSlot();
  }

  handleBooking(e) {
    var err = this.validateAll();
    console.log("đặt lịch");
    console.log(err);
    if (err === false) {
      console.log("data");
      const data = {
        appointmentDTO: {
          branchId: this.state.branch.id,
          doctorId: this.state.doctorID,
          date: this.state.date,
          time: this.state.shift,
        },

        phone: phone,
        serviceIdList: this.state.serviceIdList,
      };

      console.log(data);

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
          toast.success("Đặt lịch thành công");
          window.location.replace("/user/history");
        })

        .catch((error) => {
          if (error.message.indexOf("401") > -1) {
            window.location.replace("/");
          }
          if (error.message.indexOf(406) > -1) {
            toast.warn("Bạn vui lòng nhập đầy đủ thông tin");
            // window.location.replace("/history");
          }
          if (error.message.indexOf("410") > -1) {
            toast.warn("Bạn có lịch chưa hoàn thành");
          }
        });
    } else {
      // alert(this.state.validateMsg);
      toast.error("Đặt lịch không thành công");
    }
  }

  validateAll() {
    msg = {};
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

    this.setState({
      validateMsg: msg,
    });
    // console.log("this.stage.validateMsg");
    // console.log(this.stage.validateMsg);
    return flag;
  }

  checkAccount() {
    axios
      .get(API_CHECK_ACCOUNT + phone, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        if (error.message.indexOf("406") > -1) {
          toast.warn("Tài khoản bạn không có trong hệ thống");
        } else if (error.message.indexOf("410") > -1) {
          localStorage.setItem("notDone", true);
          return window.location.replace("/user/history");
        } else if (error.message.indexOf("423") > -1) {
          toast.warn("Tài khoản của bạn đã bị đưa vào danh sách đen");
        }
      });
  }

  async componentDidMount() {
    this.checkAccount();
    this.getCurrentDate();
    this.getMaxDate();
    const data = {
      phone: phone,
    };
    await axios
      .post(API_GET_BRANCH, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        this.setState({
          branchArr: res.data,
        });
      })
      .catch((error) => {
        if (error.message.indexOf("401" > -1)) {
          console.log(error);
          // window.location.replace("/");
        }
      });

    axios
      .post(API_GET_RECOMMEND_BRANCH, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        this.setState({
          recommentBranch: res.data,
        });
      });
    // console.log("this.state.branchArr");
    // console.log(this.state.branchArr);
    if (this.state.displayChoose === true) {
      document.getElementById("page").style.display = "block";
      // document.getElementById("page").style.width = "1920px";
    } else {
      document.getElementById("page").style.display = "none";
      // document.getElementById("page").style.width = "0px";
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
            {this.state.branchArr.map((item, key) => (
              <button
                style={{ position: `relative` }}
                key={item.id}
                value={item.id}
                className="branch-item"
                onClick={(e) => this.HandleClick(e)}
              >
                <>
                  {this.state.recommentBranch.at(key) !== 0 ? (
                    <div className="hint">
                      <FontAwesomeIcon icon={faLocationArrow} />
                      {` `}Gợi ý
                    </div>
                  ) : (
                    ""
                  )}
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
                        <p
                          className="m-0 text-start"
                          style={{ fontWeight: `bold` }}
                        >
                          Địa chỉ:
                        </p>
                        <p className="m-0" style={{ marginLeft: `10px` }}>
                          {item.district.name}, {item.district.province.name}
                        </p>
                      </div>
                      <div>
                        <p
                          className="m-0 text-start"
                          style={{ fontWeight: `bold` }}
                        >
                          Thời gian làm việc:
                        </p>
                        <p className="m-0" style={{ marginLeft: `10px` }}>
                          {item.openTime}-{item.closeTime}
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
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message.indexOf(401) > -1) {
          localStorage.clear();
          window.location.replace("/");
        }
      });
    console.log(this.state.serviceTypeArr);
    // document.getElementById("popup").style.display = `none`;
    document.getElementById("page").style.display = `none`;
  }

  async getSlot() {
    console.log(
      this.state.serviceIdList.length + "this.state.serviceIdList.length"
    );
    if (this.state.serviceIdList.length === 0 || this.state.date.length === 0) {
      this.setState({
        slotSelected: [],
      });
      return;
    }
    const data = {
      branchId: this.state.branch.id,
      doctorId: this.state.doctorID,
      date: this.state.date,
      serviceId: this.state.serviceIdList,
    };

    await axios
      .post(API_GET_TIME, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        this.setState(
          {
            slotSelected: res.data,
          },
          () => {
            // console.log(res.data);
            // console.log("this.state.slotSelected");
            // console.log(this.state.slotSelected);
          }
        );
      })
      .catch((error) => {
        // console.log(error);
        if (error.message.indexOf("401") > -1) {
          // window.location.replace("/");
        }
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
              <ul className="m-0  ps-0">
                <li className="service-type-item">Loại dịch vụ</li>
                <li className="service-item">Dịch vụ</li>
              </ul>
            </div>
            {/* thôngtin */}
            <div>
              <ul className="service-info m-0 ps-0">
                <li style={{ padding: 0 }} className="service-type-item">
                  {this.state.serviceTypeArr.map((item) => (
                    <li
                      key={item.id}
                      className="service-type-item-small m-0 p-1"
                    >
                      <button
                        className="text-center"
                        key={item.id}
                        style={{ borderRadius: `20px` }}
                        value={item.id}
                        onClick={(e) => this.changeService(e)}
                      >
                        <p className="m-0">{item.name}</p>
                      </button>
                    </li>
                  ))}
                </li>
                <li style={{ padding: 0 }} className="service-item">
                  {this.state.serviceArr.map((item) => (
                    <li key={item.id} className="service-item-small m-0 p-1">
                      <button
                        style={{ borderRadius: `20px` }}
                        name={item.id}
                        value={item.name}
                        onClick={async (e) => {
                          msg.numServiceSelected = "";
                          console.log(this.state.serviceID.length);
                          if (this.state.serviceID.length < 3) {
                            let flag = false;
                            this.state.serviceID.map((item) => {
                              if (item.name === e.currentTarget.value) {
                                flag = true;
                              }
                            });
                            if (!flag) {
                              await this.setState({
                                serviceID: [...this.state.serviceID, item],
                                serviceIdList: [
                                  ...this.state.serviceIdList,
                                  item.id,
                                ],
                                numServiceSelected:
                                  this.state.numServiceSelected + 1,
                              });
                            } else {
                              toast.error("Dịch vụ này bạn đã chọn");
                            }
                            if (this.state.date.length !== 0) {
                              this.getSlot();
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
                        <p className="m-0">{item.name}</p>
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

              {/* Chọn bác sĩ  */}
              <div className="doctor">
                <div className="doctor-select">
                  <h4>Chọn bác sĩ</h4>
                  <select
                    className="select-option__doctor"
                    style={{
                      borderRadius: `10px`,
                      width: `25vw`,
                    }}
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
                      width: `25vw`,
                      borderRadius: `10px`,
                    }}
                    type="date"
                    min={this.state.today}
                    max={this.state.maxday}
                    onChange={async (e) => {
                      var day = new Date(
                        e.currentTarget.valueAsDate
                      ).getUTCDay();
                      console.log(day);
                      if (
                        [0].includes(e.currentTarget.valueAsDate.getUTCDay())
                      ) {
                        toast.warn(
                          "Bạn vui lòng không được chọn ngảy Chủ Nhật. Bạn vui lòng chọn ngày khác"
                        );
                        await this.setState({
                          date: "",
                        });
                      } else {
                        await this.setState({
                          date: e.currentTarget.valueAsDate,
                        });
                        this.getSlot();
                      }
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
                  <Row lg="auto" style={{ padding: `10px 50px ` }}>
                    {this.state.slotSelected.map((item) => {
                      let tmp = item.option.split("-");
                      return (
                        <Col
                          lg={2}
                          style={{ backgroundColor: `white`, color: `black` }}
                          className="btn-select-time"
                        >
                          <Button
                            onClick={() => {
                              this.setState({
                                shift: item.option,
                              });
                            }}
                          >
                            {tmp[0]}
                          </Button>
                        </Col>
                      );
                    })}
                  </Row>
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
