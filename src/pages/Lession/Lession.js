import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import Car from "./../../assets/images/car.jpg";
import Bike from "./../../assets/images/bike.jpg";

const Lession = () => {
  const lessions = [
    {
      img: Car,
      name: "Car Driving lession!",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, repudiandae eius reiciendis voluptas labore veritatis at alias ducimus adipisci maxime assumenda harum suscipit.",
      price: 200,
    },
    {
      img: Bike,
      name: "Bike riding lession!",
      desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, repudiandae eius reiciendis voluptas labore veritatis at alias ducimus adipisci maxime assumenda harum suscipit.",
      price: 100,
    },
  ];
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
