import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import RolePage from "./components/RolePage";
import Valo from "./valo.png";

const roleListStyles = {
  display: "flex",
  justifyContent: "center",
  overflowX: "auto",
  padding: "10px",
  backgroundColor: "#070F2B",
};
const activeCategoryButtonStyles = {
  borderBottom: "2px solid white",
};
function App() {
  const [data, setData] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState(null);

  const [activeCategory, setActiveCategory] = useState();

  useEffect(() => {
    fetch("https://staging.ina17.com/data.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const categories = ["all", ...new Set(data.map((item) => item.role))];
        setUniqueCategories(categories);
      });
  }, []);
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  return (
    <Router>
      <div style={{paddingBottom: "5%", backgroundColor: "#F5F7F8", minHeight: "90vh"}} >
        <div
          style={{
            backgroundColor: "#535C91",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5px",
          }}
        >
          <img src={Valo} alt="Valorant" style={{ width: "10%" }} />
        </div>

        <div style={roleListStyles}>
          {uniqueCategories &&
            uniqueCategories.map((category) => (
              <Button
                key={category}
                variant="text"
                component={Link}
                to={`/role/${category}`}
                style={{
                  borderRadius: "0px",
                  marginRight: "10px",
                  color: "white",
                  ...(activeCategory === category
                    ? activeCategoryButtonStyles
                    : {}),
                }}
                onClick={() => handleCategoryChange(category)}
              >
                {category === "all" ? "all" : category}
              </Button>
            ))}
        </div>

        <Routes>
          <Route path="/role/*" element={<RolePage data={data} />} />
          <Route path="/*" element={<Navigate to="/role/all" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
