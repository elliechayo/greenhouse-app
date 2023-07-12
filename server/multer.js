const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = new Date().getTime() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
module.exports = upload;
