import { Navigate, useLocation } from "react-router";
import useFirebase from "../../Hook/useFirebase";

const CheckAdmin = ({ children }) => {
  const { user, isLoading, isAdmin } = useFirebase();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return user.email && isAdmin ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }}></Navigate>
  );
};

export default CheckAdmin;
