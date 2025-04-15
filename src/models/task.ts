import mongoose, { Schema, Types, Document } from "mongoose";

export enum TaskStatusEnum {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface TaskDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  status: TaskStatusEnum;
  project: Types.ObjectId;
}

const TaskSchema = new Schema<TaskDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: Object.values(TaskStatusEnum),
      default: TaskStatusEnum.TODO,
    },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model<TaskDocument>("Task", TaskSchema);
export default Task;
