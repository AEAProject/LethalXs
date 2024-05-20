import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client } from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("tryout").setDescription("Ask to be tried out for the team."),
  execute(interaction: ChatInputCommandInteraction, client: Client) {
    interaction.reply({ content: "Pong", ephemeral: true });
  }
};
