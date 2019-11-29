export const MESSAGES = {
    COMMAND_HANDLER: {
        PROMPT: {
            MODIFY_START: (str: string) => `${str}\n\nType \`cancel\` to cancel the command.`,
            MODIFY_RETRY: (str: string) => `${str}\n\nType \`cancel\` to cancel the command.`,
            TIMEOUT: 'Guess you took too long, the command has been cancelled.',
            ENDED: 'The command has been cancelled.',
            CANCEL: 'The command has been cancelled.',
        },
        LOADED: 'Command Handler has been loaded!',
    },
    INHIBITOR_HANDLER: {
        LOADED: 'Inhibitor Handler has been loaded!',
    },
    LISTENER_HANDLER: {
        LOADED: 'Listener Handler has been loaded!',
    },
    SETTINGS_MANAGER: {
        LOADED: 'Settings manager has been loaded!',
    },
};

export const SETTINGS = {
    BLACKLIST: 'blacklist',
};
