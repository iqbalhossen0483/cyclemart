import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Authentication from "./Authentication";

const Firebase = () => {
  Authentication();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [hideUserInfo, setHideUserInfo] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  const alart = useAlert();

  //google log in
  const logInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  //sign up with email pass
  const singUPWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const userName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  //log in with email pass
  const logInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //sign out
  const lognOut = () => {
    signOut(auth)
      .then((result) => {
        setHideUserInfo(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //create user to database
  const makeUser = async (name, email) => {
    try {
      const userInfo = {
        displayName: name,
        email: email,
        imgUrl: null,
        imgId: null,
      };
      const res = await fetch("http://localhost:5000/cyclemart/users", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
      localStorage.setItem("token", JSON.stringify(`Bearar ${data.token}`));
    } catch (error) {
      throw error;
    }
  };

  // chect user is admin
  const checkUser = async (email) => {
    try {
      const res = await fetch(
        `http://localhost:5000/cyclemart/users/login/${email}`
      );
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("token", JSON.stringify(`Bearar ${data.token}`));
        if (data.admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else throw Error(data.message);
    } catch (error) {
      setUser({});
      alart.show(error.message);
    }
  };

  //observe user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await checkUser(user.email);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, isAdmin]);

  return {
    logInWithGoogle,
    user,
    lognOut,
    singUPWithEmail,
    userName,
    logInWithEmail,
    isLoading,
    makeUser,
    isAdmin,
    hideUserInfo,
    setHideUserInfo,
    showCart,
    setShowCart,
    quantity,
    setQuantity,
  };
};

export default Firebase;
