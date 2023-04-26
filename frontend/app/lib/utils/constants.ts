/**
 * Data retrieval method
 * 'json': Retrieve from a json file that generated before and already exist
 * 'api': Retrieve from GraphQL api
 */

type DataRetrievalMethod = "json" | "api";

export const APP_DATA_RETRIEVAL_METHOD: DataRetrievalMethod =
  (process.env.APP_DATA_RETRIEVAL_METHOD as DataRetrievalMethod) || "json";
