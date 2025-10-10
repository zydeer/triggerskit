# Contributing to triggerskit

Thank you for your interest in contributing to our project! This guide will help you get started with the development process.

## Development Setup

### Prerequisites

- Bun installed on your system

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/zydeer/triggerskit.git`
3. Navigate to the project directory: `cd triggerskit`
4. Install dependencies: `bun install`

### Testing Your Changes

To test your changes in real-time:

1. **Start the dev server** (watches for code changes):
   ```bash
   bun run dev
   ```

2. **In another terminal**, start the test playground:
   ```bash
   bun run test:dev
   ```
   This launches a local server at `http://localhost:4000`

3. **Edit `tests/dev.ts`** to test packages as users would:
   ```typescript
   // Import and use packages like in a real application
   import { something } from '@triggerskit/package-name';

   Bun.serve({
     port: 4000,
     routes: {
       '/': {
         GET: () => {
           return new Response(JSON.stringify(result));
         }
       },
       '/test': {
         GET: () => {
           // Test in different routes and return responses
           return new Response(JSON.stringify(anotherResult));
         }
       }
     }
   });
   ```

4. **Visit `http://localhost:4000`** in your browser to see results. Changes to your code will reflect immediately in the playground on file save.

## Working with the Monorepo

This project uses a monorepo structure with Bun workspaces. All packages are located in the `packages/` directory.

## Development Workflow

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Fix linting and formatting: `bun run lint:fix`
4. Run tests: `bun run test`
5. Build the project: `bun run build`
6. Commit your changes using the conventions below
7. Push your branch to your fork
8. Open a pull request

## Commit Message Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear and structured commit messages:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code changes that neither fix bugs nor add features
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks, dependencies, etc.

## Pull Request Guidelines

1. Update documentation if needed
2. Ensure all tests pass
3. Address any feedback from code reviews
4. Once approved, your PR will be merged

## Code of Conduct

Please be respectful and constructive in all interactions within our community.

## Questions?

If you have any questions, please [open an issue](https://github.com/zydeer/triggerskit/issues/new) for discussion.

Thank you for contributing to triggerskit!
