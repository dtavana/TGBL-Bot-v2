import './lib/loadEnv';
import TGBLClient from './structures/client/TGBLClient';

const client = new TGBLClient();
client.start().then();
