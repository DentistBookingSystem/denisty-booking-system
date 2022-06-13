import Nav from "./components/Navbar/Nav";
import "./App.css";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Appointment from "./components/Appointment/Appointment";
import pushAppointment from "./getData/pushAppointment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import ServiceInfo from "./components/Service/ServiceInfo";
import { useEffect } from "react";
import Logout from "./components/Login-Logout/Logout";
import Profile from "./components/Profile/Profile";
import History from "./components/History/History";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from "bootstrap";
const handleOnclik = () => {
  pushAppointment.postData();
};

function App() {
  useEffect(() => {
    // localStorage.setItem("phone", "");
    // localStorage.setItem("accessToken", "");
    // localStorage.setItem("statusLogin", false);
  }, []);
  return (
    <div className="App">
      <Router>
        <div id="header">
          <Nav />
        </div>
        <div id="body">
          <Routes>
            <Route index element={<Home />} />
            <Route exact path="/appointment" element={<Appointment />} />
            <Route exact path="/serviceType/:id" element={<ServiceInfo />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/history" element={<History />} />
          </Routes>
        </div>
        <Footer />
      </Router>
      <div className="chatBox">
        <a href="https://l.messenger.com/l.php?u=http%3A%2F%2Fm.me%2F107337128652951&h=AT1R4u7pSoC4rdF5yHZ0e7myOVni1br5HBNiSsmK2Q_dUr9sNSEFQ8OmWGoFkVXMES6BM0nPWCzLh-JVLevAEg2xzp4WzOuFfUpW39WgQkILbTDH8jxEMSz9r2upi75kUed7uQ">
          <FontAwesomeIcon icon={faFacebookMessenger} />
        </a>
      </div>
    </div>
  );
}

export default App;
