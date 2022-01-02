import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseInitialization from "./../firebase/firebase.init.js";
import Swal from "sweetalert2";
firebaseInitialization();

const auth = getAuth();

const useFirebase = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);

  // clear error
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  // Email sign in
  function signInWithEmail({ email, password, history, redirect }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        history.replace(redirect);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login success!",
          text: "Have a fun!",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "opps!",
          text: `${err.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  }

  // Get the currently signed-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (signedInUser) => {
      if (signedInUser) {
        setUser(signedInUser);
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  // sign out
  function logOut() {
    signOut(auth)
      .then((res) => {
        setUser({});
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  // sign up with email password
  function singUp() {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
      })
      .catch((err) => {
        alert("opps");
        setLoading(false);

        setError(err.message);
      });
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    signInWithEmail,
    logOut,
    user,
    setUser,
    error,
    setError,
    singUp,
    loading,
    setLoading,
  };
};

export default useFirebase;
