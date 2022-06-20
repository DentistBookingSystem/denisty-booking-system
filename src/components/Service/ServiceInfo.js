import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceList from "../../getData/ServiceList";
import { Table, Row, Col, Container, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faCaretUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { height } from "@mui/system";
const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
const API_SEND_FEEDBACK = "http://localhost:8080/rade/patient/feedback/send/";
const API_GET_FEEDBACK = "http://localhost:8080/rade/feedback";
const API_GET_DISCOUNT_FOLLOW_SERVICEID =
  "http://localhost:8080/rade/discount/";
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
  const [discount, setDiscount] = useState({});
  let idServiceSelected;
  useEffect(() => {
    console.log("render");
    setTimeout(() => {
      ServiceList.getSericeType(id).then((Response) => {
        console.log(Response.data.at(0).id);
        setServiceList(Response.data);
        setNameServiceType(Response.data.at(0).serviceType.name);
        setServiceIDSelected(Response.data.at(0).id);
        idServiceSelected = Response.data.at(0).id;
        console.log("Response.data.at(0).id");
        console.log(Response.data.at(0).id);
      });
    }, 0);

    // .then(console.log(serviceIDSelected));
    // console.log("serviceIDSelected: " + serviceIDSelected);
    // if (tmpID !== serviceIDSelected) {
    //   setPage(1);
    //   setTmpID(serviceIDSelected);
    // }
    // //Get feeb back
    // const data = {
    //   service_id: serviceIDSelected,
    //   page: page,
    // };

    // axios.post(API_GET_FEEDBACK, data).then((res) => {
    //   console.log("data ");
    //   console.log(res);
    //   setFeedback(res.data);
    // });
    // //get next feed back
    // const next_data = {
    //   service_id: serviceIDSelected,
    //   page: page + 1,
    // };
    // axios.post(API_GET_FEEDBACK, next_data).then((res) => {
    //   console.log(" next data ");
    //   console.log(res);
    //   if (res.data.length === 0) {
    //     setDisplayNextButton(false);
    //   } else {
    //     setDisplayNextButton(true);
    //   }
    // });
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      let tmpDiscount = {};
      axios
        .get(API_GET_DISCOUNT_FOLLOW_SERVICEID + serviceIDSelected)
        .then((res) => {
          console.log(API_GET_DISCOUNT_FOLLOW_SERVICEID + serviceIDSelected);
          if (res.data !== null) {
            tmpDiscount.name = res.data.name;
            tmpDiscount.percentage = res.data.percentage + "%";
            tmpDiscount.description = res.data.description;
            tmpDiscount.start_date = res.data.start_date;
            tmpDiscount.end_date = res.data.end_date;
          }
          console.log(tmpDiscount);
          setDiscount(tmpDiscount);
        });
    }, 0);
  }, [serviceIDSelected]);

  // const getServiceSelected = (e) => {};
  const MapServiceDetail = () => {
    return (
      <ul style={{ padding: `0px` }}>
        {serviceList.map((item) => {
          return (
            <li>
              <button
                id={item.id}
                value={item.id}
                onClick={(e) => {
                  setServiceSelected([item]);
                  let tmp = {};
                  axios
                    .get(API_GET_DISCOUNT_FOLLOW_SERVICEID + item.id)
                    .then((res) => {
                      // console.log(res.data);
                      // setDiscount({
                      if (res.data !== null) {
                        tmp.name = res.data.name;
                        tmp.percentage = res.data.name;
                        tmp.description = res.data.description;
                        tmp.start_date = res.data.start_date;
                        tmp.end_date = res.data.end_date;
                      }
                      setDiscount(tmp);
                      // });
                    })
                    .then(() => {
                      // console.log(tmp.name);
                      console.log("discount");
                      console.log(discount);
                    });
                }}
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  //=========================================
  //ước tính thòi gian
  const estimateTime = (time) => {
    time = time * 60;
    let time_minute = time % 60;
    if (time < 60) {
      return `${time_minute} phút`;
    }
    let time_hour = (time - time_minute) / 60;

    if (time_minute === 0) {
      return `${time_hour} giờ `;
    } else {
      return `${time_hour} giờ ${time_minute} phút`;
    }
  };

  const [icon, setIncon] = useState(true); // true: down      false: up
  const onClickFuction = async () => {
    if (icon) {
      // document.getElementById("discount-info").style.display = "none";
      setIncon(!icon);
    } else {
      // document.getElementById("discount-info").style.display = "block";
      setIncon(!icon);
    }
  };

  const ShowDiscount = (idServiceSelected) => {
    if (discount.name === null || discount.name === undefined) {
      return;
    } else {
      return (
        <div className="p-2">
          <div className="d-flex flex-row">
            <h5>
              Khuyến mãi - {discount.name} - {discount.percentage}
            </h5>
            <button
              id="btn-view-more"
              style={{ marginLeft: `20px` }}
              onClick={() => onClickFuction()}
            >
              {icon ? (
                <FontAwesomeIcon icon={faCaretDown} />
              ) : (
                <FontAwesomeIcon icon={faCaretUp} />
              )}
            </button>
          </div>
          {!icon ? (
            <div id="discount-info" style={{ display: `block` }}>
              <Row className="d-flex flex-row justify-content-start">
                <Col style={{ fontSize: `18px`, paddingLeft: `20px` }} lg={3}>
                  Thời gian áp dụng :{" "}
                </Col>
                <Col style={{ paddingLeft: `4px` }} lg={8}>
                  {discount.start_date} - {discount.end_date}
                </Col>
              </Row>
              <Row>
                <Col style={{ fontSize: `18px`, paddingLeft: `20px` }} lg={3}>
                  Mô tả :
                </Col>
                <Col style={{ paddingLeft: `4px` }} lg={8}>
                  {discount.description}
                </Col>
              </Row>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    }
  };

  const ShowServiceDetail = () => {
    var lengthServiceSElected = serviceSelected.length;
    var tmp = serviceList.at(0);
    if (lengthServiceSElected === 0) {
      if (typeof tmp !== "undefined" && tmp != null) {
        setServiceIDSelected(tmp.id);

        return (
          <>
            <div>
              <h2 style={{ textAlign: `left` }}>{serviceList.at(0).name}</h2>
              <div className="d-flex flex-row p-1">
                <h5>Thời gian: </h5>
                <p style={{ paddingLeft: `5px` }}>
                  ~{estimateTime(tmp.estimated_time)}
                </p>
              </div>
              <div className="d-flex flex-row p-1">
                <h5>Giá: </h5>
                <p style={{ paddingLeft: `5px` }}>
                  {tmp.min_price} (VNĐ) - {tmp.max_price} (VNĐ)
                </p>
              </div>
              {ShowDiscount(tmp.id)}
              <div
                style={{
                  width: `100%`,
                  textAlign: `center`,
                  margin: `10px 10px`,
                }}
              >
                <img
                  style={{ width: `40vw` }}
                  src={`https://drive.google.com/uc?id=${
                    serviceList.at(0).url
                  }`}
                  className="img-service"
                ></img>
              </div>
              <p>{serviceList.at(0).description}</p>
            </div>
          </>
        );
      }
    } else {
      return (
        <>
          {serviceSelected.map((item) => {
            setServiceIDSelected(item.id);
            return (
              <div>
                <h2 style={{ textAlign: `left` }}>{item.name}</h2>
                <div className="d-flex flex-row p-1">
                  <h5>Thời gian ước tính:</h5>
                  <p style={{ paddingLeft: `5px` }}>
                    {estimateTime(item.estimated_time)}
                  </p>
                </div>
                <div className="d-flex flex-row p-1">
                  <h5>Giá: </h5>
                  <p style={{ paddingLeft: `5px` }}>
                    {tmp.min_price} VNĐ - {tmp.max_price} VNĐ
                  </p>
                </div>
                {ShowDiscount(tmp.id)}
                <div
                  style={{
                    width: `100%`,
                    textAlign: `center`,
                    margin: `10px 10px`,
                  }}
                >
                  <img
                    style={{ width: `40vw` }}
                    src={`https://drive.google.com/uc?id=${item.url}`}
                  ></img>
                </div>

                <p>{item.description}</p>
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
      </div>

      <div></div>
    </div>
  );
}
