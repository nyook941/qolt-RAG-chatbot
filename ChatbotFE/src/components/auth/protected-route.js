import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const idToken = localStorage.getItem("idToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (idToken) {
        const payload = JSON.parse(atob(idToken.split(".")[1]));

        if (payload.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
        } else if (refreshToken) {
          const cognitoUser = userPool.getCurrentUser();
          if (cognitoUser) {
            cognitoUser.refreshSession(
              { getToken: () => refreshToken },
              (err, session) => {
                if (err) {
                  console.error("Session refresh failed:", err);
                  setIsAuthenticated(false);
                } else {
                  const newIdToken = session.getIdToken().getJwtToken();
                  const newAccessToken = session.getAccessToken().getJwtToken();

                  localStorage.setItem("idToken", newIdToken);
                  localStorage.setItem("accessToken", newAccessToken);
                  setIsAuthenticated(true);
                }
              }
            );
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
