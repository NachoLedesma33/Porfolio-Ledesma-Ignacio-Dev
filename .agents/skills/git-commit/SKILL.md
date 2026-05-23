---
name: git-commit
description: "Git automated commit and push assistant. Guides the agent to inspect git status, analyze changes via diffs, write high-quality Conventional Commit messages, stage files safely, perform the commit, and push to the remote repository."
---

# Git Commit - Automated Commit and Push Assistant

This Skill provides a structured process and guidelines for committing and pushing code changes to a Git repository. It ensures that commit messages are semantic, clean, and follow the **Conventional Commits** standard, and that the remote repository is kept up to date.

## When to Apply

This Skill should be used **every time the user or the agent finishes implementing a task, fixing a bug, adding an asset, or completing a milestone**, and wants to save and push the changes.

### Must Use
- Committing code changes after completing a checklist in `task.md` or a phase of an `implementation_plan.md`.
- Staging and pushing newly generated assets (like placeholders or images).
- Staging and pushing updated documentation (like walkthroughs or markdown files).

## Commit Standards (Conventional Commits)

Always write commit messages in the following format:
```
<type>(<scope>): <short description in Spanish/English to match user preference>

[Optional longer body describing the rationale behind the change]
```

### Types:
- `feat`: A new feature or project entry (e.g., adding a new project to the portfolio).
- `fix`: A bug fix (e.g., fixing image cache busting, fixing CSS layout issues).
- `docs`: Documentation only changes (e.g., updating `walkthrough.md`, `task.md`, or creating a new skill).
- `style`: Changes that do not affect the meaning of the code (e.g., white-space, formatting, missing semi-colons).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `chore`: Updating build tasks, package manager configs, assets organization, or internal tools.

## Step-by-Step Execution Guide

Follow these steps exactly to perform a clean commit and push:

### Step 1: Inspect Status & Analyze Changes
Run the following commands to understand what has changed:
```powershell
git status
git diff --stat
```
Review the exact changes in modified files to make sure only intended files are about to be committed.

### Step 2: Compose Semantic Commit Message
Based on the diff analysis:
1. Select the correct type (`feat`, `fix`, `docs`, `chore`, etc.).
2. Write a clear, concise title.
3. (Optional but recommended) Add a body explaining the "why" and "what", especially if there are architectural changes or complex fixes.

### Step 3: Stage the Files
Stage all relevant modified, created, or deleted files:
```powershell
git add <file1> <file2> ...
# Or stage all changes if all are relevant:
git add .
```

### Step 4: Perform the Commit
Commit the staged changes with the prepared commit message:
```powershell
git commit -m "type(scope): message"
```

### Step 5: Push to Remote
Push the local commits to the current branch on the remote repository:
```powershell
git push
```
If this is the first push for a branch, set the upstream:
```powershell
git push -u origin <branch-name>
```

## Error Handling
- **Merge Conflicts / Remote Ahead**: If `git push` fails because the remote contains work that you do not have locally, run `git pull --rebase` to integrate remote changes, resolve conflicts if any, and then run `git push`.
- **Nothing to Commit**: If `git status` shows no changes, inform the user that there are no modified or untracked files to commit.
