# Contributing

Thank you for contributing to the QR Attendance System.

This document describes the development workflow and contribution guidelines followed by the project.

# Development Workflow

Development follows the GitHub Issue workflow.

```text
Pick a GitHub Issue
        │
        ▼
Create a Feature Branch
        │
        ▼
Develop the Feature
        │
        ▼
Test Locally
        │
        ▼
Push Your Branch
        │
        ▼
Create a Pull Request
        │
        ▼
Code Review
        │
        ▼
Merge into main
```

# Branch Naming

Create a separate branch for every feature or bug fix.

Examples

```text
feature/us-06-manage-courses

feature/us-11-generate-qr

```

Never work directly on the `main` branch.

# Development Guidelines

- Follow the existing project structure.
- Follow the existing coding style and naming conventions.
- Keep functions focused on a single responsibility.
- Reuse existing components and utilities whenever possible.
- Avoid code duplication.
- Do not modify unrelated files.
- Keep commits small and meaningful.

# Before Creating a Pull Request

Ensure that:

- The project builds successfully.
- The feature has been tested locally.
- There are no TypeScript errors.
- There are no unnecessary files in the commit.
- Environment files are not committed.
- Build artifacts are not committed.

# Pull Requests

Each Pull Request should include:

- Summary of changes
- Related GitHub Issue or User Story
- Screenshots (if UI changes)
- Testing performed
- Known limitations (if any)

Pull Requests are reviewed by the repository owner before merging.

# Code Review

During review, the following will be checked:

- Functionality
- Code quality
- Readability
- Project structure
- Breaking changes
- Testing

Changes may be requested before approval.

# Team Rules

- Pull the latest changes before starting work.
- Work on one user story per branch.
- Reference the related GitHub Issue in your Pull Request.
- Resolve merge conflicts before requesting a review.
- Never push directly to the `main` branch.

# Need Help?

If you have any questions about the implementation or development workflow, open a GitHub Issue or contact the project maintainer.
