import { ReactDOM } from "react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ServiceList from "../../getData/ServiceList";
var today = new Date();
export default function Feedback(props) {
  const [content_feedback, setContent_feedback] = useState("");
  const [icon, setIcon] = useState(faCaretDown);
  const [yourFeedBack, setYourFeedBack] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [FeedbackOfService, setFeedbackOfService] = useState([]);
  const [listServiceAndFeedback, setlistServiceAndFeedback] = useState([]);

  useEffect(() => {
    var id = localStorage.getItem("serviceid");
    ServiceList.getSericeType(1)
      .then((Response) => {
        setlistServiceAndFeedback(Response.data);

        // console.log("số id" + Response.data.at(0).service.id);
        listServiceAndFeedback.map((item) => {
          console.log(item.service.id);
          // if (item.service.id === 4) {
          //   console.log("okkoko");
          //   setFeedbackOfService(item.feedbackList);
          // }
        });
        // FeedbackOfService.map((item) => {
        //   setFeedback(
        //     [].concat(feedback, {
        //       name: item.account.name,
        //       content: item.content,
        //       time: item.time,
        //     })
        //   );
        // });
      })
      .then(() => {
        console.log("a" + listServiceAndFeedback);
        console.log("b" + listServiceAndFeedback.at(0));
        listServiceAndFeedback.map((item) => {
          console.log(item.service.id);
          // if (item.service.id === 4) {
          //   console.log("okkoko");
          //   setFeedbackOfService(item.feedbackList);
          // }
        });
        // console.log(feedback);
      });
  }, [feedback]);

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

  const changeDisplay = (e) => {
    var display = document.getElementById("view-more-hide").style.display;
    if (document.getElementById("view-more-hide").style.display === "block") {
      document.getElementById("view-more-hide").style.display = "none";
      document.getElementById("view-more").innerHTML = "Xem thêm";
      setIcon(faCaretDown);
    } else {
      document.getElementById("view-more-hide").style.display = "block";
      document.getElementById("view-more").innerHTML = "Thu gọn";
      setIcon(faCaretUp);
    }
  };
  return (
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
      {feedback.map((item, index) => {
        {
          if (index < 2) {
            return (
              <ShowFeedBackDetail
                name={`${index + 1} - ${item.account.name}`}
                content={item.content}
                time={item.time}
              />
            );
          }
        }
      })}
      <div className="btn-view-more">
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
      </div>
      <div id="view-more-hide">
        {listServiceAndFeedback.map((item, index) => {
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
        })}
      </div>

      {/*------------------------ Feedback content -------------------*/}
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
