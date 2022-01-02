import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Route, Redirect, useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

function AdminRoute(props) {
  const { children, ...rest } = props;
  const [userInfo, setUserInfo] = useState({});
  const history = useHistory();

  const { user } = useAuth();

  if (!user.email) {
    history.push("/login");
  }

  useEffect(() => {
    fetch(`https://murmuring-stream-14048.herokuapp.com/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, [user.email]);

  if (!userInfo?.email) {
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
    <Route
      {...rest}
      render={({ location }) =>
        userInfo?.usrType === "admin" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default AdminRoute;
