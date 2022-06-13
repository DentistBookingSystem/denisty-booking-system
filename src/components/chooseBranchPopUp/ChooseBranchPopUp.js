import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import ServiceTypeList from "../../getData/ServiceTypeList";

function ChooseBranchPopUp() {
  const [branchAddr, setBranchAddr] = useState([]);
  const navigate = useNavigate();
  const HandleClick = (e) => {
    localStorage.setItem("branch", e.currentTarget.id);
    if (window.location.href.indexOf("appointment") <= -1) {
      navigate("/appointment", { state: { id: 1, name: "sabaoon" } });
    } else {
    }
  };

  useState(() => {}, []);

  // render() {
  return <div>sdf</div>;
  // }
}

// export default withRouter(ChooseBranchPopUp);
export default ChooseBranchPopUp;
