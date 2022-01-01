import React, { useEffect, useState } from "react";
import "./../../assets/css/header.css";
import { Container, Nav, Navbar, NavDropdown, Spinner } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
const Header = () => {
  const [userInfo, setUserInfo] = useState({});
  const { user, logOut, loading } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:5000/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, [user.email]);

  return (
    <Navbar className="navBar" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hero Rider
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link activeClassName="current" as={NavLink} to="/home">
              Home
            </Nav.Link>

            {userInfo?.usrType !== "admin" && user.email ? (
              <Nav.Link activeClassName="current" as={NavLink} to="/lession">
                Lession
              </Nav.Link>
            ) : (
              ""
            )}
            {userInfo?.usrType === "admin" ? (
              <Nav.Link activeClassName="current" as={NavLink} to="/dashboard">
                Dashboard
              </Nav.Link>
            ) : (
              ""
            )}
            {user.email && userInfo?.usrType !== "admin" ? (
              <Nav.Link activeClassName="current" as={NavLink} to="/profile">
                Profile
              </Nav.Link>
            ) : (
              ""
            )}

            {user.email ? (
              <Nav.Link>
                <button onClick={logOut} className="login-button">
                  {loading ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    "Logout"
                  )}
                </button>
              </Nav.Link>
            ) : (
              <Nav.Link activeClassName="current" as={NavLink} to="/login">
                {loading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Login"
                )}
              </Nav.Link>
            )}
            {user?.email ? null : (
              <NavDropdown bg="dark" title="Join Now" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} bg="dark" to="joinAsRider">
                  As a Hero Rider
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} bg="dark" to="joinAsLearner">
                  As a Lesson Learner
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
