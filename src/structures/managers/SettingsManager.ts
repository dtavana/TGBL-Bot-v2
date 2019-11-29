import { Provider } from 'discord-akairo';
import { Guild } from 'discord.js';
import { MESSAGES } from '../../lib/constants';
import TGBLClient from '../client/TGBLClient';

export default class SettingsManager extends Provider {

    private static getGuildId(guild: string | Guild) {
        if (guild instanceof Guild) { return guild.id; }
        if (guild === 'global' || guild === null) { return '0'; }
        if (/^\d+$/.test(guild)) { return guild; }
        throw new TypeError('Invalid guild specified. Must be a Guild instance, guild ID, "global", or null.');
    }
    public client: TGBLClient;
    public cache;
    public constructor(client: TGBLClient) {
        super();
        this.client = client;
        this.cache = this.client.cache;
    }

    public async init(): Promise<void> {
        this.client.sendLog(MESSAGES.SETTINGS_MANAGER.LOADED);
    }

    public async clear(guild: string | Guild): Promise<void> {
        const id = SettingsManager.getGuildId(guild);
        await this.cache.del(id);
    }

    public async delete(guild: string | Guild, key: string): Promise<void> {
        const id = SettingsManager.getGuildId(guild);
        await this.cache.hdel(id, key);
    }

    public async get(guild: string | Guild, key: string): Promise<any> {
        const id = SettingsManager.getGuildId(guild);
        return await this.cache.hgetall(id, key);
    }

    public async set(guild: string | Guild, key: string, value: any): Promise<void> {
        const id = SettingsManager.getGuildId(guild);
        await this.cache.hset(id, key, value);
    }
}
