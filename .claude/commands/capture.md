---
description: Capture screenshots of a website at multiple viewports
argument-hint: <url> [--mobile] [--analyze]
allowed-tools: [Bash, Read, Write]
---

# Website Screenshot Capture

Capture screenshots of the specified URL using Playwright browser automation.

## Arguments

The URL to capture is provided as `$ARGUMENTS`. Parse it to extract:
- **URL**: The website URL (required, first argument)
- **--mobile**: Also capture at mobile viewport
- **--tablet**: Also capture at tablet viewport
- **--full-page**: Capture full scrollable page
- **--analyze**: Run component analysis
- **--click "selector"**: Click element before capture
- **--name "name"**: Custom name prefix

## Default Behavior

Without flags, capture desktop viewport only.

## Examples

```
/capture https://stripe.com
/capture https://example.com --mobile --full-page
/capture https://example.com --analyze
/capture https://example.com --click ".nav-toggle" --name "menu-open"
```

## Execution

Parse the arguments and run the appropriate capture command:

```bash
# Basic capture
node scripts/playwright-capture.mjs --url "$URL"

# With mobile
node scripts/playwright-capture.mjs --url "$URL" --viewports desktop,mobile

# With analysis
node scripts/playwright-capture.mjs --url "$URL" --analyze

# Full options
node scripts/playwright-capture.mjs --url "$URL" --viewports desktop,mobile --full-page --analyze
```

## Output

After capturing, report:
1. Screenshots created with their paths
2. Viewports captured
3. Component analysis summary (if --analyze was used)

Arguments: $ARGUMENTS
