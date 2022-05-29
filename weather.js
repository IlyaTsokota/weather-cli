#!/usr/bin/env node
import { getArgs } from './helpers/args.js'; 
import { getIcon, getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, STORAGE_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        return printError('Не передан токен');
    }
    try {
        await saveKeyValue(STORAGE_DICTIONARY.token, token);
        printSuccess('Токен сохранен')
    } catch(e) {
        printError('Произошла ошибка при сохранении токена! Попытайтесь снова');
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        return printError('Не передан город');
    }
    try {
        await saveKeyValue(STORAGE_DICTIONARY.city, city);
        printSuccess('Город сохранен')
    } catch(e) {
        printError('Произошла ошибка при сохранении города! Попытайтесь снова');
    }
};

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(STORAGE_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch(e) {
        if (e?.response?.status === 404) {
            printError('Неверно указан город');
        } else if (e?.response?.status === 401) {
            printError('Неверно указан токен');
        } else {
            printError(e.message);
        }
    }
};  

const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }

    return getForcast();
};

initCLI();
