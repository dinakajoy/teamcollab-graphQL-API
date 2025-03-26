import { mergeResolvers } from "@graphql-tools/merge";

import { authorResolver } from "./author/resolver";
import { userResolver } from "./user/resolver";

export const resolvers = mergeResolvers([userResolver, authorResolver]);
