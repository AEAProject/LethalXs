import BaseCollection from "../abstract/base-collection.js";
import { GuildObject } from "./tryout-collection-definitions.js";

class GuildCollection extends BaseCollection<GuildObject> {
  constructor() {
    super("guild");
  }

  public async insertGuild(guildId: string) {
    return this.insert({ guildId, adminChannelId: "" });
  }

  public async destroyGuild(guildId: string) {
    return this.deleteByQuery({ guildId });
  }

  public async setAdminChannel(guildId: string, adminChannelId: string) {
    return this.update({ guildId }, { adminChannelId });
  }
}

export default new GuildCollection();
