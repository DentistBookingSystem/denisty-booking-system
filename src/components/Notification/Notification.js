import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
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
  const handleClickChange = () => {};
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
  };
  useEffect(() => {
    getNotification();
  }, []);
  return (
    <div className="dropdown">
      <button className="button-dropdown" onClick={() => handleClickChange()}>
        <FontAwesomeIcon icon={faBell} />
      </button>
      <div className="content-dropdown">
        {notificationList.map((item) => (
          <Link to="" key={item.id} className="text-start">
            {item.description}
          </Link>
        ))}
      </div>
    </div>
  );
}
