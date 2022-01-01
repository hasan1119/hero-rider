import React, { useEffect, useState } from "react";
import { Container, Form, Spinner, Table } from "react-bootstrap";
import useAuth from "../../hooks/useAuth.js";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blockUser, setBlockUser] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        const keys = users.map((user) => user.blocked);
        setBlockUser([...keys]);
        setLoading(false);
      });
  }, [users]);

  function blockHandler(e, id, index) {
    const newBlocks = [...blockUser];
    const status = !newBlocks[index];
    newBlocks[index] = status;

    fetch(`http://localhost:5000/blockUser`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, isChecked: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBlockUser(newBlocks);
      });
  }

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
      <h4 className="text-center my-3">Admin Panel</h4>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>User Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            const { _id, address, name, email, phone, usrType } = user;

            return (
              <tr key={_id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{address}</td>
                <td>{phone}</td>
                <td className="text-capitalize">{usrType}</td>
                <td>
                  <Form.Check
                    onChange={(e) => blockHandler(e, _id, index)}
                    type="switch"
                    id="custom-switch"
                    label="Block user"
                    checked={blockUser[index]}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
