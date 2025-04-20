import DataLoader from "dataloader";
import { Types } from "mongoose";
import Task, { TaskDocument } from "../../models/task.js";

const createTaskLoader = (): DataLoader<Types.ObjectId, TaskDocument | null> =>
  new DataLoader<Types.ObjectId, TaskDocument | null>(async (taskIds: readonly Types.ObjectId[]) => {
    const tasks = await Task.find({ _id: { $in: taskIds } });
    const taskMap = new Map(tasks.map((task) => [task._id.toString(), task]));
    return taskIds.map((id) => taskMap.get(id.toString()) || null);
  });

export default createTaskLoader;
