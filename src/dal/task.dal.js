const sql = require('./database');

const listTasksDal = async () => {
  try {
    const queryResult = await sql`
      SELECT
        t.task_title,
        t.task_description,
        s.status_name
      FROM tasks t
      JOIN task_status s
      ON t.task_status_id = s.id;
    `;
    return queryResult;
  } catch (error) {
    throw new Error(error);
  }
};

const createTaskDal = async ({
  title,
  description,
  statusId,
}) => {
  try {
    const validIdResult = await sql`
      SELECT id
      FROM task_status
      WHERE id = ${statusId};
    `;

    if (!validIdResult) {
      return {
        success: false,
        message: 'Invalid status!',
      };
    }

    await sql`
      INSERT INTO tasks
      (
        task_title, task_description, task_status_id
      )
      VALUES
      (
        ${title}, ${description}, ${statusId}
      );
    `;
    // await sql`
    //   INSERT INTO tasks
    //   (
    //     task_title, task_description, task_status_id
    //   )
    //   SELECT ${title}, ${description}, ${statusId}
    //   WHERE EXISTS (SELECT *
    //                 FROM task_status
    //                 WHERE id = ${statusId});
    // `;

    return {
      success: true,
      message: 'Task created successfully!',
    };
  } catch (error) {
    throw new Error(error);
  }
};

const updateTaskStatusDal = async ({
  taskId,
  statusId,
}) => {
  try {
    const validIdResult = await sql`
      SELECT id
      FROM task_status
      WHERE id = ${statusId};
    `;

    if (!validIdResult) {
      return {
        success: false,
        message: 'Invalid status!',
      };
    }

    await sql`
      UPDATE tasks t
      SET task_status_id = ${statusId}
      FROM task_status s
      WHERE ${statusId} IN (s.id)
      AND ${taskId} IN (t.id)
      RETURNING *;
    `;

    return {
      success: true,
      message: 'Task updated successfully!',
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  listTasksDal,
  createTaskDal,
  updateTaskStatusDal,
};
