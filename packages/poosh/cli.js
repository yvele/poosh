#!/usr/bin/env node

console.error("You have mistakenly installed the `poosh` package, which is a no-op.\n" +
  "Poosh CLI commands is actually the `poosh-cli` package.\n" +
  "\n" +
  "    npm uninstall poosh\n" +
  "    npm install poosh-cli\n" +
  "\n");
process.exit(1);
