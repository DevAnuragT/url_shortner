const express = require("express");
const app = express();
const port = 8001;

const URL = require("./models/url");

// Move middleware ABOVE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const urlRouter = require("./routes/url");
app.use("/url", urlRouter);

const { connectToMongoDB } = require("./connect");
connectToMongoDB("mongodb://localhost:27017/url-shortener")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: {timestamp:  Date.now()} } }
  );
  if (!entry) {
    return res.status(404).json({ message: "Url not found" });
  }

  return res.redirect(entry.redirectUrl);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
