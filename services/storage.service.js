import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const STORAGE_DICTIONARY = {
    token: 'token',
    city: 'city',
};

const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch(e) {
        return false;
    }
};

const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);
        return data[key];
    }

    return undefined;
};

const saveKeyValue = async (key, val) => {
    let data = {};

    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }

    data[key] = val;
    await promises.writeFile(filePath, JSON.stringify(data));
};

export {
    saveKeyValue,
    getKeyValue,
    STORAGE_DICTIONARY,
};
