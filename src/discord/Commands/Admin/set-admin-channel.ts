import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client, SlashCommandChannelOption, ChannelType } from "discord.js";
import guildCollection from "../../Features/guild/guild-collection.js";

export default {
  data: defineSlashCommand(),
  async execute(interaction: ChatInputCommandInteraction, client: Client) {
    const channel = interaction.options.get("admin-channel")?.channel;
    let message = "";

    if (channel?.type === ChannelType.GuildText) {
      await guildCollection.updateGuild(interaction.guildId as string, { adminChannelId: channel.id });

      message = `Admin channel was set as <#${channel.id}>.`;
    } else {
      message = `Invalid channel type, make sure the type is a text channel.`;
    }

    return { content: message, ephemeral: true };
  }
};

function defineSlashCommand() {
  return new SlashCommandBuilder()
    .setName("set-admin-channel")
    .setDescription("Sets the admin channel.")
    .addChannelOption((option: SlashCommandChannelOption) => option.setName("admin-channel").setDescription("Set the administration channel.").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
}
