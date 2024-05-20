import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  Client,
  SlashCommandStringOption,
  SlashCommandUserOption,
  SlashCommandRoleOption
} from "discord.js";
import { RegionServer } from "../../Features/region/region-collection-definitions.js";
import regionUtilities from "../../Features/region/region-utilities.js";
import regionLogic from "../../Features/region/region-logic.js";

export default {
  data: defineSlashCommand(),
  async execute(interaction: ChatInputCommandInteraction, client: Client) {
    const server = interaction.options.get("server")?.value as RegionServer;
    const leader = interaction.options.get("leader")?.value as string;
    const role = interaction.options.get("role")?.value as string;

    const notification = await regionLogic.createBasicRegion(interaction.guildId as string, server, leader, role);

    return { content: notification, ephemeral: true };
  }
};

function defineSlashCommand() {
  return new SlashCommandBuilder()
    .setName("create-region")
    .setDescription("Creates a new region.")
    .addStringOption((option: SlashCommandStringOption) =>
      option.setName("server").setDescription("Server").setRequired(true).addChoices(regionUtilities.getServerChoices())
    )
    .addUserOption((option: SlashCommandUserOption) => option.setName("leader").setDescription("Region leader").setRequired(true))
    .addRoleOption((option: SlashCommandRoleOption) => option.setName("role").setDescription("Unique member role").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
}
