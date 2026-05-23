import { Router } from "express";

import { issuesController } from "./issues.controller";

import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router();

// create issue
router.post(
  "/",
  auth(USER_ROLE.contributor, USER_ROLE.maintainer),
  issuesController.createIssue,
);

// get all issues
router.get("/", issuesController.getAllIssues);

// get single issues
router.get("/:id", issuesController.getSingleIssue);

// update issue
router.patch(
  "/:id",
  auth(USER_ROLE.contributor, USER_ROLE.maintainer),
  issuesController.updateIssue,
);

// delete single issue
router.delete("/:id", auth(USER_ROLE.maintainer), issuesController.deleteIssue);

export const issuesRoute = router;
