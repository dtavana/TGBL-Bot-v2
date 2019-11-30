import { Inhibitor } from 'discord-akairo';
import { Message } from 'discord.js';
import { SETTINGS } from '../../lib/constants';

export default class BlacklistInhibitor extends Inhibitor {
    public constructor() {
        super('blacklist', {
            reason: 'blacklist',
        });
    }

    public async exec(message: Message) {
        if(message.guild) {
            const blacklist = JSON.parse(await this.client.settings.get(message.guild, SETTINGS.BLACKLIST));
            return blacklist.includes(message.author.id);
        }
    }
}
