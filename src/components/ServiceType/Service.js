import React, { Component } from "react";
import "./style.css";
import ServiceTypeList from "../../getData/ServiceTypeList";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "bootstrap";
export default class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceType: [],
    };
  }

  componentDidMount() {
    ServiceTypeList.getSericeType()
      .then((Response) => {
        this.setState({ serviceType: Response.data.serviceTypeList });
        console.log("ServiceTypr/Service.js: " + Response.data.serviceTypeList);
      })
      .catch((error) => console.log("Error: " + error));
    console.log("ServiceType: \n" + this.state.serviceType);
  }
  render() {
    return (
      <div className="dropdown">
        <button className="nut_dropdown" style={{ width: `160px` }}>
          Dịch vụ
        </button>
        <div className="noidung_dropdown">
          {this.state.serviceType.map((item) => (
            <Link to={`/serviceType/${item.id}`} key={item.id}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
