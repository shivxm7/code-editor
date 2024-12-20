var express = require("express");
var router = express.Router();
var userModel = require("../models/userModel");
var bcrypt = require("bcryptjs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/signup", async (req, res) => {
  let { username, name, email, password } = req.body;
  let emailCon = await userModel.findOne({ email: email });
  if (emailCon) {
    return res.json({ success: false, message: "Email already exists" });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        let user = userModel.create({
          username: username,
          name: name,
          email: email,
          password: hash,
        });

        return res.json({
          success: true,
          message: "User created successfully",
        });
      });
    });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.json({ success: true, message: "User login successfully" });
    } else {
      res.json({ success: false, message: "Invalid email or Password" });
    }
  } else {
    res.json({ succes: false, message: "Invalid email or Password" });
  }
});

module.exports = router;
