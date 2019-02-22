const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const scrape = require("./routes/scrapeRoute");
const posts = require("./routes/postsRoute");
const comments = require("./routes/commentRoute");

const PORT = process.env.PORT || 8080;
const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/mongoScraper",
  { useNewUrlParser: true }
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/scrape", scrape);
app.use("/comments", comments);
app.use("/", posts);

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
