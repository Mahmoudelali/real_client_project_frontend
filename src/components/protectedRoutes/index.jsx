import React, { useContext } from "react";

function ProtectedRoute() {
  const isLoggedIn = useContext();
  return (
    <>
      <div>ProtectedRoute</div>
    </>
  );
}

export default ProtectedRoute;
