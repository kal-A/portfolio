# Metrics and Claims Audit

Audit every metric and claim before displaying it.

For every metric, classify it as one of:

- verified
- class/project test result
- estimated
- directional
- needs verification
- remove

## Rules

- Do not invent metrics.
- Do not show placeholder numbers.
- Do not present estimated numbers as hard business results.
- If a metric came from a class project, prototype test, or usability
  evaluation, label the context (e.g. "in a 4-evaluator heuristic study...").
- If a business metric is not verified, rewrite it qualitatively.
- Prefer honest specificity over inflated numbers.

## Examples

Instead of: "2x user retention"
Use: "Improved the onboarding and product experience around the financing
flow." (unless the retention metric is verified)

Instead of: "20% engagement increase"
Use: "Created and updated campaign assets across retail and digital
channels." (unless the engagement metric is verified)

This audit applies across every project card and case study — cross-check
against [CARD_REWRITE_INSTRUCTIONS.md](../../CARD_REWRITE_INSTRUCTIONS.md)'s
banned-metric list ("cut drop-off in half", "2x retention") before publishing
any number.
