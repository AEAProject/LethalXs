import BaseCollection from "../abstract/base-collection.js";
import { Guild, GuildObject } from "./guild-collection-definitions.js";

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

  public async updateGuild(guildId: string, ...args: Partial<Guild>[]) {
    return this.update({ guildId }, Object.assign({}, ...args));
  }

  public async getByGuild(guildId: string) {
    return this.getOneByQuery({ guildId });
  }
}

export default new GuildCollection();
