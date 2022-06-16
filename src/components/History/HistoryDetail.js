import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import "./style.css";
const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
const APU_GET_HISTORY_DETAIL =
  "http://localhost:8080/rade/patient/appointment-detail/history";

export default function HistoryDetail(props) {
  const [listHistoryDetail, setHistoryDetail] = useState([]);

  useEffect((props) => {
    console.log("props");
    console.log(props.id);
    axios
      .get(APU_GET_HISTORY_DETAIL + "/" + props.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setHistoryDetail(res.data));
    document.getElementById("table-history-detail").style.display = "block";
  });
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
}
