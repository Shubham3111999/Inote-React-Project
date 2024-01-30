import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();
  // useEffect(() => {
  //   // Google Analytics
  //   console.log(location);
  // }, [location]);

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/LognIn")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNote</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : null}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item ">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : null}`} to="/about">About</Link>
            </li>

          </ul>
          {!localStorage.getItem("token")? <form className="d-flex">
            
          <Link className="btn btn-primary mx-1" to="/LognIn" role="button">Logn In</Link>
          <Link className="btn btn-primary mx-1" to="/SignUp" role="button">SignUp</Link>
          </form>: <button onClick={handleLogout} className="btn btn-primary">LogOut</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
