import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouteRole = ({ allowedRoles, children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRouteRole;
