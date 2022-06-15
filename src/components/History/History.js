import { faCheckCircle, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListItem } from "@mui/material";
import { internal_resolveProps } from "@mui/utils";
import { Table, Row, Col, Container, Button } from "reactstrap";
import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
const API_POST_HISTORY =
  "http://localhost:8080/rade/patient/appointment/history";
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
        console.log(res);
        setListAppointment(res.data);
      })
      .then(() => {
        console.log("listAppointment");
        console.log(listAppointment);
      });
  }, [page]);
  const ShowDetail = (props) => (
    <div className="table-detail">
      <ul>
        <li className="table-header">
          <li className="col-1" style={{ flexBasis: `70%` }}>
            Dịch vụ
          </li>
          <li className="col-2" style={{ flexBasis: `30%` }}>
            Bác sĩ
          </li>
        </li>
        <div>
          <li>
            <li>gfdfg</li>
          </li>
          <li>
            <li>fdfds</li>
          </li>
        </div>
      </ul>
    </div>
  );
  const ViewHistory = () => (
    <Table hover className="table-history">
      <thead>
        <tr>
          <th>Ngày&Giờ</th>
          <th>Chi nhánh</th>
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
              <td>
                <Row className="row-appointment-history p-0">
                  <Col sm={9}>{item.branch.name}</Col>
                  <Col sm={3} style={{ textAlign: `right` }} className="">
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
                    <button style={{ textAlign: `right` }}>Chi tiết</button>
                  </Col>
                </Row>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  const Show = () => {};
  return (
    <div>
      <div className="history-header">
        <h3>Thông tin lịch hẹn của bạn</h3>
      </div>
      <ShowDetail />
      <p>sfsdihfiaahgo</p>
      <ViewHistory />
    </div>
  );
}
