import { Table, Row, Col, Container, Button } from "reactstrap";
import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
const API_POST_HISTORY =
  "http://localhost:8080/rade/patient/appointment/history";
const API_GET_HISTORY_DETAIL =
  "http://localhost:8080/rade/patient/appointment-detail/history";
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
export default function History() {
  const [page, setPage] = useState(1);
  const [listAppointment, setListAppointment] = useState([]);
  const [listHistoryDetail, setHistoryDetail] = useState([]);
  const [id_appointment, setIDAppointmnet] = useState(0);
  const [displayNextbutton, setDisplayNextButton] = useState(true);
  useEffect(() => {
    console.log("render");
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
    );
  };
  const ViewHistory = () => (
    <div>
      <Table bordered hover className="table-history bordered">
        <thead>
          <tr>
            <th>Ngày&Giờ</th>
            <th>Chi nhánh</th>
            <th>Bác sĩ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listAppointment.map((item) => {
            let val;
            slot.map((element) => {
              if (element.id === item.shift) {
                val = element.value;
              }
            });
            return (
              <tr>
                <td>
                  <Row className="p-0">
                    <Col>
                      <p>
                        {item.date}
                        <br />
                        {val}
                      </p>
                    </Col>
                  </Row>
                </td>
                <td>{item.branch.name}</td>
                <td>{item.doctor.name}</td>
                <td>
                  <Row className="row-appointment-history p-0">
                    <Col style={{ textAlign: `right` }} className="">
                      {item.status === 0 ? (
                        <p style={{ color: `blue` }}>Chờ xét duyệt</p>
                      ) : (
                        ""
                      )}
                      {item.status === 1 ? (
                        <p style={{ color: `green` }}>Đã hoàn thành</p>
                      ) : (
                        ""
                      )}
                      {item.status === 2 ? (
                        <p style={{ color: `red` }}>Đã hủy</p>
                      ) : (
                        ""
                      )}
                      {/* <Popup
                      modal
                      trigger={
                        <button
                          type="button"
                          value={item.id}
                          style={{ textAlign: `right` }}
                          onClick={(e) => show(e)}
                        >
                          Chi tiết
                        </button>
                      }
                    >
                      <ShowDetail id={item.id} />
                    </Popup> */}
                      <button
                        type="button"
                        value={item.id}
                        style={{ textAlign: `right` }}
                        onClick={(e) => show(e)}
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
  const show = (e) => {
    setIDAppointmnet(e.target.value);

    document.getElementById("page-history-cover").style.display = "block";
  };

  return (
    <div>
      <div className="history-header">
        <h3>Thông tin lịch hẹn của bạn</h3>
      </div>
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
