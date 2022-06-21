import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Col, Row, Table } from "reactstrap";
import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
const API_GET_APPOINTMENT_TO_UPDATE =
  "http://localhost:8080/rade/patient/appointment/load-update";
const API_GET_DISCOUNT_FOLLOW_SERVICEID =
  "http://localhost:8080/rade/discount/";

export default function UpdateAppointment() {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [appointment, setAppointment] = useState();
  const [discount, setDiscount] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const location = useLocation();

  const [doctorSelected, setDoctorSelected] = useState(null);
  useEffect(() => {
    getAppointment();
  }, []);

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
    console.log("result.data", result.data);
    if (result) {
      setServiceList(result.data.serviceList);
      setAppointment(result.data.appointment);
      setDoctorList(result.data.doctorList);
      setDoctorSelected(result.data.appointment.doctor);
    }

    result.data.serviceList.map((item) => {
      setTimeout(async () => {
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
      }, 1);
    });
  };
  // đóng mở dropdown
  const toggle = async () => {
    await setIsOpen(!isOpen);
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
                  Chọn thời gian:
                </h5>
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
