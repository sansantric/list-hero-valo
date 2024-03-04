import React, { useEffect } from "react";
import { useLocation,Routes, Route, useNavigate } from "react-router-dom";
import HeroList from "./HeroList";

function RolePage({ data }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  console.log("pathname", pathname);
  const role = pathname.split("/").pop() || "all";
//   useEffect(() => {
//     if (
//       window.performance &&
//       window.performance.navigation.type ===
//         window.performance.navigation.TYPE_NAVIGATE
//     ) {
//       navigate("/role/all");
//     }
//   }, [navigate]);

  useEffect(() => {
    if (role !== pathname.split("/").pop()) {
      navigate(`/role/${role}`);
    }
  }, [role, pathname, navigate]);

  return (
    <Routes>
      <Route path="/*" element={<HeroList role={role} data={data} />} />
    </Routes>
  );
}

export default RolePage;
