import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./contexts/AuthProvider.js";
import Header from "./components/header/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login/Login.js";
import JoinAsRider from "./pages/joinasrider/JoinAsRider.js";
import Joinaslearner from "./pages/joinasLearner/JoinAsLearner.js";
import Home from "./pages/home/Home.js";
import Profile from "./pages/profile/Profile.js";
import PrivateRoute from "./protectedRoute/PrivateRoute.js";
import Footer from "./components/Footer.js";
import AdminRoute from "./protectedRoute/AdminRoute.js";
import Dashboard from "./pages/dashboard/Dashboard.js";
import Lession from "./pages/Lession/Lession.js";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>

            <PrivateRoute path="/lession">
              <Lession></Lession>
            </PrivateRoute>

            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/profile">
              <Profile></Profile>
            </PrivateRoute>
            <Route path="/JoinAsRider">
              <JoinAsRider></JoinAsRider>
            </Route>
            <Route path="/joinAsLearner">
              <Joinaslearner></Joinaslearner>
            </Route>
            <AdminRoute path="/dashboard">
              <Dashboard></Dashboard>
            </AdminRoute>
          </Switch>
          <Footer></Footer>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
