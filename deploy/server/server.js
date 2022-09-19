const express = require("express");
const path = require("path");

const app = express();

const distPath = path.join(__dirname, "..", "..", "dist");

app.use("/boomjar", express.static(distPath));

app.get("/boomjar*", function (_, res) {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(process.env.PORT ?? 4000);
