import DataLoader from "dataloader";
import { Types } from "mongoose";
import Project, { ProjectDocument } from "../../models/project";

const createProjectLoader = (): DataLoader<
  Types.ObjectId,
  ProjectDocument | null
> =>
  new DataLoader<Types.ObjectId, ProjectDocument | null>(async (projectIds: readonly Types.ObjectId[]) => {
    const projects = await Project.find({ _id: { $in: projectIds } });
    const projectMap = new Map(
      projects.map((project) => [project._id.toString(), project])
    );
    return projectIds.map((id) => projectMap.get(id.toString()) || null);
  });

export default createProjectLoader;
