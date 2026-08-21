import express from "express";

const app = express();

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "kredo API is running successfully" });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
