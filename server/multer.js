const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "./public/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueName = new Date().getTime() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
module.exports = upload;

