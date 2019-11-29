import { transports } from 'winston';
import BaseLogger from './BaseLogger';

export default class ConsoleLogger extends BaseLogger {
    public constructor() {
        super('console', 'info', new transports.Console());
    }
}
