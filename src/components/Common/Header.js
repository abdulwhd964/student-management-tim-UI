import React from "react";
import { Link } from "react-router-dom";
import "./Common.css";
export default function Header() {

  console.log("this is header")
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/homepage" className="navbar-brand" href="#">
            <span className="navbar-text">Home Page</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/homepage">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-student">
                  Create Student
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/show-student">
                  Show Student
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
