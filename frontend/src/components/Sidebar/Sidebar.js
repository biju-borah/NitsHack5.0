import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../Sidebar/Sidebar.css";

const Sidebar = () => {
  return (
    <div
      className="col-md-3 col-lg-2 sidebar-offcanvas pl-0"
      id="sidebar"
      role="navigation"
      style={{ backgroundColor: "#e9ecef" }}
    >
      <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
        <li className="nav-item mb-2 mt-3">
          <img src="" alt="Avatar" className="avatar"></img>
          <a className="nav-link text-secondary" href="#">
            <h5>Shibam Debnath</h5>
          </a>
        </li>
        <li className="nav-item mb-2 ">
          <a className="nav-link text-secondary" href="/">
            <i className="fas fa-user font-weight-bold"></i>{" "}
            <span className="ml-3">Dashboard</span>
          </a>

          <a className="nav-link text-secondary" href="/Bins">
            <i className="fas fa-user font-weight-bold"></i>{" "}
            <span className="ml-3">Bins</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
