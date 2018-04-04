let Helpers = require('./moduleTwo');

module.exports = class One {
    constructor() {
        this.helpers = new Helpers();
    }

    syncAdd(number1, number2) {
        return number1+number2; 
    }

    syncAddWithHelper(number1, number2) {
        let result = number1 + number2;
        if (result > 5) {
            this.helpers.helperOne(result); // we don't want to call this in the test. we will test it in it's own test for moduleTwo
        }

        return result;
    }

    syncAddWithCb(number1, number2, message, cb) {
        let result = number1 + number2;
        if (message) {
            cb(message, result);
        }
    }

    syncAddWithPromise(number1, number2, cb) {
        let returnValue = 3;
        this.helpers.promiseToHelp(number1, number2)
            .then((result) => {
                cb(result);
            });
    }
};