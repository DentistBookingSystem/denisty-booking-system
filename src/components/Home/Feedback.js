import { faL } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ServiceList from "../../getData/ServiceList";
import ServiceTypeList from "../../getData/ServiceTypeList";

export default function Feedback() {
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  useEffect(() => {
    // ServiceTypeList.getSericeType().then((res) => {
    //   console.log(res.data);
    //   setServiceTypeList(res.data.serviceTypeList);
    // });
    ServiceList.getSericeType(0).then((res) => {
      //   setServiceList(res.data);
      console.log("res.data");
      console.log(res.data);
    });
  }, []);

  const toggle = async () => {
    await setIsOpen(!isOpen);
  };
  return (
    <div>
      <Row>
        <h3 style={{ fontSize: `25px`, color: `rgb(9, 196, 196` }}>
          Phản hồi từ khách hàng
        </h3>
      </Row>
      <Row className="filter-service">
        <Col>
          <Dropdown isOpen={isOpen} toggle={() => toggle()}>
            <DropdownToggle caret>Dịch vụ</DropdownToggle>
            <DropdownMenu>
              {serviceList.map((item, key) => {
                return <DropdownItem key={item.id}>{item.name}</DropdownItem>;
              })}
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
}
