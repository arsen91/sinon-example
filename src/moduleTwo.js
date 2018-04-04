module.exports = class Helpers {
    helperOne(someInput) {
        console.log('absolutely heavy', someInput);
    }

    promiseToHelp(a, b) {
        let result = a+b;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(result);
            }, 100);
        });
    }
};