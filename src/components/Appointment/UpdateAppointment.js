import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Col, Row, Table, Button } from "reactstrap";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { toast } from "react-toastify";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
const API_GET_APPOINTMENT_TO_UPDATE =
  "http://localhost:8080/rade/patient/appointment/load-update";
const API_GET_DISCOUNT_FOLLOW_SERVICEID =
  "http://localhost:8080/rade/discount/";
const API_GET_TIME_POST =
  "http://localhost:8080/rade/patient/appointment/check-doctor";
const API_UPDATE_APPOINTMENT =
  "http://localhost:8080/rade/patient/appointment/update";
export default function UpdateAppointment() {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [appointment, setAppointment] = useState();
  const [discount, setDiscount] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [date, setDate] = useState("");
  const [timeCome, setTimeCome] = useState("");
  const [doctorSelected, setDoctorSelected] = useState(null);
  const [serviceIdList, setServiceIdList] = useState([]);
  //
  const [slotSelected, setSlotSelected] = useState([]);

  const today = (separator = "") => {
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + 1);
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}-${
      month < 10 ? `0${month}` : `${month}`
    }-${separator}${date}`;
  };

  const maxday = (separator = "") => {
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + 7);
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}-${
      month < 10 ? `0${month}` : `${month}`
    }-${separator}${date}`;
  };
  const location = useLocation();
  const navigate = useNavigate();
  const getSlot = async (e) => {
    // if (date === null || date.length === 0) {
    //   toast.warn("Bạn vui lòng chọn ngày");
    //   return;
    // }
    setSlotSelected([]);
    const data = {
      appointmentId: appointment.id,
      branchId: 1,
      doctorId: doctorSelected.id,
      date: date,
      serviceId: serviceIdList,
    };
    console.log("data", data);
    const result = await axios
      .post(API_GET_TIME_POST, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        // console.log(error);
        if (error.message.indexOf("401") > -1) {
          // window.location.replace("/");
        }
      });

    if (result.data) {
      setSlotSelected(result.data);
    } else {
      setSlotSelected([]);
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);

  useEffect(() => {
    getSlot();
  }, [date, doctorSelected]);

  const getAppointment = async () => {
    console.log("render");
    const data = {
      phone: phone,
      appointmentId: location.state.id,
    };
    let tmpDiscount = [];
    //lấy thông tin appointmetnt
    const result = await axios.post(API_GET_APPOINTMENT_TO_UPDATE, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("result.data", result);
    // console.log("result.data.status", result.status);
    if (result) {
      setServiceList(result.data.serviceList);
      setAppointment(result.data.appointment);
      setDoctorList(result.data.doctorList);
      setDoctorSelected(result.data.appointment.doctor);
      setDate(result.data.appointment.appointmentDate);
      setTimeCome(result.data.appointment.appointmentTime);
    }
    let tmpServiceList = [];
    result.data.serviceList.map(async (item, key) => {
      tmpServiceList = [...tmpServiceList, item.id];
      setServiceIdList(tmpServiceList);
      const discountResult = await axios.get(
        API_GET_DISCOUNT_FOLLOW_SERVICEID + item.id
      );
      let x = {};
      if (discountResult) {
        if (
          discountResult.data.percentage !== null ||
          discountResult.data.percentage !== undefined
        ) {
          x.percentage = discountResult.data.percentage + "%";
          x.id = item.id;
          x.name = item.name;
        }
        tmpDiscount = [...tmpDiscount, x];
        //   console.log(tmpDiscount);
        setDiscount(tmpDiscount);
      }
    });
  };
  // đóng mở dropdown
  const toggle = async () => {
    await setIsOpen(!isOpen);
  };

  const submitUpdateAppointment = async () => {
    const dataUpdate = {
      appointmentDTO: {
        id: appointment.id,
        branchId: appointment.branch.id,
        doctorId: doctorSelected.id,
        date: date,
        time: timeCome,
      },

      phone: phone,
      serviceIdList: serviceIdList,
    };

    console.log(dataUpdate);
    const result = await axios
      .post(API_UPDATE_APPOINTMENT, dataUpdate, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error);
      });

    if (result.status === 200) {
      toast.success("Thay đổi lịch hẹn thành công");
      navigate("/history");
    } else {
    }
  };
  return (
    <>
      {appointment ? (
        <div>
          <div
            className="p-2 pt-4"
            style={{ color: `#0b0b90`, fontSize: `25px` }}
          >
            <h3>Cập nhật thông tin lịch hẹn</h3>
            <h3>{location.state.id}</h3>
          </div>
          <div>
            <Row className="justify-content-start p-0">
              <Col className="p-0" sm={3} lg={3}>
                <h5 className="text-start ps-5" style={{ color: "gray" }}>
                  Địa chỉ:
                </h5>
              </Col>
              <Col className="text-start" sm={9} lg={9}>
                <p>
                  {/* {appointment.map((item) => item.branch.name)} */}
                  {appointment.branch.name}-{appointment.branch.district.name},{" "}
                  {appointment.branch.district.province.name}
                </p>
              </Col>
            </Row>
            <Row>
              <h5 className="text-start ps-5" style={{ color: "gray" }}>
                Dịch vụ bạn đã chọn
              </h5>
            </Row>
            <Table bordered hover className="table-history bordered">
              <thead>
                <th>Dịch vụ</th>
                <th>Giá</th>
                <th>Khuyến mãi</th>
              </thead>
              <tbody>
                {serviceList.map((item, keyI) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        {item.minPrice}(VNĐ) ~ {item.maxPrice}(VNĐ)
                      </td>

                      {discount.map((e, key) => {
                        if (e.id === item.id) {
                          return (
                            <td>
                              {e.percentage === "undefined%"
                                ? "Không có khuyến mãi"
                                : e.percentage}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Row className="justify-content-start p-0">
              <Col className="p-0" sm="auto" lg={3}>
                <h5 className="text-start ps-5" style={{ color: "gray" }}>
                  Bác sĩ:
                </h5>
              </Col>
              <Col className="text-start" sm="auto" lg={3}>
                <Dropdown
                  isOpen={isOpen}
                  toggle={() => toggle()}
                  className="text-start"
                >
                  <DropdownToggle
                    className="text-center"
                    style={{
                      backgroundColor: `white`,
                      color: `black`,
                      width: `100%`,
                    }}
                    caret
                  >
                    {doctorSelected.name}
                  </DropdownToggle>
                  <DropdownMenu style={{ width: `100%` }}>
                    {doctorList.map((item, key) => {
                      return (
                        <DropdownItem
                          key={item.id}
                          onClick={() => {
                            setDoctorSelected(item);
                          }}
                        >
                          {item.name}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </Row>
            <Row className="justify-content-start p-0">
              <Col className="p-0" sm="auto" lg={3}>
                <h5 className="text-start ps-5" style={{ color: "gray" }}>
                  Chọn ngày:
                </h5>
              </Col>
              <Col lg={3}>
                <input
                  style={{
                    border: `1px solid black`,
                    borderRadius: `5px`,
                  }}
                  className="text-center"
                  type="date"
                  value={date}
                  pattern="\d{4}-\d{2}-\d{2}"
                  min={today()}
                  max={maxday()}
                  onChange={(e) => {
                    // var day = new Date(e.currentTarget.valueAsDate).getUTCDay();
                    if ([0].includes(e.currentTarget.valueAsDate.getUTCDay())) {
                      toast.warn(
                        "Bạn vui lòng không được chọn ngảy Chủ Nhật. Bạn vui lòng chọn ngày khác"
                      );
                      setDate("");
                    } else {
                      setDate(e.target.valueAsDate);
                      // getSlot(e);
                    }
                  }}
                />
              </Col>
              <Col className="d-flex">
                <h5 style={{ color: "gray" }}>Thời gian dự kiến: </h5>
                <p className="ps-3">{timeCome}</p>
              </Col>
            </Row>
            <Row>
              <Col className="p-0" sm="auto" lg={3}>
                <h5 className="text-start ps-5" style={{ color: "gray" }}>
                  Chọn thời gian:
                </h5>
              </Col>
              <Col>
                {" "}
                <div className="slot" style={{ textAlign: `left` }}>
                  <Row lg="auto">
                    {slotSelected.map((item) => {
                      let tmp = item.option.split("-");
                      return (
                        <Col
                          lg={2}
                          style={{ backgroundColor: `white`, color: `black` }}
                          className="btn-select-time"
                        >
                          <Button
                            // active
                            onClick={() => {
                              setTimeCome(item.option);
                            }}
                          >
                            {tmp[0]}
                          </Button>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-between ms-5 me-5" lg={12}>
              <Col lg={3}>
                <Row>
                  <Button onClick={() => submitUpdateAppointment()}>
                    Thay đổi
                  </Button>
                </Row>
              </Col>
              <Col lg={3} className="p-3">
                <Row>
                  <Button onClick={() => navigate("/history")}>
                    Hủy bỏ thay đổi
                  </Button>
                </Row>
              </Col>
              <Col lg={3}>
                <Row>
                  <Button>Hủy bỏ lịch hẹn</Button>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        console.log("appointment rỗng")
      )}
    </>
  );
}
