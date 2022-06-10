import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import ServiceList from "../../getData/ServiceList";
import ChooseBranchPopUp from "../chooseBranchPopUp/ChooseBranchPopUp";
import Feedback from "./Feedback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
var today = new Date();
var i = 0;
export default function ServiceInfo(props) {
  const [serviceList, setServiceList] = useState([]);
  const [serviceSelected, setServiceSelected] = useState();

  const [content_feedback, setContent_feedback] = useState("");
  const [icon, setIcon] = useState(faCaretDown);
  const [yourFeedBack, setYourFeedBack] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    ServiceList.getSericeType(id).then((Response) => {
      setServiceList(Response.data);
      setServiceSelected(Response.data.at(0).service);
    });
    // return setServiceSelected([serviceList.at(0)]);
  }, [id, serviceSelected]);

  const getServiceSelected = (e) => {};
  const MapServiceDetail = () => {
    // console.log(serviceList.at(0));
    // if (i === 0) {
    //   setServiceSelected([serviceList.at(0)]);
    //   i++;
    // }
    return (
      <ul>
        {/* <p>{serviceList.at(0).service.id}</p> */}
        {serviceList.map((item) => {
          // setServiceSelected([serviceList.at(0)]);
          return (
            <li>
              <button
                id={item.service.id}
                value={item.service.id}
                onClick={(e) => {
                  setServiceSelected(item.service);
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
    return (
      <div className="service-detail">
        <div className="desc">
          {/* {serviceSelected.map((item) => {
            // setFeedback([...feedback, item.feedbackList]);
            setFeedback(item.feedbackList);
            console.log(item.feedbackList);
            // console.log(item.feedbackList.at(0));
            // console.log(item.feedbackList.at(0).content);
            // console.log(item.feedbackList.at(0).time);
            // console.log(item.feedbackList.at(0).account.full_name);
            return ( */}
          <div>
            <h2>{serviceSelected.name}</h2>
            <p>{serviceSelected.description}</p>
            <img
              src={`https://drive.google.com/uc?id=${serviceSelected.url}`}
            ></img>
            <div
              className="btn-appointmentService"
              style={{ textAlign: `center` }}
            >
              <Popup modal trigger={<button>Đặt lịch</button>}>
                <ChooseBranchPopUp />
              </Popup>
            </div>
            <ShowFeed />
          </div>
          {/* );
          })} */}
        </div>
      </div>
    );
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

  // const changeDisplay = (e) => {
  //   var display = document.getElementById("view-more-hide").style.display;
  //   if (document.getElementById("view-more-hide").style.display === "block") {
  //     document.getElementById("view-more-hide").style.display = "none";
  //     document.getElementById("view-more").innerHTML = "Xem thêm";
  //     setIcon(faCaretDown);
  //   } else {
  //     document.getElementById("view-more-hide").style.display = "block";
  //     document.getElementById("view-more").innerHTML = "Thu gọn";
  //     setIcon(faCaretUp);
  //   }
  // };

  const MapFeedback = () => {
    console.log(feedback.length);
    if (feedback.length === 0) {
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
    } else {
      return console.log("sai rồi kìa ");
    }
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

      {/* <div className="btn-view-more">
        <button
          className="view-more"
          onClick={(e) => changeDisplay(e)}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <p id="view-more">Xem thêm</p>
          <FontAwesomeIcon icon={icon} />
        </button>
      </div> */}
      {/* <div id="view-more-hide">
        {feedback.map((item, index) => {
          {
            if (index >= 2) {
              return (
                <ShowFeedBackDetail
                  name={`${index + 1} - ${item.name}`}
                  content={item.content}
                  time={item.time}
                />
              );
            }
          }
        })} */}
      {/* </div> */}

      {/*------------------------ Feedback content -------------------*/}
    </div>
  );
  //==============================
  return (
    <div className="service-detail-container">
      <div className="side-bar">
        <div>
          <p>Các dịch vụ</p>
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
