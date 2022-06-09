import { ReactDOM } from "react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
var today = new Date();
export default function Feedback(props) {
  const [content_feedback, setContent_feedback] = useState("");
  const [icon, setIcon] = useState(faCaretDown);
  const [yourFeedBack, setYourFeedBack] = useState([]);
  const [feed, setFeed] = useState([
    {
      name: "name 1",
      content:
        "Các designer của Copperplate chỉ dùng font này cho header hoặc title vì nó chỉ có kiểu chữ in hoa. Kiểu chữ trở này trở nên nổi tiếng sau khi Ai là triệu phú biến phông chữ này thành thương hiệu của mình.",
      time: "11/11/2020",
    },
    {
      name: "name 2",
      content:
        "Các designer của Copperplate chỉ dùng font này cho header hoặc title vì nó chỉ có kiểu chữ in hoa. Kiểu chữ trở này trở nên nổi tiếng sau khi Ai là triệu phú biến phông chữ này thành thương hiệu của mình.",
    },
    {
      name: "name 3",
      content:
        "Các designer của Copperplate chỉ dùng font này cho header hoặc title vì nó chỉ có kiểu chữ in hoa. Kiểu chữ trở này trở nên nổi tiếng sau khi Ai là triệu phú biến phông chữ này thành thương hiệu của mình.",
    },
  ]);

  useEffect(
    (props) => {
      // console.log(props.id);
    },
    [feed]
  );

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
      {/* -----------------------------  Your feed back------------------------ */}
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
      {/* -----------------------------  Your feed back------------------------ */}
      <div className="header-feedback">
        <h3>Đánh giá chất lượng ({feed.length})</h3>
      </div>

      {/*------------------------ Feedback content ----------------------*/}
      {feed.map((item, index) => {
        {
          if (index < 2) {
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
        {feed.map((item, index) => {
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
