var express = require("express");
var router = express.Router();
var userModel = require("../models/userModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var projectModel = require("../models/projectModel");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

let secret = "secret"; // secret token for jwt

// Sign up API
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

// Login API
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });

  if (user) {
    // Rename the second `res` to avoid conflict
    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) {
        return res.json({
          success: false,
          message: "An error occurred",
          error: err,
        });
      }
      if (isMatch) {
        let token = jwt.sign({ email: user.email, userId: user._id }, secret);
        return res.json({
          success: true,
          message: "User logged in successfully",
          token: token,
          userId: user._id,
        });
      } else {
        return res.json({
          success: false,
          message: "Invalid email or password",
        });
      }
    });
  } else {
    return res.json({ success: false, message: "User not found!" });
  }
});

// User detail API
router.post("/getUserDetails", async (req, res) => {
  let { userId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    return res.json({
      success: true,
      messgae: "User details fetch succesfully",
      user: user,
    });
  } else {
    return res.json({ success: false, message: "User not found" });
  }
});

// createProject API
router.post("/createProject", async (req, res) => {
  let { userId, title } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.create({
      title: title,
      createdBy: userId,
    });

    return res.json({
      success: true,
      message: "project created succesfully",
      projectId: project._id,
    });
  } else {
    return res.json({ success: false, message: "user not found" });
  }
});

// fetching projects by user
router.post("/getProjects", async (req, res) => {
  let { userId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let projects = await projectModel.find({ createdBy: userId });
    return res.json({
      success: true,
      message: "project fetch successfully",
      projects: projects,
    });
  } else {
    return res.json({ success: false, message: "user not found" });
  }
});

router.post("/deleteProject", async (req, res) => {
  let { userId, progId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOneAndDelete({ _id: progId });
    return res.json({ success: true, message: "Project deleted successfully" });
  } else {
    return res.json({ success: false, message: "User not found" });
  }
});

router.post("/getProject", async (req, res) => {
  let { userId, projId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOne({ _id: projId });
    if (!project) {
      return res.json({
        success: false,
        message: "Project not found",
      });
    } else {
      return res.json({
        success: true,
        message: "Project fetch successfully",
        project: project,
      });
    }
  } else {
    return res.json({ success: false, message: "User not found" });
  }
});

router.post("/updateProject", async (req, res) => {
  let { userId, projId, htmlCode, cssCode, jsCode } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOneAndUpdate(
      { _id: projId },
      { htmlCode: htmlCode, cssCode: cssCode, jsCode: jsCode },
      { new: true }
    );

    if (project) {
      return res.json({
        success: true,
        messgae: "Project updated successfully",
      });
    } else {
      return res.json({ success: false, message: "Project not found!" });
    }
  } else {
    return res.json({ success: false, messgae: "user not found" });
  }
});
module.exports = router;
