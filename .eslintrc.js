module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:vue/vue3-essential"
	],
	parserOptions: {
		ecmaVersion: "latest",
		parser: "@typescript-eslint/parser",
		sourceType: "module"
	},
	plugins: [
		"@typescript-eslint",
		"vue"
	],
	ignorePatterns: ["package.json"],
	rules: {
		// https://eslint.org/docs/latest/rules
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"quote-props": ["error", "as-needed"],
		"no-unused-vars": "warn",
		"@typescript-eslint/no-unused-vars": "warn",
		"no-irregular-whitespace": "warn",
		"no-undef": "warn",
		"no-redeclare": "warn",
		"no-constant-condition": "warn",
		"no-self-assign": "warn",
		"@typescript-eslint/no-var-requires": "warn",
		"no-prototype-builtins": "warn",
		"no-empty": "warn",
	}
};