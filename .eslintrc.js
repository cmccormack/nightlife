module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parser": "babel-eslint",
    "plugins": [ "react" ],
    "rules": {
        "indent": [ "error", 2 ],
        "quotes": [ "error", "double" ],
        "semi": [ "error", "never" ],
        "no-console": [
            "error", {
                allow: ["warn", "error", "info", "debug",]
            }
        ],
        "comma-dangle": ["error", "always"],
        "strict": 0,
    }
}