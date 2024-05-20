import { BaseCollectionObject } from "../abstract/base-collection-definitions.js";

export type Region = {
  guildId: string;
  threadId: string;
  role: string;
  server: RegionServer;
  leader: string;
  certifiedTester: string[];
};

export enum RegionServer {
  EU = "Europe",
  NA = "North America",
  AS = "Asia"
}

export type RegionObject = BaseCollectionObject & Region;

export enum RegionMessages {
  BasicCreationSuccess = "Region created successfully.\nUse add/remove-region-tester to add testers to the region.",
  BasicCreationFailure = "Region creation failed.\nPlease try again later or contact developer for further information.",
  BasicCreationExists = "Region already exists, please remove it before attempting or try adding a different region."
}
