import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { Form, Spinner } from "react-bootstrap";
import useAuth from "../../hooks/useAuth.js";
import { useHistory } from "react-router-dom";
import "./JoinAsLearner.css";

const Joinaslearner = () => {
  const history = useHistory();
  const { user } = useAuth();

  if (user.email) {
    history.push("/");
  }

  const { email, setEmail, loading, singUp, password, setPassword } = useAuth();

  const nameRef = useRef();
  const ageRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const profileRef = useRef();
  const nidRef = useRef();
  const typeRef = useRef();
  const confirmPassRef = useRef();
  const [uploading, setUploading] = useState(false);

  const userInfo = new FormData();

  function HandleRiderJoining(e) {
    e.preventDefault();
    setUploading(true);
    const name = nameRef.current.value;
    const age = ageRef.current.value;
    const phone = phoneRef.current.value;
    const profile = profileRef.current.files[0];
    const address = addressRef.current.value;
    const nid = nidRef.current.files[0];
    const vahichleType = typeRef.current.value;
    const confirmPassword = confirmPassRef.current.value;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password doesn't match!",
      });
    } else if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password should be at least 8 charecter!",
      });
    } else {
      singUp();
      if (!loading) {
        userInfo.append("name", name);
        userInfo.append("age", age);
        userInfo.append("email", email);
        userInfo.append("phone", phone);
        userInfo.append("address", address);
        userInfo.append("profile", profile);
        userInfo.append("nid", nid);
        userInfo.append("vahichleType", vahichleType);
        userInfo.append("usrType", "learner");

        fetch("https://guarded-crag-87070.herokuapp.com/joinLearner", {
          method: "POST",
          body: userInfo,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              setUploading(false);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully Registered",
                text: "Have a fun!",
                showConfirmButton: false,
                timer: 2000,
              });
            }
            history.replace("/profile");
          });
      }
    }
  }

  return (
    <div className="learner-section">
      <div className="wrapper mt-5 mb-5">
        <div className="form-container mt-3">
          <form className="w-100" onSubmit={HandleRiderJoining}>
            <h3 className="pb-3">Join as a Driving Lesson Learner</h3>

            <div className="d-flex my-2">
              <Form.Group className="mb-3 w-100">
                <Form.Label className="form-text">Your Name</Form.Label>
                <Form.Control
                  ref={nameRef}
                  name="name"
                  required
                  type="text"
                  placeholder="Enter your Name"
                />
              </Form.Group>

              <Form.Group className="mb-3 w-100 ms-2">
                <Form.Label className="form-text">Your Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  required
                  ref={ageRef}
                  placeholder="Enter your age"
                />
              </Form.Group>
            </div>

            <div className="d-flex my-2">
              <Form.Group className="mb-3 w-100">
                <Form.Label className="form-text">Your email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  onBlur={(e) => setEmail(e.target.value)}
                  name="email"
                  placeholder="Enter your email address"
                />
              </Form.Group>

              <Form.Group className="mb-3 w-100 ms-2">
                <Form.Label className="form-text">Your phone</Form.Label>
                <Form.Control
                  type="number"
                  required
                  placeholder="Enter your pnone number"
                  ref={phoneRef}
                />
              </Form.Group>
            </div>

            <div className="my-2">
              <label className="w-100 ms-2 form-text" htmlFor="address">
                Your present addess
                <input
                  type="text"
                  id="address"
                  required
                  ref={addressRef}
                  className="form-control w-100"
                  placeholder="Enter your  address"
                />
              </label>
            </div>

            <Form.Group controlId="formFile" className="my-3">
              <Form.Label className="form-text">
                Your Profile picture
              </Form.Label>
              <Form.Control required ref={profileRef} type="file" />
            </Form.Group>

            <div className="d-flex my-3">
              <div className="w-50 my-2">
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label className="form-text">
                    Your NID picture
                  </Form.Label>
                  <Form.Control required ref={nidRef} type="file" />
                </Form.Group>
              </div>
              <div className="w-50 ms-2 my-2">
                <Form.Label className="form-text">Vahichle Type</Form.Label>
                <Form.Select required ref={typeRef}>
                  <option>Car</option>
                  <option>Bike</option>
                </Form.Select>
              </div>
            </div>

            <div className="d-flex">
              <div className="w-50">
                <Form.Label htmlFor="password" className="form-text">
                  Your password
                </Form.Label>
                <Form.Control
                  required
                  placeholder="your password"
                  type="password"
                  id="password"
                  onBlur={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="w-50 ms-2">
                <Form.Label htmlFor="confirmpass" className="form-text">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  required
                  placeholder="confirm password"
                  type="password"
                  id="confirmpass"
                  ref={confirmPassRef}
                />
              </div>
            </div>
            <div className="my-3">
              <button type="submit" className="btn btn-learner w-100">
                {uploading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Join Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Joinaslearner;
