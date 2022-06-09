import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListItem } from "@mui/material";
import { internal_resolveProps } from "@mui/utils";
import React from "react";
import "./style.css";
const list = [
  {
    id: "1",
    service: [
      {
        id: "1",
        name: "service 1",
      },
      {
        id: "1",
        name: "service 1",
      },
    ],
    doctor: [
      {
        id: "1",
        name: "doctor 1",
      },
      {
        id: "2",
        name: "doctor 2",
      },
    ],
    date: "12/2/2",
    branch: "branch ",
  },
];
export default function History() {
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
    <div className="table-history">
      <ul>
        <li className="table-header">
          <li className="col-1">Ngày hẹn</li>
          <li className="col-2">Địa chỉ</li>
        </li>
        <li>
          {list.map((item) => (
            <>
              <div className="table-item">
                <li className="col-1">{item.date}</li>
                <li className="col-2 col-2-item">
                  <p>{item.branch}</p>
                  <div>
                    <button onClick={(e) => Show(e)}>Chi tiết</button>
                    <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                  </div>
                </li>
              </div>
            </>
          ))}
        </li>
      </ul>
    </div>
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
