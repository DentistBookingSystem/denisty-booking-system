import { compose } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceList from "../../getData/ServiceList";
import "./style.css";
var today = new Date();
export default function ServiceInfo(props) {
  const [serviceList, setServiceList] = useState([]);
  const [serviceSelected, setServiceSelected] = useState([]);
  const [nameServiceType, setNameServiceType] = useState("");

  const [content_feedback, setContent_feedback] = useState("");
  const [yourFeedBack, setYourFeedBack] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const { id } = useParams();

  useEffect(async () => {
    await ServiceList.getSericeType(id).then((Response) => {
      setServiceList(Response.data);
      console.log("Response.data.service.serviceType.name");
      setNameServiceType(Response.data.at(0).service.serviceType.name);
    });
    // return setServiceSelected([serviceList.at(0)]);
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
      console.log("tmp");
      console.log(tmp);
      if (typeof tmp !== "undefined" && tmp != null) {
        console.log("khác null");
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
              setFeedback(item.feedbackList);
              console.log(item.feedbackList);
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

  //feed back
  const Add_Feedback = () => (
    <div className="btn-feedback" style={{ textAlign: `center` }}>
      <button
        type="button"
        onClick={() => {
          yourFeedBack.push({
            content: content_feedback,
            time:
              today.getDate() +
              "/" +
              (today.getMonth() + 1) +
              "/" +
              today.getFullYear(),
          });
          setContent_feedback("");
        }}
      >
        Bình luận
      </button>
    </div>
  );

  const MapFeedback = () => {
    return feedback.map((item, index) => {
      {
        // if (index < 2) {
        return (
          <ShowFeedBackDetail
            name={`${index + 1} - ${item.account.full_name}`}
            content={item.content}
            time={item.time}
          />
        );
      }
      // }
    });
  };

  const ShowFeed = () => (
    <div id="feedback">
      {/* -----------------------------  Your listServiceAndFeedback back------------------------ */}
      <div style={{ margin: `10px 20px` }}>
        <h4>Bình luận của bạn</h4>
      </div>
      {yourFeedBack.map((item) => {
        return <ShowFeedBackDetail content={item.content} time={item.time} />;
      })}
      <form>
        <div className="input-feedback">
          <textarea
            placeholder="Viết bình luận của bạn"
            value={content_feedback}
            onChange={(e) => setContent_feedback(e.currentTarget.value)}
          ></textarea>
        </div>
        <Add_Feedback />
      </form>
      {/* -----------------------------  Your listServiceAndFeedback back------------------------ */}
      <div className="header-feedback">
        <h3>Đánh giá chất lượng ({feedback.length})</h3>
      </div>

      {/*------------------------ Feedback content ----------------------*/}
      <MapFeedback />

      {/*------------------------ Feedback content -------------------*/}
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
