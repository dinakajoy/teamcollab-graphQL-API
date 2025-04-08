import { mergeResolvers } from "@graphql-tools/merge";

import { userResolver } from "./user/resolver";
import { authResolver } from "./auth/resolver";

export default mergeResolvers([userResolver, authResolver]);
