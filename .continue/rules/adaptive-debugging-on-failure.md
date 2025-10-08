---
globs: "**/*.{js,ts,py,html}"
description: This rule is designed to prevent getting stuck in a loop of
  incorrect guesses. When an initial fix doesn't work, it forces a strategic
  shift from 'fixing' to 'investigating'. By prioritizing data gathering after a
  failed attempt, it ensures that subsequent actions are based on new evidence
  from the system, rather than on variations of a disproven assumption. This
  leads to faster, more accurate problem resolution, and avoids wasting time on
  repeated, unsuccessful attempts.
alwaysApply: false
---

If a proposed solution is reported to be incorrect, do not immediately attempt another solution based on the same initial hypothesis. The next step must be to explicitly state that the first approach was flawed and then propose a new plan focused on gathering more information (e.g., via diagnostic logging, file inspection, or running tests) to form a new, more accurate hypothesis before suggesting another code change.