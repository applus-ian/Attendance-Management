import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import jest from "eslint-plugin-jest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  js.configs.recommended,

  ...compat.extends("next/core-web-vitals", "next/typescript"),

  prettier,

  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    globals: {
      React: true,
      JSX: true,
    },

    rules: {
      "prettier/prettier": "error",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },

  // Jest  Test
  {
    files: ["**/*.test.ts", "**/*.test.tsx"],
    plugins: {
      jest,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },
];

export default eslintConfig;
