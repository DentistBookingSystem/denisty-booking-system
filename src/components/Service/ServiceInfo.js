import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import ServiceList from "../../getData/ServiceList";
import ChooseBranchPopUp from "../chooseBranchPopUp/ChooseBranchPopUp";
import Feedback from "./Feedback";
import "./style.css";

export default function ServiceInfo(props) {
  const [serviceList, setServiceList] = useState([]);
  const [serviceSelected, setServiceSelected] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    ServiceList.getSericeType(id).then((Response) => {
      setServiceList(Response.data);
    });
  }, [id, serviceSelected]);
  const MapServiceDetail = () => {
    return (
      <ul>
        {serviceList.map((item) => {
          return (
            <li>
              <button id={item.id} onClick={(e) => setServiceSelected([item])}>
                {item.name}
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
          {serviceSelected.map((item) => (
            <div>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <img src={`https://drive.google.com/uc?id=${item.url}`}></img>
              <div
                className="btn-appointmentService"
                style={{ textAlign: `center` }}
              >
                <Popup modal trigger={<button>Đặt lịch</button>}>
                  <ChooseBranchPopUp />
                </Popup>
              </div>
              <Feedback />
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="service-detail-container">
      <div className="side-bar">
        <div>
          <p>Các dịch vụ</p>
        </div>
        <MapServiceDetail />
      </div>
      <ShowServiceDetail />
    </div>
  );
}
