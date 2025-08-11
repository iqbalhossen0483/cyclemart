import { Navigate, useLocation } from "react-router";
import useFirebase from "../Hook/useFirebase";

const PrivateRoute = ({ element }) => {
  const { user, isLoading } = useFirebase();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return user.email ? (
    element
  ) : (
    <Navigate to="/log-in" state={{ from: location }}></Navigate>
  );
};

export default PrivateRoute;
