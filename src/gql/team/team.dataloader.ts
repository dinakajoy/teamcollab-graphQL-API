import DataLoader from "dataloader";
import { Types } from "mongoose";
import Team, { TeamDocument } from "../../models/team";

const createTeamLoader = (): DataLoader<Types.ObjectId, TeamDocument | null> =>
  new DataLoader(async (teamIds: readonly Types.ObjectId[]) => {
    const teams = await Team.find({ _id: { $in: teamIds } });
    const teamMap = new Map(teams.map((team) => [team._id.toString(), team]));
    return teamIds.map((id) => teamMap.get(id.toString()) || null);
  });

export default createTeamLoader;
