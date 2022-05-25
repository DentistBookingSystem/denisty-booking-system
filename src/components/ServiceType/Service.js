import React, { Component } from "react";
import "./style.css";
import ServiceTypeList from "../../getData/ServiceTypeList";
import { Link } from "react-router-dom";

export default class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceType: [],
    };
  }

  componentDidMount() {
    ServiceTypeList.getSericeType().then((Response) =>
      this.setState({ serviceType: Response.data })
    );
    console.log("ok");
  }
  render() {
    return (
      <div class="dropdown">
        <button class="nut_dropdown">Dịch vụ</button>
        <div class="noidung_dropdown">
          {this.state.serviceType.map((serviceType) => (
            <Link to={"/serviceType_" + serviceType.id}>
              {serviceType.name}
            </Link>
            // <a href="#">{serviceType.name}</a>
          ))}
        </div>
      </div>
    );
  }
}
