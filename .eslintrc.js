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
        Peer: false
    },
    rules: {
        "indent": ["error", 4, { SwitchCase: 1 }],
        "no-underscore-dangle": ["warn"],
        "curly": ["error", "multi"],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "object-curly-newline": ["error", { "consistent": true }]
    },
};