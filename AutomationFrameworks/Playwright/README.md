# Setup
```bash
npm init -y
npm i -D playwright typescript ts-node @playwright/test
npx playwright install
```
# Playwright useful tools
```bash
npx playwright test
npx playwright show-report
```

## 🚀 Common Playwright Test Commands

PUT INSIDE THE PACKAGE.JSON 

| Command | Description |
|--------|-------------|
| `npx playwright test` | Run all tests in the project |
| `npx playwright test tests/e2e/add-to-cart.spec.ts` | Run a specific test file |
| `npx playwright test --headed` | Run tests with browser UI visible |
| `npx playwright test --debug` | Launch Playwright Inspector for step-by-step debugging |
| `npx playwright test --project=chromium` | Run tests only in Chromium (or `firefox`, `webkit`) |
| `npx playwright test --grep "Cart"` | Run tests matching a title pattern |
| `npx playwright test --trace on` | Enable trace recording for all tests |
| `npx playwright show-trace trace.zip` | View a recorded trace interactively |
| `npx playwright codegen http://localhost:3000` | Launch test recorder and generate code from interactions |
