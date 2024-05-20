import regionCollection from "./region-collection.js";
import { RegionMessages, RegionServer } from "./region-collection-definitions.js";
import regionUtilities from "./region-utilities.js";
import guildCollection from "../guild/guild-collection.js";
import discordUtilities from "../../../Utilities/discord-utilities.js";
import { BaseGuildTextChannel } from "discord.js";

class RegionLogic {
  public async createBasicRegion(guildId: string, server: RegionServer, leader: string, role: string): Promise<RegionMessages> {
    if (this.doesRegionExist(guildId, server)) {
      return RegionMessages.BasicCreationExists;
    }

    const threadId = await this.createRegionThread(guildId, server);

    if (threadId) {
      const basicRegion = regionUtilities.formatBasicRegion(guildId, server, leader, role, threadId);
      await regionCollection.insertRegion(basicRegion);
      return RegionMessages.BasicCreationSuccess;
    }

    return RegionMessages.BasicCreationFailure;
  }

  public async createRegionThread(guildId: string, server: RegionServer) {
    const adminChannelId = (await guildCollection.getByGuild(guildId)).adminChannelId;
    const channel = discordUtilities.getClient().guilds.cache.get(guildId)?.channels.cache.get(adminChannelId) as BaseGuildTextChannel;

    if (channel) {
      const message = await channel.send(`${server} tryouts list`);
      const thread = await message.startThread({ name: `${server} tryouts list` });

      return thread.id;
    }

    return null;
  }

  public doesRegionExist(guildId: string, server: RegionServer): Boolean {
    return regionCollection.getServerCache()[guildId].includes(server);
  }
}

export default new RegionLogic();
