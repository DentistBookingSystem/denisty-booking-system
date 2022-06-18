import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceList from "../../getData/ServiceList";
import { Table, Row, Col, Container, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
const API_SEND_FEEDBACK = "http://localhost:8080/rade/patient/feedback/send/";
const API_GET_FEEDBACK = "http://localhost:8080/rade/feedback";
// var feedback = [];
var today = new Date();
export default function ServiceInfo() {
  const [serviceList, setServiceList] = useState([]);
  const [serviceSelected, setServiceSelected] = useState([]);
  const [nameServiceType, setNameServiceType] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [page, setPage] = useState(1);
  const [serviceIDSelected, setServiceIDSelected] = useState("");
  const [displayNextbutton, setDisplayNextButton] = useState(true);
  const { id } = useParams();
  const [tmpID, setTmpID] = useState(id);
  const [contentFeedback, setContenFeedback] = useState("");

  useEffect(() => {
    ServiceList.getSericeType(id).then((Response) => {
      setServiceList(Response.data);
      setNameServiceType(Response.data.at(0).service.serviceType.name);
      setServiceIDSelected(Response.data.at(0).service.id);
      setTimeout(() => {
        console.log("Response.data.at(0).service.id");
        console.log(Response.data.at(0).service.id);
      });
    });
    // .then(console.log(serviceIDSelected));
    console.log("serviceIDSelected: " + serviceIDSelected);
    if (tmpID !== serviceIDSelected) {
      setPage(1);
      setTmpID(serviceIDSelected);
    }
    //Get feeb back
    const data = {
      service_id: serviceIDSelected,
      page: page,
    };

    axios.post(API_GET_FEEDBACK, data).then((res) => {
      console.log("data ");
      console.log(res);
      setFeedback(res.data);
    });
    //get next feed back
    const next_data = {
      service_id: serviceIDSelected,
      page: page + 1,
    };
    axios.post(API_GET_FEEDBACK, next_data).then((res) => {
      console.log(" next data ");
      console.log(res);
      if (res.data.length === 0) {
        setDisplayNextButton(false);
      } else {
        setDisplayNextButton(true);
      }
    });
  }, [id, serviceSelected, page]);

  // const getServiceSelected = (e) => {};
  const MapServiceDetail = () => {
    return (
      <ul style={{ padding: `0px` }}>
        {serviceList.map((item) => {
          return (
            <li>
              <button
                id={item.service.id}
                value={item.service.id}
                onClick={(e) => {
                  setServiceSelected([item]);
                }}
              >
                {item.service.name}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  const ShowServiceDetail = () => {
    var lengthServiceSElected = serviceSelected.length;
    var tmp = serviceList.at(0);
    if (lengthServiceSElected === 0) {
      if (typeof tmp !== "undefined" && tmp != null) {
        setServiceIDSelected(tmp.service.id);
        return (
          <>
            <div>
              <h2 style={{ textAlign: `left` }}>{tmp.service.name}</h2>
              <div
                style={{
                  width: `100%`,
                  textAlign: `center`,
                  margin: `10px 10px`,
                }}
              >
                <img
                  src={`https://drive.google.com/uc?id=${tmp.service.url}`}
                  className="img-service"
                ></img>
              </div>
              <p>{tmp.service.description}</p>
            </div>
          </>
        );
      }
    } else {
      return (
        <>
          {serviceSelected.map((item) => {
            setServiceIDSelected(item.service.id);
            return (
              <div>
                <h2 style={{ textAlign: `left` }}>{item.service.name}</h2>
                <div
                  style={{
                    width: `100%`,
                    textAlign: `center`,
                    margin: `10px 10px`,
                  }}
                >
                  <img
                    src={`https://drive.google.com/uc?id=${item.service.url}`}
                  ></img>
                </div>

                <p>{item.service.description}</p>
              </div>
            );
          })}
        </>
      );
    }
  };

  // =======================

  const MapFeedback = () => {
    return feedback.map((item) => {
      {
        // if (index < 2) {
        return (
          <ShowFeedBackDetail
            name={item.account.full_name}
            content={item.content}
            time={item.time}
          />
        );
      }
      // }
    });
  };

  const PageMovement = async () => {
    var pageIndex = 1;
    console.log(serviceIDSelected);
    let data = {
      service_id: serviceIDSelected,
      page: pageIndex,
    };

    await axios.post(API_GET_FEEDBACK, data).then((res) => {
      setFeedback(res.data);
      console.log(res);
    });
    console.log("feedback");
    console.log(feedback);
    console.log(data);
    return <div>abc</div>;
  };

  const sendFeedback = () => {
    const data = {
      service_id: serviceIDSelected,
      phone: localStorage.getItem("phone"),
      content: contentFeedback,
    };
    console.log(data);
    axios
      .post(API_SEND_FEEDBACK, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("thành công");
      });
  };

  const handleChange = (e) => {
    setContenFeedback(e.target.value);
  };

  const ShowFeedBackDetail = (props) => (
    <div className="feedback-item">
      <div className="cus_name">
        <p>{props.name}</p>
      </div>
      <div className="content-feedback">
        <p>{props.content}</p>
      </div>
      <div className="time-feedback">
        <p>{props.time}</p>
      </div>
    </div>
  );
  //==============================
  return (
    <div className="service-detail-container">
      <div className="side-bar">
        <div>
          <h4>{nameServiceType}</h4>
        </div>
        <MapServiceDetail />
      </div>
      <div className="service-detail">
        <div className="desc">
          <ShowServiceDetail />
        </div>
        <div id="feedback">
          <div className="header-feedback">
            <h3>Đánh giá chất lượng</h3>
          </div>
          {/* -----------------------------  Your listServiceAndFeedback back------------------------ */}

          <div className="input-feedback">
            <textarea
              placeholder="Viết bình luận của bạn"
              value={contentFeedback}
              onChange={(e) => {
                setContenFeedback(e.target.value);
              }}
            />
          </div>
          <div className="btn-feedback" style={{ textAlign: `center` }}>
            <button
              type="button"
              onClick={(e) => {
                sendFeedback();
              }}
            >
              Gửi phản hồi
            </button>
          </div>
          {/* -----------------------------  Your listServiceAndFeedback back------------------------ */}

          {/*------------------------ Feedback content ----------------------*/}
          <MapFeedback />
          {/* <PageMovement /> */}
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
                <button disabled></button>
              </Col>
            )}
          </Row>
          {/*------------------------ Feedback content -------------------*/}
        </div>
      </div>

      <div></div>
    </div>
  );
}
