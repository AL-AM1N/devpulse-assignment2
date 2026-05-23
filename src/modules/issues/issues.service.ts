import { pool } from "../../db";

const createIssueIntoDB = async (
  payload: {
    title: string;
    description: string;
    type: string;
  },
  reporter_id: number,
) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `
      INSERT INTO issues(title, description, type, reporter_id)

      VALUES($1, $2, $3, $4)

      RETURNING *
    `,
    [title, description, type, reporter_id],
  );

  return result;
};

// get all issues
const getAllIssuesFromDB = async (
  sort: string,
  type: string,
  status: string,
) => {
  let query = `
    SELECT * FROM issues
  `;

  const conditions: string[] = [];
  const values: string[] = [];

  // filtering
  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  // add where condition
  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  // sorting
  if (sort === "oldest") {
    query += ` ORDER BY created_at ASC`;
  } else {
    query += ` ORDER BY created_at DESC`;
  }

  const issuesResult = await pool.query(query, values);

  const issues = issuesResult.rows;

  // fetch reporter data separately
  const formattedIssues = await Promise.all(
    issues.map(async (issue) => {
      const reporterResult = await pool.query(
        `
          SELECT id, name, role
          FROM users
          WHERE id = $1
        `,
        [issue.reporter_id],
      );

      return {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,

        reporter: reporterResult.rows[0],

        created_at: issue.created_at,
        updated_at: issue.updated_at,
      };
    }),
  );

  return formattedIssues;
};

// get single issue
const getSingleIssueFromDB = async (id: string) => {
  const issueResult = await pool.query(
    `
      SELECT * FROM issues WHERE id=$1
      `,
    [id],
  );

  // check issue exists
  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

  // get reporter info
  const reporterResult = await pool.query(
    `
    SELECT id, name, role
    FROM users
    WHERE id=$1
    `,
    [issue.reporter_id],
  );

  const reporter = reporterResult.rows[0];

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,

    reporter,

    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};

const updateIssueIntoDB = async (
  id: string,
  payload: {
    title?: string;
    description?: string;
    type?: string;
  },
  user: any,
) => {
  // get specific issue
  const issueResult = await pool.query(
    `
      SELECT * FROM issues
      WHERE id = $1
    `,
    [id],
  );

  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

  // check role
  if (user.role === "contributor") {
    // own issue check
    if (issue.reporter_id !== user.id) {
      throw new Error("You can update only your own issue");
    }

    // status check
    if (issue.status !== "open") {
      throw new Error("You can update issue only when status is open");
    }
  }

  const { title, description, type } = payload;

  const result = await pool.query(
    `
      UPDATE issues

      SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        type = COALESCE($3, type),
        updated_at = NOW()

      WHERE id = $4

      RETURNING *
    `,
    [title, description, type, id],
  );

  return result;
};

export const issuesService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB,
};
