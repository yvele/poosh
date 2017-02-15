# poosh-cli

> [Poosh](https://github.com/yvele/poosh) command line interface (cli)

[![npm version](https://img.shields.io/npm/v/poosh-cli.svg)](https://www.npmjs.com/package/poosh-cli)
[![source code](https://img.shields.io/badge/source%20code-master-blue.svg)](https://github.com/yvele/poosh/tree/master/packages/poosh-cli)

## Help

```
Usage: poosh <command> [options]

Commands:

  upload [options]        (default command)
  sync [options]

Options:

  -h, --help              output usage information
  -w, --plugins [string]  comma separated plugins
  -r, --readonly [what]   read-only mode, can be remote, cache or both (default)
  -n, --dry-run           perform a trial run with no changes made (same as --readonly both)
  -f, --force [what]      force mode, can be remote, cache or both (default)
  -v, --verbose           get more detailed output on every files
  -q, --quiet             quiet operations
  -V, --version           output the version number

Examples:

  $ poosh --readonly remote --force cache
  $ poosh sync -vv
```
