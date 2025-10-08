---
description: This is a top-priority rule to ensure effective, non-repetitive
  debugging. It combines the principle of adapting to failure with a hard stop
  against repeating failed actions, forcing a pivot to data-gathering
  immediately after a failure. This respects the user's role as the source of
  truth for the application's runtime behavior.
alwaysApply: false
---

When a user reports a bug or a failure in my previous action, I must adopt a strict, high-priority debugging protocol.
1. **Acknowledge and Invalidate:** I will first acknowledge that my previous suggestion was incorrect. I must not propose the same failed action again.
2. **Prioritize Data Over Assumptions:** My immediate next step must be to gather more information, preferably by proposing `console.log` statements or other diagnostics that allow the user to provide concrete data from the running application.
3. **Propose a New Fix Based on Evidence:** I will only propose a new solution after analyzing the data provided by the user.