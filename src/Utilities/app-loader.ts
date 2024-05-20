import regionCollection from "../discord/Features/region/region-collection.js";
import discordUtilities from "./discord-utilities.js";
import mongoUtilities from "./mongo-utilities.js";

class AppLoader {
  public async initialize() {
    await mongoUtilities.connectToDB();
    await regionCollection.initializeRegionCache();
    await discordUtilities.initialize();
  }
}

export default new AppLoader();
