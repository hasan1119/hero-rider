import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { Form, Spinner } from "react-bootstrap";
import "./rider.css";
import useAuth from "../../hooks/useAuth.js";
import { useHistory } from "react-router-dom";

const JoinAsRider = () => {
  const history = useHistory();
  const {
    email,
    setEmail,
    loading,
    setLoading,
    singUp,
    password,
    setPassword,
  } = useAuth();

  const nameRef = useRef();
  const ageRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const profileRef = useRef();
  const nidRef = useRef();
  const licenseRef = useRef();
  const typeRef = useRef();
  const carRef = useRef();
  const carModleRef = useRef();
  const paletRef = useRef();
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
    const license = licenseRef.current.files[0];
    const vahichleType = typeRef.current.value;
    const carName = carRef.current.value;
    const carModle = carModleRef.current.value;
    const palet = paletRef.current.value;
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
        userInfo.append("license", license);
        userInfo.append("carName", carName);
        userInfo.append("vahichleType", vahichleType);
        userInfo.append("carModle", carModle);
        userInfo.append("palet", palet);
        userInfo.append("usrType", "rider");

        fetch("http://localhost:5000/joinRider", {
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
    <div className="form-container mt-3">
      <form className="w-100" onSubmit={HandleRiderJoining}>
        <h3>Join as a Hero Rider</h3>

        <div className="d-flex my-2">
          <Form.Group className="mb-3 w-100">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              ref={nameRef}
              name="name"
              required
              type="text"
              placeholder="Enter your Name"
            />
          </Form.Group>

          <Form.Group className="mb-3 w-100 ms-2">
            <Form.Label>Your Age</Form.Label>
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
            <Form.Label>Your email</Form.Label>
            <Form.Control
              required
              type="email"
              onBlur={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Enter your email address"
            />
          </Form.Group>

          <Form.Group className="mb-3 w-100 ms-2">
            <Form.Label>Your phone</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Enter your pnone number"
              ref={phoneRef}
            />
          </Form.Group>
        </div>

        <div className="my-2">
          <label className="w-100 ms-2" htmlFor="address">
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

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Your Profile picture</Form.Label>
          <Form.Control required ref={profileRef} type="file" />
        </Form.Group>

        <div className="d-flex">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Your NID picture</Form.Label>
            <Form.Control required ref={nidRef} type="file" />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3 ms-2">
            <Form.Label>Your driving license picture</Form.Label>
            <Form.Control required ref={licenseRef} type="file" />
          </Form.Group>
        </div>
        <div className="d-flex">
          <div className="w-50">
            <Form.Select required ref={typeRef}>
              <option disabled>Select vahichle tyle</option>
              <option>CAR</option>
              <option>Bike</option>
            </Form.Select>
          </div>

          <div className="w-50 ms-2">
            <Form.Group className="mb-3">
              <Form.Control
                required
                type="text"
                ref={carRef}
                placeholder="Car Name"
              />
            </Form.Group>
          </div>
        </div>

        <div className="d-flex">
          <div className="w-50">
            <Form.Group className="mb-3">
              <Form.Control
                required
                type="text"
                ref={carModleRef}
                placeholder="Car Model"
              />
            </Form.Group>
          </div>

          <div className="w-50 ms-2">
            <Form.Group className="mb-3">
              <Form.Control
                required
                ref={paletRef}
                type="text"
                placeholder="Name palet"
              />
            </Form.Group>
          </div>
        </div>
        <div className="d-flex">
          <div className="w-50">
            <Form.Label htmlFor="password">Your password</Form.Label>
            <Form.Control
              required
              placeholder="your password"
              type="password"
              id="password"
              onBlur={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-50 ms-2">
            <Form.Label htmlFor="confirmpass">Confirm Password</Form.Label>
            <Form.Control
              required
              placeholder="confirm password"
              type="password"
              id="confirmpass"
              ref={confirmPassRef}
            />
          </div>
        </div>
        <div className="my-2">
          <button type="submit" className="btn btn-primary w-100">
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
  );
};

export default JoinAsRider;
