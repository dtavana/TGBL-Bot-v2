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
        const id = message.guild?.id;
        const blacklist = JSON.parse(await this.client.settings.get(id, SETTINGS.BLACKLIST));
        return blacklist.includes(message.author.id);
    }
}
