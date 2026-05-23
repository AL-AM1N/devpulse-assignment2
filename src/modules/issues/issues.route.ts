import { Router } from "express";

import { issuesController } from "./issues.controller";

import auth from "../../middleware/auth";

const router = Router();

// create issue
router.post(
  "/",
  auth("contributor", "maintainer"),
  issuesController.createIssue,
);

// get all issues
router.get("/", issuesController.getAllIssues);

// get single issues
router.get("/:id", issuesController.getSingleIssue);

// update issue
router.patch(
  "/:id",
  auth("contributor", "maintainer"),
  issuesController.updateIssue,
);

// delete single issue
router.delete("/:id", auth("maintainer"), issuesController.deleteIssue);

export const issuesRoute = router;
