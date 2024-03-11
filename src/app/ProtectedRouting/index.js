import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSnakeBarContent } from "../../action";
import { getToken } from "../../session";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const user = getToken();

  useEffect(() => {
    if (user === null || user === undefined) {
      dispatch(setSnakeBarContent("You are required to Login first"));
    }
  }, []);

  if (user === null || user === undefined) {
    return <Navigate to="/" replace={true} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
