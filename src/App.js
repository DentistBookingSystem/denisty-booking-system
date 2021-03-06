import Nav from "./components/Navbar/Nav";
import "./App.css";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Appointment from "./components/Appointment/Appointment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import ServiceInfo from "./components/Service/ServiceInfo";
import { useEffect } from "react";
import Logout from "./components/Login-Logout/Logout";
import Profile from "./components/Profile/Profile";
import History from "./components/History/History";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button } from "bootstrap";
const token = localStorage.getItem("accessToken");
const phone = localStorage.getItem("phone");
const API_CHECK_ACCOUNT = "http://localhost:8080/rade/patient/account/";
function App() {
  const MINUTE_MS = 1000 * 60 * 20;

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(API_CHECK_ACCOUNT + phone, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {})
        .catch((error) => {
          localStorage.clear();
          toast.warn(
            "Tài khoản cùa bạn hết hạn đang nhập. Hệ thống sẽ reload lại trong 5 giây."
          );
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        });
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <div className="App">
      <Router>
        <div id="header">
          <Nav />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
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
