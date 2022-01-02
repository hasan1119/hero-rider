import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);

  useEffect(() => {
    fetch(`https://murmuring-stream-14048.herokuapp.com/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => toast.error(error.message));
  }, []);

  const handleStatusChange = (id, status) => {
    let modifiedOrders = [];
    users.forEach((order) => {
      if (order._id === id) {
        order.status = status;
      }
      modifiedOrders.push(order);
    });
    setUsers(modifiedOrders);
    const modifiedStatus = { id, status };

    fetch("https://murmuring-stream-14048.herokuapp.com/changestatus", {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(modifiedStatus),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success(<b style={{ color: "#fff" }}>Set to {status}</b>);
        } else {
          toast.error("something went wrong");
        }
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="px-2  mx-md-2 bg-white" style={{ borderRadius: "15px" }}>
      <h3 className="text-center mb-4 fw-bold">Manage all Users</h3>
      <div className="container-fluid mb-4">
        <Row>
          <Col lg={7}>
            <h4>Search Now</h4>
            <div className="d-flex">
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="search by fullName"
              />

              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="search by Email"
              />
              <Form.Control
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="search by phone"
              />
            </div>
          </Col>
          <Col lg={5}>
            <h4>Filter by age range</h4>
            <div className="d-flex">
              <Form.Control
                onChange={(e) => setMinAge(e.target.value)}
                type="number"
                placeholder="Min age"
              />

              <Form.Control
                onChange={(e) => setMaxAge(e.target.value)}
                type="number"
                placeholder="Max age"
              />
            </div>
          </Col>
        </Row>
      </div>
      {loading ? (
        <div className="text-center my-5 private-spinner py-5">
          <Spinner variant="danger" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h6>Loading...</h6>
        </div>
      ) : (
        <Table striped borderless hover responsive>
          <Toaster position="bottom-left" reverseOrder={false} />
          <thead className="bg-light">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email Address</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>
          {users
            .filter((user) => {
              if (
                user.name.toLowerCase().includes(name.toLowerCase()) &&
                user.email.toLowerCase().includes(email.toLowerCase()) &&
                user.phone.toLowerCase().includes(phone.toLowerCase()) &&
                user.age >= Number(minAge) &&
                user.age <= Number(maxAge || 10000)
              ) {
                return user;
              }
            })
            .map((user) => {
              return (
                <tbody key={user._id} style={{ fontWeight: "500" }}>
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>

                    <td>
                      <select
                        className={
                          user.status === "Blocked"
                            ? "btn btn-danger"
                            : user.status === "Active"
                            ? "btn btn-success"
                            : "btn btn-info"
                        }
                        defaultValue={user.status}
                        onChange={(e) =>
                          handleStatusChange(user._id, e.target.value)
                        }
                      >
                        <option className="bg-white text-muted">Active</option>
                        <option className="bg-white text-muted">Blocked</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </Table>
      )}
    </div>
  );
};

export default Dashboard;
