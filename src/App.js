import Nav from "./components/Navbar/Nav";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Service from "./components/Home/Service";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div id="header">
          <Nav />
        </div>

        <div id="body">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/servicetype" element={<Service />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
