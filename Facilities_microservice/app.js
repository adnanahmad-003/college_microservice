const express = require("express");
const campusFacilities = require("./data");

const app = express();
const PORT = 3006;

// Endpoint to get all campus facilities
app.get("/facilities", (req, res) => {
  res.json(campusFacilities);
});

// Endpoint to search for a block by name
app.get("/facilities/:block", (req, res) => {
    const block = req.params.block;
    const blockData = campusFacilities[block];
  
    if (blockData) {
      res.json(blockData);
    } else {
      res.status(404).json({ error: "Block not found." });
    }
  });
  
// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the IIIT Dharwad Campus Facilities!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
