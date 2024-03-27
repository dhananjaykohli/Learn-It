import { useEffect } from "react";

import { useNavigate } from "react-router";
import useLocalStorage from "../services/hooks/useLocalStorage";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { getItem } = useLocalStorage("user");
  useEffect(() => {
    if (!getItem()) {
      navigate("/", { replace: true });
    }
  }, [navigate, getItem()]);
  return children;
};

export default ProtectedRoute;
