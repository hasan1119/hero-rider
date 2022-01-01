import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

function AdminRoute(props) {
  const { children, ...rest } = props;
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
        setLoading(false);
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
