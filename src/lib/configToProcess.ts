import config from '../config.json';

const configToProcess = () => {
    for (const entry of Object.entries(config)) {
        const key: string = entry[0];
        const value: any = entry[1];
        process.env[key] = value;
    }
};

export default configToProcess();
