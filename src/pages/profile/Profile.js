import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

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
    fetch(`https://murmuring-stream-14048.herokuapp.com/user/${user.email}`)
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
    <div>
      <Container>
        <h1 className="text-center">Your Profile</h1>
        <div className="d-flex mx-auto my-4" style={{ width: "500px" }}>
          <div className="me-5">
            <img
              width="200px"
              src={`data:image/png;base64,${profile}`}
              alt=""
            />
          </div>
          <div className="">
            <h4>Name: {name}</h4>
            <h6>Age: {age}</h6>
            <h6>Phone: {phone}</h6>
            <p>Address: {address}</p>
            <h5>Email: {email}</h5>
            <p>
              Profile Type: <span className="text-capitalize">{usrType}</span>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
