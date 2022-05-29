import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (msg) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + msg);
};

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -h для вывода помощи
        -s [CITY] для установки города
        -t [API_KEY] для установки токена
        `
    );
};

const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgYellowBright(' WEATHER ')} Погода в городе ${res.name}
        ${icon} ${res.weather[0].description}
        Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
        Влажность: ${res.main.humidity}%
        Скорость ветра: ${res.wind.speed}
        `
    );
};


export {
    printError,
    printSuccess,
    printHelp,
    printWeather,
};
