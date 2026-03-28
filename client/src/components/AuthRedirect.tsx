import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { type RootState } from "../store";

export const AuthRedirect = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  if (token) return <Navigate to="/dashboard" />;
  return <Navigate to="/login" />;
};

export default AuthRedirect;
