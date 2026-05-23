import { Router } from "express";

import { issuesController } from "./issues.controller";

import auth from "../../middleware/auth";

const router = Router();

// create issue
router.post("/", auth, issuesController.createIssue);

// get all issues
router.get("/", issuesController.getAllIssues);

export const issuesRoute = router;
