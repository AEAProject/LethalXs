import { RoleLogger } from '../Interfaces/logger-interfaces.js';
import { EmbedObject } from '../Interfaces/embed-interfaces.js';
import { GuildTextBasedChannel } from 'discord.js';
import embedUtilities from './embed-utilities.js';

class LoggerUtilities {
  public async log(channel: GuildTextBasedChannel, details: EmbedObject): Promise<void> {
    await channel.send({ embeds: [embedUtilities.createEmbed(details)] });
  }

  public formatRoleLogger(details: RoleLogger): EmbedObject {
    const obj: EmbedObject = {
      color: details.positive ? 'Green' : 'Red',
      title: details.action,
      description: `The role <@&${details.roleId}> ${details.positive ? 'was added to' : 'was removed from'} <@${details.user.id}>`
    };

    return obj;
  }
}
export default new LoggerUtilities();
