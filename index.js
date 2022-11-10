const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fileUpload = require("express-fileupload");

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/fileanalyse", (req, res) => {
  if (!req.files) {
    res.send("Error: No file uploaded.");
  } else {
    res.json({
      name: req.files.upfile.name,
      type: req.files.upfile.mimetype,
      size: req.files.upfile.size,
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
