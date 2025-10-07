---
globs: '["**/songDB.csv", "**/data/*.json", "**/*.md"]'
description: This rule prevents proposing architecturally 'pure' but practically
  cumbersome solutions. It ensures that the proposed data model directly
  supports the easiest possible workflow for the user, who is the primary
  maintainer of the data. The goal is to reduce the number of files and steps
  required for common tasks like adding, removing, or reordering items.
alwaysApply: false
---

When designing or refactoring a data structure, especially for flat-file systems (e.g., CSV, JSON), explicitly prioritize the user's stated maintenance workflow over strict data normalization. If the user's goal is to manage data in a single location (like a CSV), the primary goal is to create a structure that enables this, even if it requires using patterns like generic `key:value` columns (e.g., `PlaylistOrders`).