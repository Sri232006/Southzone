import { Navigate } from "react-router-dom";

function GuestRoute({ children }) {

  const token = localStorage.getItem("authToken");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default GuestRoute;