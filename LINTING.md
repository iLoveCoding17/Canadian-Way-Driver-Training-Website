# Code Linting and Formatting

This project uses ESLint and Prettier to ensure consistent code style and catch potential issues early.

## Available Commands

- `npm run lint`: Check files for linting issues
- `npm run lint:fix`: Fix linting issues where possible
- `npm run format`: Format all files with Prettier
- `npm run format:check`: Check if files are properly formatted

## Git Hooks

Git hooks are set up using Husky and lint-staged to automatically check files before committing:

- **pre-commit**: Runs Prettier and ESLint on staged files

## Configuration Files

- `.eslintrc.json`: ESLint configuration
- `.prettierrc.json`: Prettier configuration
- `.prettierignore`: Files/directories ignored by Prettier
- `.husky/pre-commit`: Git pre-commit hook

## VS Code Integration

If you're using VS Code, install the following extensions:

1. ESLint ([dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint))
2. Prettier ([esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))

The workspace settings are configured to:

- Format on save with Prettier
- Run ESLint fix actions on save

## Fixing Common Issues

### Unescaped Entities Error

You may see errors like:

```
error  `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`  react/no-unescaped-entities
```

To fix these, replace special characters in JSX with HTML entities:

- Replace `'` with `&apos;` or `&#39;`
- Replace `"` with `&quot;` or `&#34;`

### Unused Variables

For unused variables that you need to keep, you can prefix them with an underscore:

```js
// eslint will ignore this unused variable
const _unusedVariable = "example";
```

### Console Statements

Remove `console.log` statements or update ESLint configuration to allow them in specific files if needed.
