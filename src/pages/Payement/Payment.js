import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import "./Payment.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Jw18bENzfYAZQfTqlGKbNoTgcdLiNp1VVKfawnbedWj19UHUKOWVq4mOcHjYYIflBmV7Vdqtu2FkeV6CwM0DGFm00TrJaZBuZ"
);

const Payment = () => {
  const { paymentId } = useParams();
  const [lession, setLession] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const history = useHistory();

  if (userInfo?.usrType === "admin") {
    history.push("/dashboard");
  }

  useEffect(() => {
    fetch(`https://guarded-crag-87070.herokuapp.com/lession/${paymentId}`)
      .then((res) => res.json())
      .then((data) => setLession(data));
  }, [paymentId]);

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

  const { name, phone, email, address } = userInfo;

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
    <div className="container my-5">
      <h3 className="payment-title text-center mb-5">
        Please Pay Your Payment Here
      </h3>
      <div className="row my-5 g-3">
        <div className="col-md-4 col-sm-12 user-payment-info">
          <h5 className="text-start my-2 user-payment-text">
            Subject: <span className="user-payment-text2">{lession?.name}</span>{" "}
          </h5>
          <h5 className="text-start my-2 user-payment-text">
            User: <span className="user-payment-text2">{name}</span>{" "}
          </h5>
          <h5 className="text-start my-2 user-payment-text">
            Phone: <span className="user-payment-text2">{phone}</span>
          </h5>
          <h5 className="text-start my-2 pb-5 user-payment-text">
            Pay:{" "}
            <span className="user-payment-text2">
              {lession?.price}
              <sup>$</sup>
            </span>{" "}
          </h5>
        </div>

        <div className="col-md-8 col-sm-12 align-self-center">
          {lession?.price && (
            <Elements stripe={stripePromise}>
              <CheckoutForm
                details={{ ...lession, name, phone, email, address }}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
