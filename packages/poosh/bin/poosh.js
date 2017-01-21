#!/usr/bin/env node

console.error([
  "You have mistakenly installed the `poosh` package, which is a no-op.",
  "Poosh CLI commands is actually the `poosh-cli` package.",
  "",
  "    npm uninstall poosh",
  "    npm install poosh-cli",
  ""
].join("\n"));

process.exit(1);
