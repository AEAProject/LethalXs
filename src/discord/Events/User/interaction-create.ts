import { Client, CommandInteraction } from "discord.js";
import discordUtilities from "../../../Utilities/discord-utilities.js";

export default {
  name: "interactionCreate",
  async execute(interaction: CommandInteraction, client: Client) {
    await commandHandler(interaction, client);
  }
};

async function commandHandler(interaction: CommandInteraction, client: Client) {
  if (interaction.isChatInputCommand()) {
    discordUtilities.logTriggeredCommand(interaction.commandName);
    let response;

    try {
      response = await discordUtilities.getCommands()[interaction.commandName](interaction, client);
    } catch (err) {
      response = { content: `Internal error occurred while running "${interaction.commandName}.`, ephemeral: true };
    } finally {
      interaction.reply(response);
    }
  }
}
