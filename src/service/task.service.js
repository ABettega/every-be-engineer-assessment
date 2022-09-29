const {
  listTasksDal,
  createTaskDal,
  updateTaskStatusDal,
} = require('../dal/task.dal');

const TASK_DICTIONARY = Object.freeze({
  status_name: 'statusName',
  task_title: 'title',
  task_description: 'description',
});

const listTasksService = async () => {
  try {
    const rawTaskList = await listTasksDal();

    if (rawTaskList.length === 0) {
      return [];
    }

    const taskList = rawTaskList.map((entry) => {
      const task = {};
      Object.keys(entry).forEach((key) => {
        task[TASK_DICTIONARY[key]] = entry[key];
      });
      return task;
    });

    return taskList;
  } catch (error) {
    throw new Error(error);
  }
};

const createTaskService = async ({
  title,
  description,
  statusId,
}) => {
  try {
    const taskCreationResult = await createTaskDal({
      title,
      description,
      statusId,
    });
    return taskCreationResult;
  } catch (error) {
    throw new Error(error);
  }
};

const updateTaskStatusService = async ({
  taskId,
  statusId,
}) => {
  try {
    const taskUpdateResult = await updateTaskStatusDal({
      taskId,
      statusId,
    });
    return taskUpdateResult;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  listTasksService,
  createTaskService,
  updateTaskStatusService,
};
