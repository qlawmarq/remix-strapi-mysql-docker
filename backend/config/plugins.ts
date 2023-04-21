import { join } from "path";
export default {
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: true,
      generateArtifacts: true,
      artifacts: {
        schema: join(__dirname, "..", "..", "public/schema.graphql"),
        typegen: join(__dirname, "..", "..", "types/types.d.ts"),
      },
    },
  },
};
