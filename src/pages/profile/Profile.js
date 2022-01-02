import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import "./Profile.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const history = useHistory();

  if (userInfo?.usrType === "admin") {
    history.push("/dashboard");
  }

  useEffect(() => {
    setLoading(true);
    fetch(`https://guarded-crag-87070.herokuapp.com/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
        console.log(data);
        setLoading(false);
      });
  }, [user.email]);

  const { name, age, phone, email, profile, address, usrType } = userInfo;

  if (loading) {
    return (
      <div className="text-center my-5 private-spinner py-5">
        <Spinner variant="danger" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h6>Loading...</h6>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Container>
        <div className="wrapper my-5 mx-auto">
          <h1 className="text-center profile-title">Your Profile</h1>
          <div className="d-flex mx-auto my-4" style={{ width: "500px" }}>
            <div className="me-5">
              <img
                width="200px"
                src={`data:image/png;base64,${profile}`}
                alt=""
              />
            </div>
            <div className="">
              <h4 className="profile-text">Name: {name}</h4>
              <h6 className="profile-text">Age: {age}</h6>
              <h6 className="profile-text">Phone: {phone}</h6>
              <h6 className="profile-text">Address: {address}</h6>
              <h6 className="profile-text">Email: {email}</h6>
              <h6 className="profile-text">
                Profile Type: <span className="text-capitalize">{usrType}</span>
              </h6>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
