import { Guild } from "discord.js";
import guildCollection from "../../Features/guild/guild-collection.js";
import consoleUtilities from "../../../Utilities/console-utilities.js";

export default {
  name: "guildDelete",
  async execute(guild: Guild) {
    await guildCollection.destroyGuild(guild.id);
    consoleUtilities.log(`Guild "${guild.name}" (${guild.id}) record has been removed successfully.`, "DISCORD", "guildDelete");
  }
};
