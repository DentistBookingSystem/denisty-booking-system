import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
const notification = [
  {
    id: "1",
    name: "avsd",
  },
];
const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
const API_GET_NOTIFY_POST = "http://localhost:8080/rade/patient/notification";
export default function Notification() {
  const [notificationList, setNotificationList] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const getNotification = async () => {
    const data = {
      phone: phone,
      page: 1,
    };

    const result = await axios.post(API_GET_NOTIFY_POST, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("thông báo", result);
    setNotificationList(result.data);
    setTimeout(() => {
      console.log("abcd");
    }, 10000);
  };
  useEffect(() => {}, []);
  return (
    <>
      <div>
        <button
          onClick={() => {
            setShowNotification(true);
            getNotification();
          }}
        >
          <FontAwesomeIcon icon={faBell} />
        </button>
        {/* <div className="content-dropdown p-3">
          {notificationList.map((item) => (
            <div
              key={item.id}
              className="text-start"
              style={{ color: `black` }}
            >
              <p className="p-0 m-0 text-notification">{item.description}</p>
              <p
                className="text-end"
                style={{
                  color: `gray`,
                }}
              >
                {item.date}
              </p>
              <hr />
            </div>
          ))}
        </div> */}
      </div>
      <Modal
        isOpen={showNotification}
        toggle={() => setShowNotification(false)}
      >
        <ModalHeader
          tag={"h3"}
          style={{ color: `#0b0b90` }}
          className="justify-content-center"
        >
          Thông báo của bạn
        </ModalHeader>
        <ModalBody>
          {notificationList.map((item) => (
            <div
              key={item.id}
              className="text-start"
              style={{ color: `black` }}
            >
              <p className="p-0 m-0 text-notification">{item.description}</p>
              <p
                className="text-end"
                style={{
                  color: `gray`,
                }}
              >
                {item.date}
              </p>
              <hr />
            </div>
          ))}
        </ModalBody>
        <ModalFooter className="text-center">
          <Row md={7} style={{ margin: `auto` }}>
            <button
              onClick={() => {
                setShowNotification(false);
              }}
            >
              Close
            </button>
          </Row>
        </ModalFooter>
      </Modal>
    </>
  );
}
