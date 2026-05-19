const express = require("express");
const {
  createActivity,
  getUserActivities,
  getAllActivities,
} = require("../controllers/activityController");

const router = express.Router();

router.post("/", createActivity);
router.get("/", getAllActivities);
router.get("/user/:userId", getUserActivities);

module.exports = router;