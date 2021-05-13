module.exports = {
    "env": {        // an environment provides predefined global variables.
        "browser": true,
        "es2021": true,
        "node": true
    },
    "globals": {
        "Promise": "readonly"
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": 'module'
    },
    "rules": {
    }
};
