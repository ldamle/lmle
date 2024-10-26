import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import jsdoc from "eslint-plugin-jsdoc"; // Import the jsdoc plugin

export default [
  {
    ignores: ["node_modules/", "dist/", "docs/", "**/*.js", "*.d.ts", "**/*.json", "**/*.*js*"],
  },
  {
    // files: ["./src/**/*.{ts,tsx}", "./examples/**/*.{ts,tsx}", "./test/**/*.{ts,tsx}"], // Uncomment and set your files
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: globals.browser,
    },
    plugins: {
      jsdoc: jsdoc, // Define the jsdoc plugin as an object
    },
    rules: {
      // Стиль кода
      "indent": ["error", 4],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],

      // Лучшие практики
      "eqeqeq": ["error", "always"],
      "curly": "error",
      "no-eval": "error",

      // Возможные ошибки
      "no-undef": "error",
      "no-unused-vars": ["warn", {
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": false
      }],
      "no-console": "warn",

      // ES6
      "prefer-const": "error",
      "no-var": "error",
      "arrow-spacing": ["error", {
        "before": true,
        "after": true
      }],
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-indentation': 'error',
      'jsdoc/check-syntax': 'error',
      'jsdoc/require-description': 'error',
      'jsdoc/require-param': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            FunctionExpression: true,
          },
        },
      ],
      // Add more rules as needed
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
