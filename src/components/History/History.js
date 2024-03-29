import { Table, Row, Col, Container, Button } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { autocompleteClasses } from "@mui/material";
import { toast } from "react-toastify";
import { Redirect } from "react-router";
import { yellow } from "@mui/material/colors";
import LoginForm from "../Login-Logout/Login";
const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
const API_POST_HISTORY =
  "http://localhost:8080/rade/patient/appointment/history";
const API_GET_HISTORY_DETAIL =
  "http://localhost:8080/rade/patient/appointment-detail/history";
const API_CANCEL_APPOINTMENT =
  "http://localhost:8080/rade/patient/appointment/cancel/";
const API_SEND_FEEDBACK = "http://localhost:8080/rade/patient/feedback/send";

export default function History() {
  const [page, setPage] = useState(1);
  const [listAppointment, setListAppointment] = useState([]);
  const [listHistoryDetail, setHistoryDetail] = useState([]);
  const [contentFeedback, setContentFeedback] = useState("");
  const [id_appointment, setIDAppointmnet] = useState(0);
  const [displayNextbutton, setDisplayNextButton] = useState(true);
  useEffect(() => {
    var data = {
      phone: phone,
      page: page,
    };
    axios
      .post(API_POST_HISTORY, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        setListAppointment(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        if (error.message.indexOf("401") > -1) {
          document.getElementById("notify-login").style.display = "block";
        }
      });

    var nextData = {
      phone: phone,
      page: page + 1,
    };
    axios
      .post(API_POST_HISTORY, nextData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res.data.next");
        console.log(res.data.length === 0);
        if (res.data.length === 0) {
          setDisplayNextButton(false);
        } else {
          setDisplayNextButton(true);
        }
      });
    if (id_appointment !== 0) {
      axios
        .get(API_GET_HISTORY_DETAIL + "/" + id_appointment, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setHistoryDetail(res.data);
        });
    }
  }, [page, id_appointment]);
  const ShowDetail = (props) => {
    return (
      <>
        <div>
          {listAppointment.map((item, key) => {
            if (item.id == id_appointment) {
              return (
                <>
                  <Row
                    xs="auto"
                    lg="auto"
                    className="justify-content-start text-start ms-3 p-1"
                  >
                    <Col xs="auto" lg={2} className="text-start">
                      <label
                        style={{ textAlign: `left`, color: `black` }}
                        className="p-0 fw-bold"
                      >
                        Chi nhánh:{" "}
                      </label>
                    </Col>
                    <Col xs="auto" lg={10}>
                      <p className="m-0 text-start text-break">
                        {item.branch.name} - {item.branch.district.name},{" "}
                        {item.branch.district.province.name}
                      </p>
                    </Col>
                  </Row>
                  <Row
                    xs="auto"
                    lg="auto"
                    className="justify-content-start ms-3 p-1"
                  >
                    <Col xs="auto" lg={2} className="text-start">
                      <label
                        style={{ textAlign: `left`, color: `black` }}
                        className="p-0 fw-bold"
                      >
                        Bác sĩ:{" "}
                      </label>
                    </Col>
                    <Col xs="auto" lg={10}>
                      <p className="m-0 text-start">{item.doctor.name}</p>
                    </Col>
                  </Row>
                  <Row
                    xs="auto"
                    lg="auto"
                    className="justify-content-start ms-3 p-1"
                  >
                    <Col xs="auto" lg={2} className="text-start">
                      <label
                        style={{ textAlign: `left`, color: `black` }}
                        className="p-0 fw-bold"
                      >
                        Ngày & Giờ:{" "}
                      </label>
                    </Col>
                    <Col xs="auto" lg={10}>
                      <p className="m-0 text-start">
                        {item.appointment_date} - {item.appointment_time}
                      </p>
                    </Col>
                  </Row>
                </>
              );
            }
          })}
          {/* <label>Chi nhánh: {historySelected.branch.name}</label> */}
        </div>
        <Table
          bordered
          hover
          id="table-history-detail"
          className="table-history-detail bordered"
        >
          <thead>
            <tr>
              <th>Dịch vụ</th>
              <th>Giá</th>
              <th>Khuyến mãi</th>
            </tr>
          </thead>
          <tbody>
            {listHistoryDetail.map((item) => {
              return (
                <tr>
                  <td>{item.service.name}</td>
                  <td>
                    {item.service.min_price}VNĐ ~ {item.service.max_price}VNĐ
                  </td>
                  <td>
                    {item.discount
                      ? item.discount.percentage + "%"
                      : "Không có khuyến mãi"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  };
  const ViewHistory = () => (
    <div>
      <Table bordered hover className="table-history bordered">
        <thead>
          <tr>
            <th>Ngày & Giờ</th>
            <th>Chi nhánh</th>
            <th>Bác sĩ</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listAppointment.map((item) => {
            let val;
            return (
              <tr key={item.id} style={{ alignItems: `center` }}>
                <td style={{ alignItems: `center` }}>
                  <Row className="p-0 ">
                    <p>
                      {item.appointment_date}
                      <br />
                      {item.appointment_time}
                    </p>
                  </Row>
                </td>
                <td style={{ alignItems: `center` }}>
                  <Row className="justify-content-center p-0">
                    <p>{item.branch.name}</p>
                  </Row>
                </td>
                <td style={{ width: `17vw` }}>
                  <Row className="justify-content-center p-0">
                    {item.doctor.name}
                  </Row>
                </td>
                <td style={{ width: `15vw` }}>
                  <Row className="row-appointment-history p-0">
                    <Col style={{ textAlign: `center` }} className="">
                      {item.status === 0 ? (
                        <p style={{ color: `blue` }}>Chờ hoàn thành</p>
                      ) : (
                        ""
                      )}
                      {item.status === 1 ? (
                        <p style={{ color: `green` }}>Đã hoàn thành</p>
                      ) : (
                        ""
                      )}
                      {item.status === 3 ? (
                        <p style={{ color: `red` }}>Đã hủy</p>
                      ) : (
                        ""
                      )}
                      {item.status === 4 ? (
                        <p style={{ color: `red` }}>Chờ hoàn thành</p>
                      ) : (
                        ""
                      )}
                      {item.status === 2 ? (
                        <p style={{ color: `red` }}>Không hoàn thành</p>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                </td>
                <td style={{ width: `17vw` }}>
                  <Row
                    className="row-button justify-content-end p-0"
                    style={{ justifyContent: "flex-end" }}
                    sm="auto"
                    lg="auto"
                  >
                    {item.status === 0 ? (
                      <Col className="cancel-button p-0" lg={6}>
                        <button
                          style={{ width: `auto` }}
                          value={item.id}
                          onClick={(e) => CancelAppointment(e)}
                        >
                          Sửa
                        </button>
                      </Col>
                    ) : (
                      ""
                    )}
                    {item.status === 1 ? (
                      <Col className="feedback-button p-0" lg={6}>
                        <button
                          style={{ width: `auto` }}
                          value={item.id}
                          onClick={(e) => {
                            setIDAppointmnet(e.target.value);
                            AddFeedback(e);
                          }}
                        >
                          Phản hồi
                        </button>
                      </Col>
                    ) : (
                      ""
                    )}

                    <Col lg={6} className="p-0">
                      <button
                        type="button"
                        value={item.id}
                        style={{ textAlign: `right`, width: `auto` }}
                        onClick={(e) => {
                          console.log(item);
                          show(e);
                        }}
                      >
                        Chi tiết
                      </button>
                    </Col>
                  </Row>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Row className="next-page d-flex justify-content-center">
        {page === 1 ? (
          <Col className="p-1">
            <button></button>
          </Col>
        ) : (
          <Col className="p-1">
            <button
              onClick={() => {
                setPage(page - 1);
              }}
            >
              <FontAwesomeIcon icon={faCaretLeft} />
            </button>
          </Col>
        )}
        <Col className="p-1">
          <p>{page}</p>
        </Col>
        {displayNextbutton ? (
          <Col className="p-1">
            <button
              onClick={() => {
                setPage(page + 1);
              }}
            >
              <FontAwesomeIcon icon={faCaretRight} />
            </button>
          </Col>
        ) : (
          <Col className="p-1">
            <button></button>
          </Col>
        )}
      </Row>
    </div>
  );
  const CancelAppointment = (e) => {
    axios
      .get(API_CANCEL_APPOINTMENT + e.target.value, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => window.location.reload());
  };

  const EditAppointment = (e) => {};

  const AddFeedback = (e) => {
    document.getElementById("add-feeback-page").style.display = "block";
  };
  const show = (e) => {
    setIDAppointmnet(e.target.value);

    document.getElementById("page-history-cover").style.display = "block";
  };

  const clickToLogin = () => {
    document.getElementById("notify-login-page").style.display = "none";
    document.getElementById("login-page").style.display = "block";
  };

  const submitFeedback = () => {
    const data = {
      feedbackDTO: {
        appointment_id: id_appointment,
        content: contentFeedback,
      },
      phone: phone,
    };
    // console.log(data);
    axios
      .post(API_SEND_FEEDBACK, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Bạn đã phản hồi thành công. Cảm ơn sự đóng góp của bạn");
      })
      .catch((error) => {
        if (error.message.indexOf("404") > -1) {
          toast.error("Lịch đặt không tồn tại");
        }
      });
    document.getElementById("add-feeback-page").style.display = "none";
  };

  return (
    <div>
      <div className="history-header">
        <h3>Thông tin lịch hẹn của bạn</h3>
      </div>
      <div
        id="add-feeback-page"
        onClick={() => {
          // document.getElementById("add-feeback-page").style.display = "none";
        }}
      >
        <div id="add-feedback">
          <Row>
            <h4 style={{ color: `#0b0b90 `, fontWeight: `bold` }}>
              Gửi phản hồi về dịch vụ
            </h4>
          </Row>
          <div
            style={{ margin: `auto` }}
            className="  flex-row justify-content-center"
          >
            <Col
              className="d-flex justify-content-start"
              style={{ marginTop: `10px` }}
            >
              <h5 style={{ padding: `10px 10px 8px 20px` }}>
                Những dịch vụ mà bạn đã chọn
              </h5>
            </Col>
            <ShowDetail />
          </div>

          <Col sm="auto" lg="auto" className="justify-content-center">
            <Col
              className="d-flex justify-content-start"
              style={{ marginTop: `10px` }}
            >
              <h5 style={{ padding: `10px 10px 8px 20px` }}>
                Bạn cảm thấy như thế nào về dịch vụ của chúng tôi?
              </h5>
            </Col>
            <textarea
              placeholder="Nhập phản hồi của bạn"
              style={{
                width: `100%`,
                height: `15vh`,
                fontSize: `18px`,
                padding: `5px`,
              }}
              onChange={(e) => {
                setContentFeedback(e.target.value);
              }}
            ></textarea>
            <Row className="justify-content-center">
              <button
                style={{ width: `13vw` }}
                onClick={() => submitFeedback()}
              >
                Gửi phản hồi
              </button>
            </Row>
          </Col>
          {/* button close  */}
          <div id="icon-close">
            <button
              onClick={() => {
                document.getElementById("add-feeback-page").style.display =
                  "none";
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      </div>
      {/* notify login  */}
      <div id="notify-login">
        <div
          id="notify-login-page"
          style={{ width: `50vw`, textAlign: "center" }}
        >
          <Row
            sm="auto"
            md="auto"
            className="justify-content-center"
            style={{ padding: `20px 50px 10px 50px` }}
          >
            <Col sm={1}>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ color: `#faad14`, fontSize: `30px` }}
              />
            </Col>
            <Col sm={5} className="p-0">
              <p style={{ width: `auto` }}>Bạn phải đăng nhập để xem lịch sử</p>
            </Col>
          </Row>
          <Row lg={1} className="justify-content-center p-0">
            <Col lg={4}>
              <Button onClick={() => clickToLogin()}>Nhấn để đăng nhập</Button>
            </Col>
          </Row>
        </div>
        <div id="login-page">
          <LoginForm />
        </div>
      </div>
      {/* History detail  */}
      <div
        id="page-history-cover"
        onClick={() => {
          document.getElementById("page-history-cover").style.display = "none";
        }}
      >
        <div id="page-history">
          <div id="popup-history">
            <ShowDetail />
          </div>
          <div id="icon-close">
            <button
              onClick={() => {
                document.getElementById("page-history-cover").style.display =
                  "none";
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      </div>

      <ViewHistory />
    </div>
  );
}
