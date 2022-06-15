import { compose } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceList from "../../getData/ServiceList";
import "./style.css";

const API_GET_FEEDBACK = "http://localhost:8080/rade/feedback";
// var feedback = [];
var today = new Date();
export default function ServiceInfo(props) {
  const [serviceList, setServiceList] = useState([]);
  const [serviceSelected, setServiceSelected] = useState([]);
  const [nameServiceType, setNameServiceType] = useState("");
  const [render, setReder] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [serviceIDSelected, setServiceIDSelected] = useState("");

  const { id } = useParams();

  useEffect(() => {
    ServiceList.getSericeType(id).then((Response) => {
      setServiceList(Response.data);
      setNameServiceType(Response.data.at(0).service.serviceType.name);
    });
  }, [id, serviceSelected]);

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
        setFeedback(tmp.feedbackList);
        return (
          <div className="service-detail">
            <div className="desc">
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

                <ShowFeed />
              </div>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="service-detail">
          <div className="desc">
            {serviceSelected.map((item) => {
              setServiceIDSelected(item.service.id);
              setFeedback(item.feedbackList);
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

                  <ShowFeed />
                </div>
              );
            })}
          </div>
        </div>
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

  const ShowFeed = () => {
    let value;
    return (
      <>
        <div id="feedback">
          <div className="header-feedback">
            <h3>Đánh giá chất lượng</h3>
          </div>
          {/* -----------------------------  Your listServiceAndFeedback back------------------------ */}

          <form>
            <div className="input-feedback">
              <textarea
                placeholder="Viết bình luận của bạn"
                value={value}
                onChange={(e) => (value = e.currentTarget.value)}
              ></textarea>
            </div>
            <div className="btn-feedback" style={{ textAlign: `center` }}>
              <button
                type="submit"
                onClick={(e) => {
                  value = "";
                }}
              >
                Bình luận
              </button>
            </div>
          </form>
          {/* -----------------------------  Your listServiceAndFeedback back------------------------ */}

          {/*------------------------ Feedback content ----------------------*/}
          <MapFeedback />
          {/* <PageMovement /> */}

          {/*------------------------ Feedback content -------------------*/}
        </div>
      </>
    );
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
      <ShowServiceDetail />
      <div></div>
    </div>
  );
}
