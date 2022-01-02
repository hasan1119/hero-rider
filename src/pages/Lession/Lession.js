import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Lession.css";

const Lession = () => {
  const [lessions, setLessions] = useState([]);

  useEffect(() => {
    fetch("https://guarded-crag-87070.herokuapp.com/lessions")
      .then((res) => res.json())
      .then((data) => setLessions(data));
  }, []);

  return (
    <div className="container my-5">
      <h3 className="lession-title mb-5 text-center">Lession Category</h3>
      <Container>
        <div className="d-flex">
          {lessions.map((lession) => (
            <Card className="mx-3 category-card">
              <Card.Img variant="top" height="350px" src={lession?.img} />
              <Card.Body>
                <Card.Title className="lession-title">
                  {lession?.name}
                </Card.Title>
                <Card.Text className="lession-text">{lession?.desc}</Card.Text>
                <h4 className="lession-title">
                  Price: {lession?.price}
                  <sup>$</sup>{" "}
                </h4>

                <Link to={`/payment/${lession._id}`}>
                  <Button variant="primary" className="purchase-btn">
                    {" "}
                    Purchase{" "}
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Lession;
