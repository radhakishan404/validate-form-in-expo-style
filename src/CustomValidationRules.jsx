const isExisty = function (value) {
    return value !== null && value !== undefined;
};

const isEmpty = function (value) {
    if (value instanceof Array) {
        return value.length === 0;
    }
    return value === '' || !isExisty(value);
};

const isEmptyTrimed = function (value) {
    if (typeof value === 'string') {
        return value.trim() === '';
    }
    return true;
};

const validations = {
    matchRegexp: (value, regexp) => {
        const validationRegexp = (regexp instanceof RegExp ? regexp : (new RegExp(regexp)));
        return (isEmpty(value) || validationRegexp.test(value));
    },

    validEmail: value => validations.matchRegexp(value, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i),

    isEmpty: value => isEmpty(value),

    required: value => !isEmpty(value),

    trim: value => !isEmptyTrimed(value),

    isNumber: value => validations.matchRegexp(value, /^-?[0-9]\d*(\d+)?$/i),

    isFloat: value => validations.matchRegexp(value, /^(?:-?[1-9]\d*|-?0)?(?:\.\d+)?$/i),

    isPositive: (value) => {
        if (isExisty(value)) {
            return (validations.isNumber(value) || validations.isFloat(value)) && value >= 0;
        }
        return true;
    },

    maxNumber: (value, max) => isEmpty(value) || parseInt(value, 10) <= parseInt(max, 10),

    minNumber: (value, min) => isEmpty(value) || parseInt(value, 10) >= parseInt(min, 10),

    maxFloat: (value, max) => isEmpty(value) || parseFloat(value) <= parseFloat(max),

    minFloat: (value, min) => isEmpty(value) || parseFloat(value) >= parseFloat(min),

    isString: value => !isEmpty(value) || typeof value === 'string' || value instanceof String,
    minStringLength: (value, length) => validations.isString(value) && value.length >= length,
    maxStringLength: (value, length) => validations.isString(value) && value.length <= length,
};

module.exports = validations;