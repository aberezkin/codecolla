module.exports = {
    extends: "airbnb",
    globals: {
        jest: false,
        shallow: false,
        render: false,
        mount: false,
        describe: false,
        it: false,
        expect: false,
        document: false,
        window: false,
    },
    rules: {
        "indent": ["error", 4, { SwitchCase: 1 }],
        "no-underscore-dangle": ["warn"]
    },
};