import consoleUtilities from "../../../Utilities/console-utilities.js";
import BaseCollection from "../abstract/base-collection.js";
import { Region, RegionServer, RegionObject } from "./region-collection-definitions.js";

class RegionCollection extends BaseCollection<RegionObject> {
  private serverCache: Record<string, RegionServer[]> = {};

  constructor() {
    super("region");
  }

  public async insertRegion(region: Region) {
    this.addServerToCache(region.guildId, region.server);
    return this.insert({ ...region });
  }

  public async destroyRegion(guildId: string, server: RegionServer) {
    this.deleteServerFromCache(guildId, server);
    return this.deleteByQuery({ guildId, server });
  }

  public async updateRegion(guildId: string, server: RegionServer, ...args: Partial<Region>[]) {
    return this.update({ guildId, server }, Object.assign({}, ...args));
  }

  public async initializeRegionCache() {
    const regions = await this.getAll();

    regions.forEach(({ guildId, server }) => this.addServerToCache(guildId, server));

    consoleUtilities.log("Server cache loaded successfully", "DISCORD", "app-load-process");
  }

  private deleteServerFromCache(guildId: string, server: RegionServer) {
    this.serverCache[guildId] = this.serverCache[guildId].filter((s) => s !== server);
  }

  private addServerToCache(guildId: string, server: RegionServer) {
    if (!this.serverCache[guildId]) {
      this.serverCache[guildId] = [];
    }

    this.serverCache[guildId].push(server);
  }

  public getServerCache() {
    return this.serverCache;
  }

  public getRegionByGuild(guildId: string, server: RegionServer) {
    return this.getOneByQuery({ guildId, server });
  }
}

export default new RegionCollection();
