import { Navigate, useLocation } from "react-router";
import useFirebase from "../../Hook/useFirebase";

const CheckAdmin = ({ element }) => {
    const { user, isLoading, isAdmin } = useFirebase();
    const location = useLocation();

    if (isLoading) {
        return <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    }

    return user.email && isAdmin ? element : <Navigate to="/" state={{ from: location }}></Navigate>

};

export default CheckAdmin;