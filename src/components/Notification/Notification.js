import { faBell, faBellSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Col, Modal, ModalBody, div, ModalHeader, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Button } from "bootstrap";
import {
  faBellConcierge,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { tada } from "react-animations";
import Radium, { StyleRoot } from "radium";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [fullHeight, setFullHeight] = useState(false);
  const getNotification = async () => {
    const data = {
      phone: phone,
      page: currentPage,
    };

    try {
      const result = await axios.post(API_GET_NOTIFY_POST, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("thông báo", result);
      setNotificationList(result.data);
      setFullHeight(false);
    } catch (error) {
      if (error.response.status === 401) {
        window.location.reload();
      }
    }
    //next data
    const data1 = {
      phone: phone,
      page: currentPage + 1,
    };

    const result1 = await axios.post(API_GET_NOTIFY_POST, data1, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (result1.data.length === 0) {
      setNextPage(false);
    } else {
      setNextPage(true);
    }
  };

  const styles = {
    tada: {
      animation: "x 1s",
      animationName: Radium.keyframes(tada),
      animationDuration: "1s",
    },
  };

  useEffect(() => {
    getNotification();
  }, [currentPage]);

  const [rotation, setRotation] = useState(-50);
  const [direction, setDirection] = useState(true);
  useEffect(() => {
    // const interval = setInterval(() => {
    //   let x = rotation;
    //   if (direction) {
    //     // console.log("vsfibid");
    //     setRotation(x + 10);
    //     // console.log("true", rotation);
    //   } else {
    //     setRotation(x - 10);
    //     // console.log("false", rotation);
    //   }
    //   if (x === 50) {
    //     setDirection(false);
    //   } else if (x === -50) {
    //     setDirection(true);
    //   }
    //   // console.log(rotation);
    //   // console.log("dirextion", direction);
    // }, 1000 * 5);
    setTimeout(() => {
      let x = rotation;
      if (direction) {
        // console.log("vsfibid");
        setRotation(x + 10);
        // console.log("true", rotation);
      } else {
        setRotation(x - 10);
        // console.log("false", rotation);
      }
      if (x === 50) {
        setDirection(false);
      } else if (x === -50) {
        setDirection(true);
      }
    }, 10000);
  });
  return (
    <>
      <div>
        <button
          onClick={() => {
            setShowNotification(true);
            getNotification();
          }}
        >
          <FontAwesomeIcon icon={faBell} className="bell" />
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
        size="lg"
      >
        <ModalHeader
          tag={"h3"}
          style={{ color: `#0b0b90` }}
          className="justify-content-center"
        >
          Thông báo của bạn
        </ModalHeader>
        <ModalBody style={{ height: `450px` }}>
          {notificationList.map((item) => (
            <div
              key={item.id}
              className="text-start"
              style={{ color: `black` }}
            >
              <p
                className="p-0 mb-0 text-notification box-notification"
                style={{
                  height: `${fullHeight ? `100%` : `80px`}`,
                }}
                onClick={() => setFullHeight(!fullHeight)}
              >
                {item.description}
              </p>
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
        <div className="text-center d-flex flex-column pb-3">
          <Row className="justify-content-center">
            <Col md={1} ld={1}>
              <button
                style={{
                  width: `20px`,
                  fontSize: `20px`,
                  backgroundColor: `white`,
                }}
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={faCaretLeft} />
              </button>
            </Col>
            <Col md={1} ld={1}>
              <button
                style={{
                  width: `10px`,
                  fontSize: `20px`,
                  backgroundColor: `white`,
                }}
              >
                {currentPage}
              </button>
            </Col>
            <Col md={1} ld={1}>
              <button
                style={{
                  width: `20px`,
                  fontSize: `20px`,
                  backgroundColor: `white`,
                }}
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
                disabled={!nextPage}
              >
                <FontAwesomeIcon icon={faCaretRight} />
              </button>
            </Col>
          </Row>
          <Row md={7} style={{ margin: `auto` }}>
            <button
              className="m-0"
              onClick={() => {
                setShowNotification(false);
              }}
            >
              Close
            </button>
          </Row>
        </div>
      </Modal>
    </>
  );
}
