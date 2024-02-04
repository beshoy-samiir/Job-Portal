import express from "express";
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  jobStatsController,
  updateJobController,
} from "../controllers/jobsController.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/createJob", userAuth, createJobController);

router.get("/getJob", userAuth, getAllJobsController);

router.patch("/updateJob/:id", userAuth, updateJobController);

router.delete("/deleteJob/:id", userAuth, deleteJobController);

router.get("/jobStats", userAuth, jobStatsController);

export default router;