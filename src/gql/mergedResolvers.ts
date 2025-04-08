import { mergeResolvers } from "@graphql-tools/merge";

import { userResolver } from "./user/resolver";
import { authResolver } from "./auth/resolver";
import { teamResolver } from "./team/resolver";

export default mergeResolvers([userResolver, authResolver, teamResolver]);
