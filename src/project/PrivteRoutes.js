import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./ptroutes"; // Import Firebase auth
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const PrivateRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
