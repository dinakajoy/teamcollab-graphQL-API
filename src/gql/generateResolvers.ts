import { mergeResolvers } from "@graphql-tools/merge";

import { userResolver } from "./user/resolver.js"
import { authResolver } from "./auth/resolver.js"

export default mergeResolvers([userResolver, authResolver]);
