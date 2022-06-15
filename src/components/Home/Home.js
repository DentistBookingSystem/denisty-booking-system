import React, { Component } from "react";
import "./style.css";
import doctorPicture from "../../assets/images/doctor.webp";
// import SlideShow from "../components/SlideShow/SlideShow";
// import ServiceType from "./components/ServiceType/ServiceType";
import SlideShow from "../SlideShow/SlideShow";
import img1 from "../../assets/images/slide (1).jpg";
import img2 from "../../assets/images/slide (2).jpg";
import img3 from "../../assets/images/slide (3).jpg";
import img4 from "../../assets/images/slide (4).jpg";
import img5 from "../../assets/images/slide (5).jpg";
import img6 from "../../assets/images/banner-nieng-rang-dep-chuan-chat-rieng-pc2.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const collection = [
  { src: img1, caption: "Đội ngũ chuyên nghiệp" },
  { src: img2, caption: "Chăm sóc tận tình" },
  { src: img3, caption: "Làm việc nhanh gọn" },
  { src: img4, caption: "Đội ngũ chuyên nghiệp" },
  { src: img5, caption: "Chăm sóc tận tình" },
  { src: img6, caption: "Làm việc nhanh gọn" },
];

export default class Home extends Component {
  render() {
    return (
      <>
        <div className="App-slide">
          <SlideShow
            input={collection}
            ratio={`3:2`}
            mode={`automatic`}
            timeout={`3000`}
          />
        </div>
        <div className="home">
          <div>
            <h2 style={{ fontSize: `25px` }}>
              Nha Khoa Rade- Nha khoa dẫn đầu với sự tận tâm, chuyên môn giỏi,
              thẩm mỹ cao
            </h2>
            <div>
              <p>
                NHA KHOA Rade với SỨ MỆNH: “Kiến tạo hệ sinh thái Nha Khoa cực
                kỳ đơn giản. Phụng sự con người nhanh nhất trên mọi miền đất
                nước”
              </p>
              <p>Với 3 trụ cột là Chính trực – Kỷ luật – Sáng tạo</p>
              <p>
                TẦM NHÌN Nha khoa Rade đến năm 2025: “Là chuỗi phòng nha khoa
                dẫn đầu Việt Nam bởi sự phục vụ tận tâm, chuyên môn giỏi và thẩm
                mỹ cao. Bằng việc vận hành cực kỳ đơn giản với tinh thần phụng
                sự khách hàng”
              </p>
              <p>
                Và để thực hiện tầm nhìn đến năm 2025, con người Nha khoa Rade 5
                giá trị cốt lõi: Tận tâm, trung thực , kỷ luật, máu lửa, học hỏi
              </p>
            </div>
            <img src={doctorPicture} alt="" />
            <p className="img-decs">
              Hơn 150 Bác sĩ Nha Khoa Rade uy tín hàng đầu, điều trị nhẹ nhàng,
              chính xác, tận tâm, luôn cập nhập nhập kiến thức từ nền y tế tiến
              bộ thế giới
            </p>
          </div>
          <div>
            <h2 style={{ fontSize: `25px` }}>Tiêu chuẩn nha khoa Quốc tế </h2>
            <ul>
              <ol>Top 50 Nha khoa tốt nhất Thế Giới theo Tổ Chức Hoa Kỳ GCR</ol>
              <ol>
                Tiêu chuẩn quản lý chất lượng quốc tế ISO 9001:2015 Anh Quốc
              </ol>
            </ul>
            <p>
              Nha Khoa Kim đạt được chứng nhận Tiêu chuẩn quản lý chất lượng
              quốc tế ISO 9001:2015 Vương Quốc Anh cấp. Bộ tiêu chuẩn này là hệ
              thống quản lý khoa học, chặt chẽ với mục tiêu cao là nâng cao chất
              lượng, mang lại sự hài lòng cho khách hàng trên toàn hệ thống.
            </p>
            <img
              src="https://znews-photo.zingcdn.me/w1920/Uploaded/wyhktpu/2021_01_11/unnamed_5_.jpg"
              alt=""
            />
            <p>
              GCR là chứng nhận chất lượng quốc tế chuyên về lĩnh vực y tế và
              chăm sóc sức khỏe. Nha Khoa Kim đã chứng minh được những giá trị
              mang tính hệ thống và những tiêu chí hàng đầu về trình độ và hoạt
              động chuyên môn; cơ sở vật chất; dịch vụ; kết quả điều trị; hệ
              thống quản lý chất lượng (QA) và các tiêu chuẩn về an toàn y khoa.
            </p>
          </div>
        </div>
      </>
    );
  }
}
