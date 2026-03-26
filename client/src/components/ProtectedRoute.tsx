import { useSelector } from "react-redux";
import { type RootState } from "../store";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const token = useSelector((state: RootState) => state.auth.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};
