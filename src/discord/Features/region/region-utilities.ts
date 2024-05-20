import { Region, RegionServer } from "./region-collection-definitions.js";

class RegionUtilities {
  public isValidServer(server: string): Boolean {
    for (const [key, value] of Object.entries(RegionServer)) {
      if (value === server) {
        return true;
      }
    }

    return false;
  }

  public formatBasicRegion(guildId: string, server: RegionServer, leader: string, role: string, threadId: string): Region {
    return {
      guildId,
      threadId,
      role,
      server,
      leader,
      certifiedTester: []
    };
  }

  public getServerChoices() {
    const choices = [];

    for (const [key, value] of Object.entries(RegionServer)) {
      choices.push({ name: key, value: value });
    }

    return choices;
  }
}

export default new RegionUtilities();
