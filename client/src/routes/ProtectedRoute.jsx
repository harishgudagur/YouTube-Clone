// import { Navigate } from "react-router-dom";

// function ProtectedRoute({
//   children,
// }) {
//   const token =
//     localStorage.getItem(
//       "token"
//     );

//   if (!token) {
//     return (
//       <Navigate
//         to="/login"
//       />
//     );
//   }

//   return children;
// }

// export default ProtectedRoute;

import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation(); // This tracks where the user currently is

  if (!token) {
    // We pass the current location into the state of the Navigate component
    // so the Login page knows where to send the user after they sign in.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
