import { BaseCollectionObject } from "../abstract/base-collection-definitions.js";

export type Guild = {
  guildId: string;
  adminChannelId: string;
};

export type GuildObject = BaseCollectionObject & Guild;
