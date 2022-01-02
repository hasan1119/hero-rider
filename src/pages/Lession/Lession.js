import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";

const Lession = () => {
  const [lessions, setLessions] = useState([]);
  useEffect(() => {
    fetch("https://murmuring-stream-14048.herokuapp.com/lessions")
      .then((res) => res.json())
      .then((data) => setLessions(data));
  }, []);

  return (
    <div className="my-5">
      <Container>
        <div className="d-flex">
          {lessions.map((lession) => (
            <Card className="mx-3">
              <Card.Img variant="top" height="350px" src={lession?.img} />
              <Card.Body>
                <Card.Title>{lession?.name}</Card.Title>
                <Card.Text>{lession?.desc}</Card.Text>
                <h4>Price: {lession?.price}$</h4>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Lession;
