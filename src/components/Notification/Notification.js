import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const notification = [
  {
    id: "1",
    name: "avsd",
  },
];
export default function Notification() {
  const handleClickChange = () => {};

  return (
    <div className="dropdown">
      <button className="button-dropdown" onClick={() => handleClickChange()}>
        <FontAwesomeIcon icon={faBell} />
      </button>
      <div className="content-dropdown">
        {notification.map((item) => (
          <Link to={`/serviceType/${item.id}`} key={item.id}>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
