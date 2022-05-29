const getArgs = (args) => {
    const res = {};
    const [executer, file, ...rest] = args;

    rest.forEach((value, index, arr) => {
        if (value.charAt(0) === '-') {
            const nextEl = arr[index + 1];
            const substr = value.substring(1);

            if (!nextEl) {
                res[substr] = true;
            } else if (nextEl.charAt(0) !== '-') {
                res[substr] = nextEl;
            } else {
                res[substr] = true;
            }
        }
    });

    return res;
};

export {
    getArgs,
};
