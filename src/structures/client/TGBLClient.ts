import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo';
import { join } from 'path';
import { MESSAGES } from '../../lib/constants';
import BaseLogger from '../logging/BaseLogger';
import ConsoleLogger from '../logging/ConsoleLogger';
import SettingsManager from '../managers/SettingsManager';
import redisClient from '../util/redisClient';

declare module 'discord-akairo' {
    interface AkairoClient {
        cache;
        commandHandler: CommandHandler;
        loggers: BaseLogger[];
        sendLog: (payload: string) => void;
        settings: SettingsManager;
    }
}

export default class TGBLClient extends AkairoClient {
    public loggers: BaseLogger[] = [new ConsoleLogger()];

    public cache = redisClient;

    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, '..', 'commands'),
        prefix: process.env.DEFAULT_PREFIX, // Change to PrefixSupplier
        aliasReplacement: /-/g,
        handleEdits: true,
        commandUtil: true,
        defaultCooldown: 3000,
        ignoreCooldown: process.env.OWNERS,
        ignorePermissions: process.env.OWNERS,
        argumentDefaults: {
            prompt: {
                modifyStart: (_, str) => MESSAGES.COMMAND_HANDLER.PROMPT.MODIFY_START(str),
                modifyRetry: (_, str) => MESSAGES.COMMAND_HANDLER.PROMPT.MODIFY_RETRY(str),
                timeout: MESSAGES.COMMAND_HANDLER.PROMPT.TIMEOUT,
                ended: MESSAGES.COMMAND_HANDLER.PROMPT.ENDED,
                cancel: MESSAGES.COMMAND_HANDLER.PROMPT.CANCEL,
            },
            otherwise: '',
        },
    });

    public inhibitorHandler = new InhibitorHandler(this, { directory: join(__dirname, '..', 'inhibitors') });

    public listenerHandler = new ListenerHandler(this, { directory: join(__dirname, '..', 'listeners') });

    public constructor() {
        // Initialize Client
        super(
            { ownerID: process.env.OWNERS },
            {
                messageCacheMaxSize: 1000,
                disableEveryone: true,
                disabledEvents: ['TYPING_START'],
            },
        );
    }

    public sendLog = (payload: string) => {
        for (const logger of this.loggers) {
            logger.sendLog(payload);
        }
    }

    public async start() {
        await this._init();
        this.login(process.env.BOT_TOKEN);
    }

    private async _init() {
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler,
        });
        this.commandHandler.loadAll();
        this.sendLog(MESSAGES.COMMAND_HANDLER.LOADED);
        this.inhibitorHandler.loadAll();
        this.sendLog(MESSAGES.INHIBITOR_HANDLER.LOADED);
        this.listenerHandler.loadAll();
        this.sendLog(MESSAGES.LISTENER_HANDLER.LOADED);
    }
}
