import React, { useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  InputAdornment,
  TextField,
  Modal,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const roleListItemStyles = {
  backgroundColor: "#ffffff",
  padding: "5px",
  paddingLeft: "20px",
  paddingRight: "20px",
  borderRadius: "0px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
  borderBottom: "2px solid rgba(0, 0, 0, 1)",
  transition: "transform 0.2s ease",
  cursor: "pointer",
};
const roleListItemHoverStyles = {
  borderBottom: "3px solid #387ADF",
  transform: "scale(1.03)",
};
const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "auto",
  backgroundColor: "#ffffff",
  borderRadius: "2px",
  padding: "15px",
};

function HeroList({ role, data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [detail, setDetail] = useState("");

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  const handleHeroItemClick = (item) => {
    setDetail(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const filteredData =
    role === "all" ? data : data.filter((item) => item.role === role);

  const roleData = filteredData.filter((item) =>
    item.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ width: "80%", textAlign: "center", margin: "auto" }}>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Typography
          variant="h6"
          style={{
            textAlign: "center",
            marginTop: "10px",
            fontWeight: "bold",
          }}
        >
          Total Hero: {roleData.length}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Grid container spacing={2} style={{ backgroundColor: "" }}>
        {roleData.length === 0 ? (
          <Typography
            variant="subtitle1"
            style={{
              textAlign: "center",
              color: "#555",
              marginTop: "20px",
              width: "100%",
            }}
          >
            Data tidak ditemukan
          </Typography>
        ) : (
          roleData.map((item) => (
            <Grid
              key={item.displayName}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{ marginTop: "5px" }}
            >
              <Paper
                style={{
                  ...roleListItemStyles,
                  height: "100%",
                  ...(hoveredItem === item ? roleListItemHoverStyles : {}),
                }}
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleHeroItemClick(item)}
              >
                <img
                  src={item.fullPortrait}
                  alt={item.displayName}
                  style={{ width: "100%", height: "auto", borderRadius: "0px" }}
                />
                <Typography
                  variant="subtitle1"
                  style={{
                    marginTop: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {item.displayName.toUpperCase()}
                </Typography>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(2px)",
            },
          },
        }}
      >
        <Box style={modalStyles}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            {detail.displayName}
          </Typography>

          {detail.video && (
            <iframe
              title={detail.video}
              src={`https://www.youtube.com/embed/${detail.video
                .split("/")
                .pop()}`}
              style={{ width: "100%", height: "50vh" }}
              allow="autoplay; encrypted-media"
            ></iframe>
          )}
          <Typography variant="h6">Description</Typography>
          <Typography variant="subtittle1">{detail.description}</Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default HeroList;
