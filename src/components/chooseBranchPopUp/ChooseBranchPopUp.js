import React, { useState } from "react";
import dataAppointment from "../../data/dataAppointment";
import "./style.css";
import { useNavigate } from "react-router-dom";
import ServiceTypeList from "../../getData/ServiceTypeList";

function ChooseBranchPopUp() {
  const [branchAddr, setBranchAddr] = useState([]);
  const navigate = useNavigate();
  const HandleClick = (e) => {
    console.log("come handle click fun");
    dataAppointment.setbranchId(e.currentTarget.id);
    localStorage.setItem("branch", e.currentTarget.id);
    navigate("/appointment", { state: { id: 1, name: "sabaoon" } });
  };

  useState(() => {
    ServiceTypeList.getSericeType().then((res) =>
      setBranchAddr(res.data.branchList)
    );
  }, []);

  const ShowBranchHint = () => (
    <div className="branch-hint">
      {branchAddr.map((item) => (
        <div className="branch-item">
          {/* <div className="hint" key={item.id}>
            <p>Gợi ý</p>
          </div> */}
          <button id={item.id} onClick={(e) => HandleClick(e)}>
            <h4>{item.name}</h4>
          </button>
          <div className="info-branch">
            <div className="info-branch-left">
              <div style={{ width: `100px`, height: `100px` }}>
                <img
                  style={{ width: `100px`, margin: `auto` }}
                  src={`https://drive.google.com/uc?id=${item.url}`}
                  alt=""
                ></img>
              </div>
            </div>
            <div className="info-branch-right">
              <div className="addr">
                <p style={{ fontWeight: `bold` }}>Địa chỉ:</p>
                <p style={{ marginLeft: `15px` }}>
                  {item.district.name}, {item.district.province.name}
                </p>
              </div>
              <div>
                <p style={{ fontWeight: `bold` }}>Thời gian làm việc:</p>
                <p style={{ marginLeft: `15px` }}>
                  {item.open_time}-{item.close_time}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // render() {
  return (
    <div className="cover">
      <div className="branch-container">
        <div>
          <h3 className="choose-branch-title">Chọn chi nhánh bạn muốn đến</h3>
        </div>
        <ShowBranchHint />
        {/* <div className="choose-branch-container">
        {branchAddr.map((item) => (
          <div className="branch-item">
            <button>
              <h4>{item.id}</h4>
            </button>
            <p>{item.name}</p>
          </div>
        ))}
      </div> */}
      </div>
    </div>
  );
  // }
}

// export default withRouter(ChooseBranchPopUp);
export default ChooseBranchPopUp;
